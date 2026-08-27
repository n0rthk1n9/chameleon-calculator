import SwiftUI

/// The calculator screen: themed gradient background, result display, theme
/// selector, and the Liquid Glass keypad.
struct CalculatorView: View {
    @State private var model = CalculatorModel()

    var body: some View {
        let theme = model.theme
        ZStack {
            theme.backgroundGradient
                .ignoresSafeArea()

            VStack(spacing: 18) {
                DisplayView(text: model.display, theme: theme)
                    .padding(.top, 28)

                ThemeSelectorView(
                    themes: Theme.all,
                    selectedID: model.selectedThemeID,
                    onSelect: { model.selectTheme($0) }
                )

                KeypadView(model: model, theme: theme)
            }
            .padding(.horizontal, 16)
            .padding(.bottom, 12)
        }
        .animation(.smooth(duration: 0.3), value: model.selectedThemeID)
    }
}

/// The 4-column keypad. The `0` key spans two columns, matching the original
/// layout. Wrapped in a `GlassEffectContainer` so the glass keys sample a shared
/// region and render consistently.
private struct KeypadView: View {
    let model: CalculatorModel
    let theme: Theme

    var body: some View {
        GlassEffectContainer(spacing: 12) {
            Grid(horizontalSpacing: 12, verticalSpacing: 12) {
                GridRow {
                    key(model.clearLabel) { model.clear() }
                    key("+/−") { model.invertSign() }
                    key("%") { model.percentage() }
                    operatorKey(.division)
                }
                GridRow {
                    digit("7"); digit("8"); digit("9"); operatorKey(.multiplication)
                }
                GridRow {
                    digit("4"); digit("5"); digit("6"); operatorKey(.subtraction)
                }
                GridRow {
                    digit("1"); digit("2"); digit("3"); operatorKey(.addition)
                }
                GridRow {
                    key("0") { model.inputDigit("0") }
                        .gridCellColumns(2)
                    key(".") { model.addDot() }
                    key("=") { model.equals() }
                }
            }
        }
        .frame(maxHeight: .infinity)
    }

    private func digit(_ value: String) -> some View {
        key(value) { model.inputDigit(value) }
    }

    private func operatorKey(_ operation: CalculatorOperation) -> some View {
        CalculatorButton(
            label: operation.symbol,
            theme: theme,
            isHighlighted: model.isHighlighted(operation)
        ) {
            model.selectOperation(operation)
        }
    }

    private func key(_ label: String, action: @escaping () -> Void) -> some View {
        CalculatorButton(label: label, theme: theme, action: action)
    }
}

#Preview {
    CalculatorView()
}
