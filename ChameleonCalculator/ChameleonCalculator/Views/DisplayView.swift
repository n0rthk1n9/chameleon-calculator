import SwiftUI

/// The result readout at the top of the calculator. Large, trailing-aligned, and
/// tinted by the active theme, with a rolling numeric transition on change.
struct DisplayView: View {
    let text: String
    let theme: Theme

    var body: some View {
        Text(text)
            .font(.system(size: 76, weight: .light, design: .rounded))
            .foregroundStyle(theme.displayFont)
            .lineLimit(1)
            .minimumScaleFactor(0.25)
            // The rolling transition is driven explicitly from `equals()`, so
            // typing swaps instantly and only a computed result animates.
            .contentTransition(.numericText())
            .frame(maxWidth: .infinity, alignment: .trailing)
            .padding(.horizontal, 10)
            .accessibilityLabel("Result")
            .accessibilityValue(text)
    }
}

#Preview {
    ZStack {
        Theme.flamingo.backgroundGradient.ignoresSafeArea()
        DisplayView(text: "1,234.5", theme: .flamingo)
    }
}
