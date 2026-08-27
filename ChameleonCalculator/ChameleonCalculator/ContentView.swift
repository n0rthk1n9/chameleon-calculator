import SwiftUI

/// Temporary scaffold view. Replaced by the calculator UI in a later step.
struct ContentView: View {
    var body: some View {
        ZStack {
            LinearGradient(
                colors: [
                    Color(red: 1.0, green: 0.412, blue: 0.706),   // #FF69B4
                    Color(red: 0.871, green: 0.357, blue: 0.612),  // #de5b9c
                ],
                startPoint: .top,
                endPoint: .bottom
            )
            .ignoresSafeArea()

            VStack(spacing: 14) {
                Image(systemName: "function")
                    .font(.system(size: 64, weight: .semibold))
                Text("Chameleon Calculator")
                    .font(.title.bold())
                Text("Scaffold OK — iOS 26 build")
                    .font(.subheadline)
                    .foregroundStyle(.white.opacity(0.85))
            }
            .foregroundStyle(.white)
        }
    }
}

#Preview {
    ContentView()
}
