import SwiftUI
import Observation

/// Observable view model that owns the calculator engine and the selected theme,
/// exposing just what the SwiftUI views need. The engine holds all the logic;
/// this type is the bridge to the UI.
@Observable
final class CalculatorModel {

    private var engine = CalculatorEngine()

    /// How long the divide-by-zero easter egg stays on screen, matching the
    /// original app's 3.2s timeout.
    private static let explosionDuration: Duration = .seconds(3.2)

    /// UserDefaults key for the persisted theme (see `readSelectedTheme` in the
    /// original app).
    private static let themeKey = "theme"

    /// The id of the active theme, restored on launch and persisted on change.
    var selectedThemeID: String

    init() {
        let stored = UserDefaults.standard.string(forKey: Self.themeKey)
        if let stored, Theme.all.contains(where: { $0.id == stored }) {
            selectedThemeID = stored
        } else {
            selectedThemeID = Theme.flamingo.id
        }
    }

    // MARK: - Derived state for the views

    var theme: Theme { Theme.theme(withID: selectedThemeID) }
    var display: String { engine.formattedDisplay }
    var clearLabel: String { engine.clearLabel }
    var showExplosion: Bool { engine.showExplosion }

    func isHighlighted(_ operation: CalculatorOperation) -> Bool {
        engine.isHighlighted(operation)
    }

    // MARK: - Intents

    func inputDigit(_ digit: String) { engine.inputDigit(digit) }

    func selectOperation(_ operation: CalculatorOperation) {
        engine.selectOperation(operation)
        scheduleExplosionResetIfNeeded()
    }

    func equals() {
        // Animate only the computed result so the number rolls in from the top,
        // while digit entry (below) stays instant and distraction-free.
        withAnimation(.snappy(duration: 0.28)) {
            engine.generateResult()
        }
        scheduleExplosionResetIfNeeded()
    }

    func clear() { engine.cancelButton() }
    func addDot() { engine.addDot() }
    func percentage() { engine.percentage() }
    func invertSign() { engine.invertSign() }

    func selectTheme(_ id: String) {
        selectedThemeID = id
        UserDefaults.standard.set(id, forKey: Self.themeKey)
    }

    // MARK: - Explosion timing

    /// When a divide-by-zero has just raised the explosion flag, hide it again
    /// after the fixed duration. The engine has already reset the display.
    private func scheduleExplosionResetIfNeeded() {
        guard engine.showExplosion else { return }
        Task { @MainActor [weak self] in
            try? await Task.sleep(for: Self.explosionDuration)
            self?.engine.showExplosion = false
        }
    }
}
