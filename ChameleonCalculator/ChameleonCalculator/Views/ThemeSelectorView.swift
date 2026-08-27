import SwiftUI

/// The row of theme pills. Tapping one switches the calculator's colors. The
/// selected pill uses a stronger tint and a contrasting ring, echoing the
/// original app's outlined selection.
struct ThemeSelectorView: View {
    let themes: [Theme]
    let selectedID: String
    let onSelect: (String) -> Void

    var body: some View {
        GlassEffectContainer(spacing: 10) {
            HStack(spacing: 10) {
                ForEach(themes) { theme in
                    pill(for: theme, isSelected: theme.id == selectedID)
                }
            }
        }
    }

    private func pill(for theme: Theme, isSelected: Bool) -> some View {
        Button {
            onSelect(theme.id)
        } label: {
            Text(theme.title)
                .font(.system(.subheadline, design: .rounded).weight(.semibold))
                .foregroundStyle(theme.buttonFont)
                .padding(.horizontal, 16)
                .padding(.vertical, 10)
                .frame(maxWidth: .infinity)
                .contentShape(Capsule())
        }
        .buttonStyle(.plain)
        .glassEffect(
            .regular.tint(theme.buttonBackground.opacity(isSelected ? 0.9 : 0.45)).interactive(),
            in: .capsule
        )
        .overlay {
            if isSelected {
                Capsule().strokeBorder(theme.buttonFont.opacity(0.9), lineWidth: 2)
            }
        }
        .animation(.smooth(duration: 0.25), value: isSelected)
        .accessibilityLabel(theme.title)
        .accessibilityAddTraits(isSelected ? [.isButton, .isSelected] : .isButton)
    }
}

#Preview {
    ZStack {
        Theme.avocado.backgroundGradient.ignoresSafeArea()
        ThemeSelectorView(themes: Theme.all, selectedID: Theme.avocado.id) { _ in }
            .padding()
    }
}
