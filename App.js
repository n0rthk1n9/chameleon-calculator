import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Display from './src/components/Display';
import Button from './src/components/Button';

let firstOperand;
let secondOperand;
let result;

const WINDOW_HEIGHT = Dimensions.get('window').height;

const App = () => {
  const [display, setDisplay] = useState(0);
  const [operation, setOperation] = useState('');
  const [changeOperation, setChangeOperation] = useState(true);
  const [shouldConcatenateDigit, setShouldConcatenateDigit] = useState(false);
  const [highlightAdditionButton, setHighlightAdditionButton] = useState(false);
  const [highlightSubtractionButton, setHighlightSubtractionButton] = useState(
    false
  );
  const [highlightDivisionButton, setHighlightDivisionButton] = useState(false);
  const [
    highlightMultiplicationButton,
    setHighlightMultiplicationButton,
  ] = useState(false);

  const concatenateDigit = (digit) => {
    setChangeOperation(false);
    if (shouldConcatenateDigit) {
      if (Number(display) <= 100000000) {
        setDisplay(display + digit);
      }
    } else {
      setDisplay(digit);
      setShouldConcatenateDigit(true);
    }
  };

  const activateOperation = (chosenOperation) => {
    if (operation !== '' && !changeOperation) {
      generateResult();
      firstOperand = result;
    } else {
      firstOperand = Number(display);
    }

    setShouldConcatenateDigit(false);
    setOperation(chosenOperation);
    setHighlightAdditionButton(false);
    setHighlightSubtractionButton(false);
    setHighlightMultiplicationButton(false);
    setHighlightDivisionButton(false);

    switch (chosenOperation) {
      case 'division':
        setHighlightDivisionButton(true);
        break;
      case 'multiplication':
        setHighlightMultiplicationButton(true);
        break;
      case 'subtraction':
        setHighlightSubtractionButton(true);
        break;
      case 'addition':
        setHighlightAdditionButton(true);
        break;
      default:
        break;
    }
    setChangeOperation(true);
  };

  const generateResult = () => {
    if (!changeOperation) {
      secondOperand = Number(display);

      switch (operation) {
        case 'division':
          result = firstOperand / secondOperand;
          break;
        case 'multiplication':
          secondOperand = Number(display);
          result = firstOperand * secondOperand;
          break;
        case 'subtraction':
          secondOperand = Number(display);
          result = firstOperand - secondOperand;
          break;
        case 'addition':
          secondOperand = Number(display);
          result = firstOperand + secondOperand;
          break;
        default:
          return null;
      }

      setDisplay(+result.toFixed(5));
    }

    setOperation('');
    setChangeOperation(true);
    setShouldConcatenateDigit(false);
    setHighlightDivisionButton(false);
    setHighlightMultiplicationButton(false);
    setHighlightSubtractionButton(false);
    setHighlightAdditionButton(false);
  };

  const cancelButton = () => {
    if (!shouldConcatenateDigit && display === 0) {
      setOperation('');
    }
    setDisplay(0);
    setShouldConcatenateDigit(false);
    setHighlightDivisionButton(false);
    setHighlightMultiplicationButton(false);
    setHighlightSubtractionButton(false);
    setHighlightAdditionButton(false);
  };

  const addDot = () => {
    if (Math.round(display) === Number(display) && !display.includes('.')) {
      setDisplay(`${display}.`);
      setShouldConcatenateDigit(true);
    }
  };

  const percentage = () => {
    setDisplay(Number(display) / 100);
  };

  const invertSignal = () => {
    setDisplay(Number(display) * -1);
  };

  return (
    <LinearGradient style={styles.container} colors={['#FF69B4', '#de5b9c']}>
      <View style={styles.display}>
        <Display display={display} />
      </View>
      <View style={styles.numPad}>
        <View style={styles.numPadRow}>
          <Button
            label={display ? 'C' : 'AC'}
            operation={() => cancelButton()}
          />
          <Button label="+/-" operation={() => invertSignal()} />
          <Button label="%" operation={() => percentage()} />
          <Button
            label="÷"
            operation={() => activateOperation('division')}
            highlightButton={highlightDivisionButton}
          />
        </View>
        <View style={styles.numPadRow}>
          <Button label="7" operation={() => concatenateDigit('7')} />
          <Button label="8" operation={() => concatenateDigit('8')} />
          <Button label="9" operation={() => concatenateDigit('9')} />
          <Button
            label="×"
            operation={() => activateOperation('multiplication')}
            highlightButton={highlightMultiplicationButton}
          />
        </View>
        <View style={styles.numPadRow}>
          <Button label="4" operation={() => concatenateDigit('4')} />
          <Button label="5" operation={() => concatenateDigit('5')} />
          <Button label="6" operation={() => concatenateDigit('6')} />
          <Button
            label="-"
            operation={() => activateOperation('subtraction')}
            highlightButton={highlightSubtractionButton}
          />
        </View>
        <View style={styles.numPadRow}>
          <Button label="1" operation={() => concatenateDigit('1')} />
          <Button label="2" operation={() => concatenateDigit('2')} />
          <Button label="3" operation={() => concatenateDigit('3')} />
          <Button
            label="+"
            operation={() => activateOperation('addition')}
            highlightButton={highlightAdditionButton}
          />
        </View>
        <View style={styles.numPadRow}>
          <Button
            label="0"
            doubleSize={true}
            operation={() => concatenateDigit('0')}
          />
          <Button label="." operation={() => addDot()} />
          <Button label="=" operation={() => generateResult()} />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: WINDOW_HEIGHT / 10,
  },
  display: {
    flexDirection: 'row',
    height: WINDOW_HEIGHT / 3,
  },
  numPad: {
    height: WINDOW_HEIGHT / 2,
  },
  numPadRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: WINDOW_HEIGHT / 2 / 5,
  },
});

export default App;
