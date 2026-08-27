import SwiftUI

/// A single Liquid Glass calculator key. The glass is tinted with the theme's
/// button color; an active operator key uses the stronger "pressed" tint so it
/// reads as highlighted, mirroring the original app's persistent highlight.
struct CalculatorButton: View {
    let label: String
    let theme: Theme
    var isHighlighted: Bool = false
    let action: () -> Void

    private var tint: Color {
        isHighlighted ? theme.buttonPress : theme.buttonBackground.opacity(0.8)
    }

    var body: some View {
        Button(action: action) {
            Text(label)
                .font(.system(size: 34, weight: .medium, design: .rounded))
                .foregroundStyle(theme.buttonFont)
                .frame(maxWidth: .infinity, maxHeight: .infinity)
                .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
        .glassEffect(
            .regular.tint(tint).interactive(),
            in: RoundedRectangle(cornerRadius: 26, style: .continuous)
        )
        .animation(.smooth(duration: 0.25), value: isHighlighted)
        .accessibilityLabel(label)
    }
}

#Preview {
    ZStack {
        Theme.berry.backgroundGradient.ignoresSafeArea()
        GlassEffectContainer(spacing: 12) {
            HStack(spacing: 12) {
                CalculatorButton(label: "7", theme: .berry) {}
                CalculatorButton(label: "÷", theme: .berry, isHighlighted: true) {}
                CalculatorButton(label: "=", theme: .berry) {}
            }
            .frame(height: 90)
            .padding()
        }
    }
}
