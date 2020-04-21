import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  AsyncStorage,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Display from '../components/Display';
import Button from '../components/Button';
import ThemeButton from '../components/ThemeButton';
import { THEMES } from '../constants/themes';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedTheme } from '../store/actions/themes';

let firstOperand;
let secondOperand;
let result;

const WINDOW_HEIGHT = Dimensions.get('window').height;

const CalculatorScreen = () => {
  const selectedTheme = useSelector((state) => state.themes.selectedTheme);
  const [display, setDisplay] = useState('0');
  const [operation, setOperation] = useState('');
  const [changeOperation, setChangeOperation] = useState(true);
  const [shouldConcatenateDigit, setShouldConcatenateDigit] = useState(false);
  const [highlightedButtons, setHighlightedButtons] = useState({
    addition: false,
    subtraction: false,
    multiplication: false,
    division: false,
  });
  const [showExplosion, setShowExplosion] = useState(false);
  const [resultGenerated, setResultGenerated] = useState(false);

  const dispatch = useDispatch();

  const concatenateDigit = (digit) => {
    setResultGenerated(false);
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
          if (secondOperand === 0) {
            setShowExplosion(true);
            setTimeout(() => {
              setShowExplosion(false);
            }, 3200);
            cancelButton();
            return;
          } else {
            result = firstOperand / secondOperand;
          }
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
    setResultGenerated(true);
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
    if (
      Math.round(display) === Number(display) &&
      !display.toString().includes('.')
    ) {
      if (resultGenerated) {
        setDisplay(0 + '.');
        setShouldConcatenateDigit(true);
      } else {
        setDisplay(display + '.');
        setShouldConcatenateDigit(true);
      }
    } else {
      if (resultGenerated) {
        setDisplay(0 + '.');
        setShouldConcatenateDigit(true);
      } else {
        setDisplay(display);
        setShouldConcatenateDigit(true);
      }
    }
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

  const readSelectedTheme = async () => {
    try {
      const value = await AsyncStorage.getItem('theme');
      if (value !== null && Object.keys(THEMES).includes(value)) {
        dispatch(setSelectedTheme(value));
      } else {
        dispatch(setSelectedTheme('flamingo'));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    readSelectedTheme();
  }, []);

  return showExplosion ? (
    <Image
      style={{ width: '100%', height: '100%' }}
      source={require('../assets/explosion.gif')}
    />
  ) : (
    <LinearGradient
      style={styles.container}
      colors={THEMES[selectedTheme].gradient}
    >
      <View style={styles.display}>
        <Display display={display} theme={THEMES[selectedTheme].displayTheme} />
      </View>
      <View style={styles.themes}>
        {Object.keys(THEMES).map((themeName) => {
          return (
            <ThemeButton
              key={themeName}
              themeName={themeName}
              theme={THEMES[themeName]}
              selectedTheme={selectedTheme}
            />
          );
        })}
      </View>
      <View style={styles.numPad}>
        <View style={styles.numPadRow}>
          <Button
            label={display ? 'C' : 'AC'}
            operation={() => cancelButton()}
            theme={THEMES[selectedTheme].buttonTheme}
          />
          <Button
            label="+/-"
            operation={() => invertSignal()}
            theme={THEMES[selectedTheme].buttonTheme}
          />
          <Button
            label="%"
            operation={() => percentage()}
            theme={THEMES[selectedTheme].buttonTheme}
          />
          <Button
            label="÷"
            operation={() => activateOperation('division')}
            highlightButton={highlightedButtons.division}
            theme={THEMES[selectedTheme].buttonTheme}
          />
        </View>
        <View style={styles.numPadRow}>
          <Button
            label="7"
            operation={() => concatenateDigit('7')}
            theme={THEMES[selectedTheme].buttonTheme}
          />
          <Button
            label="8"
            operation={() => concatenateDigit('8')}
            theme={THEMES[selectedTheme].buttonTheme}
          />
          <Button
            label="9"
            operation={() => concatenateDigit('9')}
            theme={THEMES[selectedTheme].buttonTheme}
          />
          <Button
            label="×"
            operation={() => activateOperation('multiplication')}
            highlightButton={highlightedButtons.multiplication}
            theme={THEMES[selectedTheme].buttonTheme}
          />
        </View>
        <View style={styles.numPadRow}>
          <Button
            label="4"
            operation={() => concatenateDigit('4')}
            theme={THEMES[selectedTheme].buttonTheme}
          />
          <Button
            label="5"
            operation={() => concatenateDigit('5')}
            theme={THEMES[selectedTheme].buttonTheme}
          />
          <Button
            label="6"
            operation={() => concatenateDigit('6')}
            theme={THEMES[selectedTheme].buttonTheme}
          />
          <Button
            label="-"
            operation={() => activateOperation('subtraction')}
            highlightButton={highlightedButtons.subtraction}
            theme={THEMES[selectedTheme].buttonTheme}
          />
        </View>
        <View style={styles.numPadRow}>
          <Button
            label="1"
            operation={() => concatenateDigit('1')}
            theme={THEMES[selectedTheme].buttonTheme}
          />
          <Button
            label="2"
            operation={() => concatenateDigit('2')}
            theme={THEMES[selectedTheme].buttonTheme}
          />
          <Button
            label="3"
            operation={() => concatenateDigit('3')}
            theme={THEMES[selectedTheme].buttonTheme}
          />
          <Button
            label="+"
            operation={() => activateOperation('addition')}
            highlightButton={highlightedButtons.addition}
            theme={THEMES[selectedTheme].buttonTheme}
          />
        </View>
        <View style={styles.numPadRow}>
          <Button
            label="0"
            doubleSize={true}
            operation={() => concatenateDigit('0')}
            theme={THEMES[selectedTheme].buttonTheme}
          />
          <Button
            label="."
            operation={() => addDot()}
            theme={THEMES[selectedTheme].buttonTheme}
          />
          <Button
            label="="
            operation={() => generateResult()}
            theme={THEMES[selectedTheme].buttonTheme}
          />
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
    height: WINDOW_HEIGHT / 4,
  },
  themes: {
    flexDirection: 'row',
    height: WINDOW_HEIGHT / 15,
    marginBottom: 10,
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

export default CalculatorScreen;
