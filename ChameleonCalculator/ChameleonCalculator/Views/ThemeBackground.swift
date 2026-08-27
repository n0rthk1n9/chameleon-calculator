import SwiftUI

/// The themed gradient background, with a flash-free crossfade when the theme
/// changes. The previous gradient stays fully opaque underneath while the new
/// one fades in on top, so the empty window background never shows through
/// mid-transition. On first appearance it renders the current theme instantly.
struct ThemeBackground: View {
    let theme: Theme

    @State private var base: Theme
    @State private var incoming: Theme
    @State private var incomingOpacity: Double

    init(theme: Theme) {
        self.theme = theme
        _base = State(initialValue: theme)
        _incoming = State(initialValue: theme)
        _incomingOpacity = State(initialValue: 1)
    }

    var body: some View {
        ZStack {
            base.backgroundGradient
            incoming.backgroundGradient
                .opacity(incomingOpacity)
        }
        .ignoresSafeArea()
        .onChange(of: theme) { _, newTheme in
            incoming = newTheme
            incomingOpacity = 0
            withAnimation(.smooth(duration: 0.4)) {
                incomingOpacity = 1
            } completion: {
                base = newTheme
            }
        }
    }
}

#Preview {
    ThemeBackground(theme: .berry)
}
