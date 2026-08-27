import Foundation

/// The four arithmetic operations, mirroring the string operations used in the
/// original Expo app (`"addition"`, `"subtraction"`, …).
enum CalculatorOperation: String, Hashable {
    case addition, subtraction, multiplication, division

    /// The glyph shown on the operator key.
    var symbol: String {
        switch self {
        case .addition: return "+"
        case .subtraction: return "−"
        case .multiplication: return "×"
        case .division: return "÷"
        }
    }
}

/// Pure calculator logic, ported line-for-line from `screens/CalculatorScreen.js`.
///
/// This is a value type with no UI or persistence dependencies so it can be unit
/// tested in isolation. The `@Observable` model wraps it and drives the views.
///
/// The original stored `display` as either a JS string (while typing) or a JS
/// number (after an operation). Two nuances are preserved here:
/// - `rawDisplay` keeps the exact string form used for digit concatenation and
///   the "already has a dot" check.
/// - `displayIsNumeric` records whether the current display came from a numeric
///   assignment. It reproduces JS truthiness for the `AC` / `C` label and the
///   `display === 0` comparison in `cancelButton`.
struct CalculatorEngine {

    // MARK: - State

    /// Raw display string, as typed or coerced (mirrors the JS `display`).
    private(set) var rawDisplay: String = "0"

    /// Whether the display currently holds a numeric assignment (vs. typed text).
    /// Starts `true` so a fresh screen reads as a cleared zero and shows `AC`.
    private var displayIsNumeric: Bool = true

    /// True while digits should be appended to the current number.
    private(set) var concatenateDigit: Bool = false

    /// The pending operation used for the next computation.
    private(set) var activeOperation: CalculatorOperation?

    /// The operator key currently drawn highlighted. Tracked separately from
    /// `activeOperation` because `C`, `%` and `+/−` clear the highlight while
    /// leaving the pending operation intact (matching `resetHighlightedButtons`).
    private(set) var highlightedOperation: CalculatorOperation?

    /// Whether the next operator press should chain off the previous result.
    private var changeOperation: Bool = true

    /// Whether the display currently shows a freshly generated result.
    private var resultGenerated: Bool = false

    /// When true, the divide-by-zero easter egg should be shown.
    var showExplosion: Bool = false

    private var firstOperand: Double = 0
    private var secondOperand: Double = 0
    private var result: Double = 0

    // MARK: - Derived values

    /// Numeric value of the current display, using JS `Number(...)` semantics.
    var numericValue: Double { Self.jsNumber(rawDisplay) }

    /// Label for the clear key: `AC` when the display is a numeric zero, else `C`
    /// (reproduces `display ? "C" : "AC"`).
    var clearLabel: String {
        (displayIsNumeric && numericValue == 0) ? "AC" : "C"
    }

    /// The display string shown to the user, matching the original `Display`
    /// component: scientific notation at or above 1e9, otherwise locale-grouped
    /// with up to three fraction digits (JS `toLocaleString` default).
    var formattedDisplay: String {
        let value = numericValue
        if abs(value) >= 1_000_000_000 {
            return Self.exponentialString(value)
        }
        return Self.groupedString(value)
    }

    /// Whether the given operator key should be drawn highlighted.
    func isHighlighted(_ operation: CalculatorOperation) -> Bool {
        highlightedOperation == operation
    }

    // MARK: - Input

    /// Append a digit ("0"–"9"), capped while the value is at most 1e8.
    mutating func inputDigit(_ digit: String) {
        resultGenerated = false
        changeOperation = false
        if concatenateDigit {
            if numericValue <= 100_000_000 {
                setDisplayString(rawDisplay + digit)
            }
        } else {
            setDisplayString(digit)
            concatenateDigit = true
        }
    }

    /// Select an operator, computing any pending chained result first.
    mutating func selectOperation(_ operation: CalculatorOperation) {
        if activeOperation != nil && !changeOperation {
            generateResult()
            firstOperand = result
        } else {
            firstOperand = numericValue
        }

        concatenateDigit = false
        activeOperation = operation
        changeOperation = true
        resultGenerated = true
        highlightedOperation = operation
    }

