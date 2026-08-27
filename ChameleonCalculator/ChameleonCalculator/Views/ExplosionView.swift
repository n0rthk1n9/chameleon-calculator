import SwiftUI

/// The divide-by-zero easter egg: the original full-screen explosion GIF, plus
/// an error haptic. Shown for a few seconds, then dismissed by the model.
struct ExplosionView: View {
    var body: some View {
        GIFExplosionView(assetName: "Explosion")
            .ignoresSafeArea()
            .onAppear { Haptics.shared.play(.explosion) }
            .transition(.opacity)
            .accessibilityElement(children: .ignore)
            .accessibilityLabel("Boom! Division by zero.")
    }
}
