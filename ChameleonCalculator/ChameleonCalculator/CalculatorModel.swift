import SwiftUI
import Observation

/// Observable view model that owns the calculator engine and the selected theme,
/// exposing just what the SwiftUI views need. The engine holds all the logic;
/// this type is the bridge to the UI.
@Observable
final class CalculatorModel {

    private var engine = CalculatorEngine()

    /// The id of the active theme. Persistence is added in a later step.
    var selectedThemeID: String = Theme.flamingo.id

    // MARK: - Derived state for the views

    var theme: Theme { Theme.theme(withID: selectedThemeID) }
    var display: String { engine.formattedDisplay }
    var clearLabel: String { engine.clearLabel }
    var showExplosion: Bool { engine.showExplosion }

    func isHighlighted(_ operation: CalculatorOperation) -> Bool {
        engine.isHighlighted(operation)
    }

    // MARK: - Intents

    func inputDigit(_ digit: String) { engine.inputDigit(digit) }
    func selectOperation(_ operation: CalculatorOperation) { engine.selectOperation(operation) }
    func equals() { engine.generateResult() }
    func clear() { engine.cancelButton() }
    func addDot() { engine.addDot() }
    func percentage() { engine.percentage() }
    func invertSign() { engine.invertSign() }

    func selectTheme(_ id: String) { selectedThemeID = id }
}
