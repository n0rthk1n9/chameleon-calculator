import CoreHaptics

/// A tactile pattern for a kind of interaction. Each case describes one or more
/// haptic events (and, where useful, a parameter curve) that together give the
/// action a distinct feel.
enum HapticPattern {
    case digit      // light crisp tick
    case toggle     // snappy little click (+/-, %)
    case op         // firmer, rounder thud (operators)
    case equals     // satisfying pop-click
    case clear      // sharp tap into a soft wash
    case theme      // gentle double selection tick
    case explosion  // boom into a decaying rumble

    private func transient(_ intensity: Float, _ sharpness: Float, at time: TimeInterval = 0) -> CHHapticEvent {
        CHHapticEvent(
            eventType: .hapticTransient,
            parameters: [
                CHHapticEventParameter(parameterID: .hapticIntensity, value: intensity),
                CHHapticEventParameter(parameterID: .hapticSharpness, value: sharpness),
            ],
            relativeTime: time
        )
    }

    private func continuous(_ intensity: Float, _ sharpness: Float, at time: TimeInterval, duration: TimeInterval) -> CHHapticEvent {
        CHHapticEvent(
            eventType: .hapticContinuous,
            parameters: [
                CHHapticEventParameter(parameterID: .hapticIntensity, value: intensity),
                CHHapticEventParameter(parameterID: .hapticSharpness, value: sharpness),
            ],
            relativeTime: time,
            duration: duration
        )
    }

    var events: [CHHapticEvent] {
        switch self {
        case .digit:
            return [transient(0.55, 0.55)]
        case .toggle:
            return [transient(0.5, 0.85)]
        case .op:
            return [transient(0.8, 0.4)]
        case .equals:
            return [transient(0.95, 0.55), transient(0.6, 0.75, at: 0.085)]
        case .clear:
            return [transient(0.75, 0.9), continuous(0.35, 0.2, at: 0.02, duration: 0.14)]
        case .theme:
            return [transient(0.45, 0.6), transient(0.32, 0.85, at: 0.05)]
        case .explosion:
            return [
                transient(1.0, 0.5),
                continuous(0.85, 0.28, at: 0.02, duration: 0.55),
                transient(0.5, 0.3, at: 0.22),
                transient(0.4, 0.25, at: 0.38),
            ]
        }
    }

    /// A decay curve for patterns whose continuous rumble should fade out.
    var parameterCurves: [CHHapticParameterCurve] {
        switch self {
        case .explosion:
            return [
                CHHapticParameterCurve(
                    parameterID: .hapticIntensityControl,
                    controlPoints: [
                        CHHapticParameterCurve.ControlPoint(relativeTime: 0.02, value: 1.0),
                        CHHapticParameterCurve.ControlPoint(relativeTime: 0.57, value: 0.0),
                    ],
                    relativeTime: 0
                )
            ]
        case .clear:
            return [
                CHHapticParameterCurve(
                    parameterID: .hapticIntensityControl,
                    controlPoints: [
                        CHHapticParameterCurve.ControlPoint(relativeTime: 0.02, value: 1.0),
                        CHHapticParameterCurve.ControlPoint(relativeTime: 0.16, value: 0.0),
                    ],
                    relativeTime: 0
                )
            ]
        default:
            return []
        }
    }
}

/// Plays haptic patterns via a shared Core Haptics engine. No-ops safely on
/// devices (and the simulator) without haptic hardware.
@MainActor
final class Haptics {
    static let shared = Haptics()

    private var engine: CHHapticEngine?
    private let supportsHaptics = CHHapticEngine.capabilitiesForHardware().supportsHaptics

    private init() {
        start()
    }

    /// Touch the shared instance early so the engine is ready before first use.
    func warmUp() {}

    private func start() {
        guard supportsHaptics, engine == nil else { return }
        do {
            let engine = try CHHapticEngine()
            engine.isAutoShutdownEnabled = true
            engine.resetHandler = { [weak engine] in try? engine?.start() }
            try engine.start()
            self.engine = engine
        } catch {
            engine = nil
        }
    }

    func play(_ pattern: HapticPattern) {
        guard supportsHaptics else { return }
        start()
        guard let engine else { return }
        do {
            try engine.start()
            let chPattern = try CHHapticPattern(events: pattern.events, parameterCurves: pattern.parameterCurves)
            let player = try engine.makePlayer(with: chPattern)
            try player.start(atTime: CHHapticTimeImmediate)
        } catch {
            // Ignore — haptics are a non-critical enhancement.
        }
    }
}
