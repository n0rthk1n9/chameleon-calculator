import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableHighlight,
  AsyncStorage,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Display from "../components/Display";
import Button from "../components/Button";
import ThemeButton from "../components/ThemeButton";
import { THEMES } from "../constants/themes";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedTheme,
  setAdditionButtonHighlighted,
  setSubtractionButtonHighlighted,
  setMultiplicationButtonHighlighted,
  setDivisionButtonHighlighted,
  setShowExplosion,
} from "../store/actions/themes";
import { setDisplay, setConcatenateDigit } from "../store/actions/display";
import {
  setActiveOperation,
  setChangeOperation,
  setResultGenerated,
} from "../store/actions/operations";

let firstOperand;
let secondOperand;
let result;

const WINDOW_HEIGHT = Dimensions.get("window").height;

const CalculatorScreen = () => {
  const display = useSelector((state) => state.display.display);
  const concatenateDigit = useSelector(
    (state) => state.display.concatenateDigit
  );

  const selectedTheme = useSelector((state) => state.themes.selectedTheme);
  const additionButtonHighlighted = useSelector(
    (state) => state.themes.additionButtonHighlighted
  );
  const subtractionButtonHighlighted = useSelector(
    (state) => state.themes.subtractionButtonHighlighted
  );
  const multiplicationButtonHighlighted = useSelector(
    (state) => state.themes.multiplicationButtonHighlighted
  );
  const divisionButtonHighlighted = useSelector(
    (state) => state.themes.divisionButtonHighlighted
  );

  const activeOperation = useSelector(
    (state) => state.operations.activeOperation
  );
  const changeOperation = useSelector(
    (state) => state.operations.changeOperation
  );
  const resultGenerated = useSelector(
    (state) => state.operations.resultGenerated
  );
  const showExplosion = useSelector((state) => state.themes.showExplosion);

  const dispatch = useDispatch();

  const handleConcatenateDigit = (digit) => {
    dispatch(setResultGenerated(false));
    dispatch(setChangeOperation(false));
    if (concatenateDigit) {
      if (Number(display) <= 100000000) {
        dispatch(setDisplay(display + digit));
      }
    } else {
      dispatch(setDisplay(digit));
      dispatch(setConcatenateDigit(true));
    }
  };

  const activateOperation = (chosenOperation) => {
    if (activeOperation !== "" && !changeOperation) {
      generateResult();
      firstOperand = result;
    } else {
      firstOperand = Number(display);
    }

    dispatch(setConcatenateDigit(false));
    dispatch(setActiveOperation(chosenOperation));
    dispatch(setChangeOperation(true));
    dispatch(setResultGenerated(true));
    switch (chosenOperation) {
      case "addition":
        dispatch(setAdditionButtonHighlighted(true));
        break;
      case "subtraction":
        dispatch(setSubtractionButtonHighlighted(true));
        break;
      case "multiplication":
        dispatch(setMultiplicationButtonHighlighted(true));
        break;
      case "division":
        dispatch(setDivisionButtonHighlighted(true));
        break;
      default:
        break;
    }
  };

  const generateResult = () => {
    if (!changeOperation) {
      secondOperand = Number(display);

      switch (activeOperation) {
        case "division":
          if (secondOperand === 0) {
            dispatch(setShowExplosion(true));
            setTimeout(() => {
              dispatch(setShowExplosion(false));
            }, 3200);
            cancelButton();
            return;
          } else {
            result = firstOperand / secondOperand;
          }
          break;
        case "multiplication":
          secondOperand = Number(display);
          result = firstOperand * secondOperand;
          break;
        case "subtraction":
          secondOperand = Number(display);
          result = firstOperand - secondOperand;
          break;
        case "addition":
          secondOperand = Number(display);
          result = firstOperand + secondOperand;
          break;
        default:
          return null;
      }

      dispatch(setDisplay(+result.toFixed(5)));
    }

    dispatch(setActiveOperation(""));
    dispatch(setChangeOperation(true));
    dispatch(setConcatenateDigit(false));
    resetHighlightedButtons();
    dispatch(setResultGenerated(true));
  };

  const cancelButton = () => {
    if (!concatenateDigit && display === 0) {
      dispatch(setActiveOperation(""));
    }
    dispatch(setDisplay(0));
    dispatch(setConcatenateDigit(false));
    resetHighlightedButtons();
    dispatch(setChangeOperation(true));
  };

  const addDot = () => {
    if (
      Math.round(display) === Number(display) &&
      !display.toString().includes(".")
    ) {
      if (resultGenerated) {
        dispatch(setDisplay(0 + "."));
        dispatch(setConcatenateDigit(true));
      } else {
        dispatch(setDisplay(display + "."));
        dispatch(setConcatenateDigit(true));
      }
    } else {
      if (resultGenerated) {
        dispatch(setDisplay(0 + "."));
        dispatch(setConcatenateDigit(true));
      } else {
        dispatch(setDisplay(display));
        dispatch(setConcatenateDigit(true));
      }
    }
  };

  const percentage = () => {
    dispatch(setDisplay(Number(display) / 100));
    dispatch(setConcatenateDigit(false));
    resetHighlightedButtons();
  };

  const invertSignal = () => {
    dispatch(setDisplay(Number(display) * -1));
    resetHighlightedButtons();
  };

  const resetHighlightedButtons = () => {
    dispatch(setAdditionButtonHighlighted(false));
    dispatch(setSubtractionButtonHighlighted(false));
    dispatch(setMultiplicationButtonHighlighted(false));
    dispatch(setDivisionButtonHighlighted(false));
  };

  const readSelectedTheme = async () => {
    try {
      const value = await AsyncStorage.getItem("theme");
      if (value !== null && Object.keys(THEMES).includes(value)) {
        dispatch(setSelectedTheme(value));
      } else {
        dispatch(setSelectedTheme("flamingo"));
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
      style={{ width: "100%", height: "100%" }}
      source={require("../assets/explosion.gif")}
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
            label={display ? "C" : "AC"}
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
            operation={() => activateOperation("division")}
            highlightButton={divisionButtonHighlighted}
            theme={THEMES[selectedTheme].buttonTheme}
          />
        </View>
        <View style={styles.numPadRow}>
          <Button
            label="7"
            operation={() => handleConcatenateDigit("7")}
            theme={THEMES[selectedTheme].buttonTheme}
          />
          <Button
            label="8"
            operation={() => handleConcatenateDigit("8")}
            theme={THEMES[selectedTheme].buttonTheme}
          />
          <Button
            label="9"
            operation={() => handleConcatenateDigit("9")}
            theme={THEMES[selectedTheme].buttonTheme}
          />
          <Button
            label="×"
            operation={() => activateOperation("multiplication")}
            highlightButton={multiplicationButtonHighlighted}
            theme={THEMES[selectedTheme].buttonTheme}
          />
        </View>
        <View style={styles.numPadRow}>
          <Button
            label="4"
            operation={() => handleConcatenateDigit("4")}
            theme={THEMES[selectedTheme].buttonTheme}
          />
          <Button
            label="5"
            operation={() => handleConcatenateDigit("5")}
            theme={THEMES[selectedTheme].buttonTheme}
          />
          <Button
            label="6"
            operation={() => handleConcatenateDigit("6")}
            theme={THEMES[selectedTheme].buttonTheme}
          />
          <Button
            label="-"
            operation={() => activateOperation("subtraction")}
            highlightButton={subtractionButtonHighlighted}
            theme={THEMES[selectedTheme].buttonTheme}
          />
        </View>
        <View style={styles.numPadRow}>
          <Button
            label="1"
            operation={() => handleConcatenateDigit("1")}
            theme={THEMES[selectedTheme].buttonTheme}
          />
          <Button
            label="2"
            operation={() => handleConcatenateDigit("2")}
            theme={THEMES[selectedTheme].buttonTheme}
          />
          <Button
            label="3"
            operation={() => handleConcatenateDigit("3")}
            theme={THEMES[selectedTheme].buttonTheme}
          />
          <Button
            label="+"
            operation={() => activateOperation("addition")}
            highlightButton={additionButtonHighlighted}
            theme={THEMES[selectedTheme].buttonTheme}
          />
        </View>
        <View style={styles.numPadRow}>
          <Button
            label="0"
            doubleSize={true}
            operation={() => handleConcatenateDigit("0")}
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
    alignItems: "center",
    paddingTop: WINDOW_HEIGHT / 8,
  },
  display: {
    flexDirection: "row",
    height: WINDOW_HEIGHT / 4,
  },
  themes: {
    flexDirection: "row",
    height: WINDOW_HEIGHT / 15,
    marginBottom: 10,
  },
  numPad: {
    height: WINDOW_HEIGHT / 2,
  },
  numPadRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    height: WINDOW_HEIGHT / 2 / 5,
  },
});

export default CalculatorScreen;
