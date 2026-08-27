import SwiftUI

/// A color theme for the calculator — the SwiftUI port of the palettes in the
/// original Expo app (`constants/themes.js`). Colors are preserved exactly.
struct Theme: Identifiable, Hashable {
    /// Stable identifier, also used as the persisted value (e.g. "flamingo").
    let id: String
    /// Human-facing name shown on the theme selector pill.
    let title: String

    /// Two-stop background gradient (top → bottom).
    let gradientStart: Color
    let gradientEnd: Color

    /// Keypad button colors.
    let buttonBackground: Color
    let buttonPress: Color
    let buttonFont: Color

    /// Display (result) text color.
    let displayFont: Color

    /// Background gradient, top to bottom, matching the original `LinearGradient`.
    var backgroundGradient: LinearGradient {
        LinearGradient(
            colors: [gradientStart, gradientEnd],
            startPoint: .top,
            endPoint: .bottom
        )
    }
}

extension Theme {
    /// All themes in display order. The first entry is the default (Flamingo),
    /// matching `Object.keys(THEMES)[0]` in the original app.
    static let all: [Theme] = [.flamingo, .avocado, .berry]

    /// Look up a theme by id, falling back to the default when unknown.
    static func theme(withID id: String) -> Theme {
        all.first { $0.id == id } ?? .flamingo
    }

    static let flamingo = Theme(
        id: "flamingo",
        title: "Flamingo",
        gradientStart: Color(hex: 0xFF69B4),
        gradientEnd: Color(hex: 0xDE5B9C),
        buttonBackground: Color(hex: 0xDE5B9C),
        buttonPress: Color(hex: 0xC8518B),
        buttonFont: .white,
        displayFont: .white
    )

    static let avocado = Theme(
        id: "avocado",
        title: "Avocado",
        gradientStart: Color(hex: 0xA7C4A0),
        gradientEnd: Color(hex: 0xE4FDE1),
        buttonBackground: Color(hex: 0xFBFBF2),
        buttonPress: Color(hex: 0x31493C),
        buttonFont: .black,
        displayFont: .black
    )

    static let berry = Theme(
        id: "berry",
        title: "Berry",
        gradientStart: Color(hex: 0x6BBAEC),
        gradientEnd: Color(hex: 0x3066BE),
        buttonBackground: Color(hex: 0xAA4465),
        buttonPress: Color(hex: 0x81A4CD),
        buttonFont: .white,
        displayFont: .white
    )
}

extension Color {
    /// Creates a color from a 24-bit RGB hex value, e.g. `Color(hex: 0xFF69B4)`.
    init(hex: UInt32, opacity: Double = 1.0) {
        let red = Double((hex >> 16) & 0xFF) / 255.0
        let green = Double((hex >> 8) & 0xFF) / 255.0
        let blue = Double(hex & 0xFF) / 255.0
        self.init(.sRGB, red: red, green: green, blue: blue, opacity: opacity)
    }
}

#Preview("Theme gradients") {
    VStack(spacing: 0) {
        ForEach(Theme.all) { theme in
            theme.backgroundGradient
                .overlay {
                    Text(theme.title)
                        .font(.title2.bold())
                        .foregroundStyle(theme.displayFont)
                }
        }
    }
    .ignoresSafeArea()
}
