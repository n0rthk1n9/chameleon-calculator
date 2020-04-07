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
  const [highlightedButtons, setHighlightedButtons] = useState({
    addition: false,
    subtraction: false,
    multiplication: false,
    division: false,
  });

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
    setHighlightedButtons({
      addition: false,
      subtraction: false,
      multiplication: false,
      division: false,
      [chosenOperation]: true,
    });
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
    resetHighlightedButtons();
  };

  const cancelButton = () => {
    if (!shouldConcatenateDigit && display === 0) {
      setOperation('');
    }
    setDisplay(0);
    setShouldConcatenateDigit(false);
    resetHighlightedButtons();
    setChangeOperation(true);
  };

  const addDot = () => {
    if (Math.round(display) === Number(display) && !display.includes('.')) {
      setDisplay(`${display}.`);
      setShouldConcatenateDigit(true);
    }
    resetHighlightedButtons();
    setChangeOperation(true);
    setOperation('');
  };

  const percentage = () => {
    setDisplay(Number(display) / 100);
    resetHighlightedButtons();
  };

  const invertSignal = () => {
    setDisplay(Number(display) * -1);
    resetHighlightedButtons();
  };

  const resetHighlightedButtons = () => {
    setHighlightedButtons({
      addition: false,
      subtraction: false,
      multiplication: false,
      division: false,
    });
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
            highlightButton={highlightedButtons.division}
          />
        </View>
        <View style={styles.numPadRow}>
          <Button label="7" operation={() => concatenateDigit('7')} />
          <Button label="8" operation={() => concatenateDigit('8')} />
          <Button label="9" operation={() => concatenateDigit('9')} />
          <Button
            label="×"
            operation={() => activateOperation('multiplication')}
            highlightButton={highlightedButtons.multiplication}
          />
        </View>
        <View style={styles.numPadRow}>
          <Button label="4" operation={() => concatenateDigit('4')} />
          <Button label="5" operation={() => concatenateDigit('5')} />
          <Button label="6" operation={() => concatenateDigit('6')} />
          <Button
            label="-"
            operation={() => activateOperation('subtraction')}
            highlightButton={highlightedButtons.subtraction}
          />
        </View>
        <View style={styles.numPadRow}>
          <Button label="1" operation={() => concatenateDigit('1')} />
          <Button label="2" operation={() => concatenateDigit('2')} />
          <Button label="3" operation={() => concatenateDigit('3')} />
          <Button
            label="+"
            operation={() => activateOperation('addition')}
            highlightButton={highlightedButtons.addition}
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
    paddingTop: WINDOW_HEIGHT / 8,
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
