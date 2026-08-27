import SwiftUI

/// The row of theme pills. Each pill is a solid swatch of its own theme's
/// gradient and text color, so it always represents that theme regardless of
/// which one is currently active. The selected pill gets a contrasting ring and
/// a slight lift.
struct ThemeSelectorView: View {
    let themes: [Theme]
    let selectedID: String
    let onSelect: (String) -> Void

    var body: some View {
        HStack(spacing: 10) {
            ForEach(themes) { theme in
                pill(for: theme, isSelected: theme.id == selectedID)
            }
        }
    }

    private func pill(for theme: Theme, isSelected: Bool) -> some View {
        Button {
            Haptics.shared.play(.theme)
            onSelect(theme.id)
        } label: {
            Text(theme.title)
                .font(.system(.subheadline, design: .rounded).weight(.semibold))
                .foregroundStyle(theme.buttonFont)
                .padding(.horizontal, 16)
                .padding(.vertical, 10)
                .frame(maxWidth: .infinity)
                .background {
                    Capsule().fill(theme.backgroundGradient)
                }
                .overlay {
                    Capsule()
                        .strokeBorder(theme.buttonFont, lineWidth: 2.5)
                        .opacity(isSelected ? 1 : 0)
                }
                .clipShape(Capsule())
                .shadow(color: .black.opacity(0.18), radius: isSelected ? 6 : 2, y: 2)
                .scaleEffect(isSelected ? 1.04 : 1.0)
        }
        .buttonStyle(.plain)
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
