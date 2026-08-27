import SwiftUI

/// Temporary scaffold view. Currently previews the theme palettes so they can be
/// verified by running the app. Replaced by the calculator UI in a later step.
struct ContentView: View {
    var body: some View {
        VStack(spacing: 0) {
            ForEach(Theme.all) { theme in
                theme.backgroundGradient
                    .overlay {
                        VStack(spacing: 6) {
                            Text(theme.title)
                                .font(.title.bold())
                            Text("Aa 0 1 2 3")
                                .font(.title3)
                        }
                        .foregroundStyle(theme.displayFont)
                    }
            }
        }
        .ignoresSafeArea()
    }
}

#Preview {
    ContentView()
}