    /// Evaluate the pending operation (the `=` key, and chained intermediates).
    mutating func generateResult() {
        if !changeOperation {
            secondOperand = numericValue

            switch activeOperation {
            case .division:
                if secondOperand == 0 {
                    showExplosion = true
                    cancelButton()
                    return
                }
                result = firstOperand / secondOperand
            case .multiplication:
                result = firstOperand * secondOperand
            case .subtraction:
                result = firstOperand - secondOperand
            case .addition:
                result = firstOperand + secondOperand
            case .none:
                return
            }

            setDisplayNumber(Self.toFixedTrim(result, 5))
        }

        activeOperation = nil
        changeOperation = true
        concatenateDigit = false
        highlightedOperation = nil
        resultGenerated = true
    }

    /// The `C` / `AC` key. Clears the display; a second press (once the display
    /// is a numeric zero) also clears the pending operation.
    mutating func cancelButton() {
        if !concatenateDigit && displayIsNumeric && numericValue == 0 {
            activeOperation = nil
        }
        setDisplayNumber(0)
        concatenateDigit = false
        highlightedOperation = nil
        changeOperation = true
    }

    /// The `.` key. Adds a decimal point, guarding against a second dot and
    /// starting a fresh `0.` after a result.
    mutating func addDot() {
        let isInteger = numericValue.rounded() == numericValue
        let hasDot = rawDisplay.contains(".")

        if resultGenerated {
            setDisplayString("0.")
        } else if isInteger && !hasDot {
            setDisplayString(rawDisplay + ".")
        } else {
            setDisplayString(rawDisplay)
        }
        concatenateDigit = true
    }

    /// The `%` key: divide the current value by 100.
    mutating func percentage() {
        setDisplayNumber(numericValue / 100)
        concatenateDigit = false
        highlightedOperation = nil
    }

    /// The `+/−` key: flip the sign of the current value.
    mutating func invertSign() {
        setDisplayNumber(numericValue * -1)
        highlightedOperation = nil
    }

    // MARK: - Display assignment

    private mutating func setDisplayString(_ value: String) {
        rawDisplay = value
        displayIsNumeric = false
    }

    private mutating func setDisplayNumber(_ value: Double) {
        rawDisplay = Self.jsString(value)
        displayIsNumeric = true
    }

    // MARK: - JS-compatible helpers

    /// Mimics JS `Number(String)` for the values this engine produces.
    static func jsNumber(_ string: String) -> Double {
        let trimmed = string.trimmingCharacters(in: .whitespaces)
        if trimmed.isEmpty { return 0 }
        if let value = Double(trimmed) { return value }
        // Handle a trailing dot ("12.", "0.") which `Double` rejects but JS accepts.
        if trimmed.hasSuffix("."), let value = Double(trimmed.dropLast()) { return value }
        return 0
    }

    /// Mimics JS `Number.toString()` for these values: integers render without a
    /// decimal point; other values use the shortest round-trip form.
    static func jsString(_ value: Double) -> String {
        if value == value.rounded() && abs(value) < 9_000_000_000_000_000_000 {
            return String(Int64(value))
        }
        return String(value)
    }

    /// Mimics JS `+value.toFixed(digits)`: round to `digits` decimals, then drop
    /// trailing zeros by re-parsing.
    static func toFixedTrim(_ value: Double, _ digits: Int) -> Double {
        let rounded = String(format: "%.\(digits)f", value)
        return Double(rounded) ?? value
    }

    private static func groupedString(_ value: Double) -> String {
        let formatter = NumberFormatter()
        formatter.numberStyle = .decimal
        formatter.usesGroupingSeparator = true
        formatter.minimumFractionDigits = 0
        formatter.maximumFractionDigits = 3
        return formatter.string(from: NSNumber(value: value)) ?? String(value)
    }

    private static func exponentialString(_ value: Double) -> String {
        let formatter = NumberFormatter()
        formatter.numberStyle = .scientific
        formatter.usesGroupingSeparator = false
        formatter.exponentSymbol = "e"
        formatter.maximumFractionDigits = 8
        return formatter.string(from: NSNumber(value: value)) ?? String(value)
    }
}
