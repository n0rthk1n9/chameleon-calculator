import SwiftUI

/// A single Liquid Glass calculator key. The glass is tinted with the theme's
/// button color; an active operator key uses the stronger "pressed" tint so it
/// reads as highlighted, mirroring the original app's persistent highlight.
///
/// Each key carries a stable `glassEffectID` in a shared namespace (the
/// documented pattern for repeated glass elements inside a
/// `GlassEffectContainer`). Stable identity keeps the glass from being
/// re-sampled/re-created when the view re-composes.
struct CalculatorButton: View {
    let label: String
    let theme: Theme
    var isHighlighted: Bool = false
    var haptic: HapticPattern = .digit
    let glassID: String
    let glassNamespace: Namespace.ID
    let action: () -> Void

    private var tint: Color {
        isHighlighted ? theme.buttonPress : theme.buttonBackground.opacity(0.8)
    }

    var body: some View {
        Button {
            Haptics.shared.play(haptic)
            action()
        } label: {
            Text(label)
                .font(.system(size: 34, weight: .medium, design: .rounded))
                .foregroundStyle(theme.buttonFont)
                .frame(maxWidth: .infinity, maxHeight: .infinity)
                .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
        .glassEffect(.regular.tint(tint).interactive(), in: RoundedRectangle(cornerRadius: 26, style: .continuous))
        .glassEffectID(glassID, in: glassNamespace)
        .accessibilityLabel(label)
    }
}

private struct CalculatorButtonPreview: View {
    @Namespace private var namespace

    var body: some View {
        ZStack {
            Theme.berry.backgroundGradient.ignoresSafeArea()
            GlassEffectContainer(spacing: 12) {
                HStack(spacing: 12) {
                    CalculatorButton(label: "7", theme: .berry, glassID: "d7", glassNamespace: namespace) {}
                    CalculatorButton(label: "÷", theme: .berry, isHighlighted: true, glassID: "op-division", glassNamespace: namespace) {}
                    CalculatorButton(label: "=", theme: .berry, glassID: "equals", glassNamespace: namespace) {}
                }
                .frame(height: 90)
                .padding()
            }
        }
    }
}

#Preview {
    CalculatorButtonPreview()
}
