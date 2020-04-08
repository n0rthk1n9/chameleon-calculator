import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Dimensions,
} from 'react-native';

const WINDOW_WITH = Dimensions.get('window').width;

const Button = ({ label, operation, doubleSize, highlightButton, theme }) => {
  return (
    <View
      style={doubleSize ? [styles.doubleSizeView] : [styles.singleSizeView]}
    >
      <TouchableHighlight
        style={
          highlightButton
            ? [styles.button, { backgroundColor: theme.buttonPressColor }]
            : [styles.button, { backgroundColor: theme.buttonBackgroundColor }]
        }
        underlayColor={theme.buttonPressColor}
        onPress={operation}
      >
        <Text style={[styles.number, { color: theme.buttonFontColor }]}>
          {label}
        </Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
    margin: 5,
  },
  singleSizeView: {
    width: WINDOW_WITH / 4 - 2.5,
  },
  doubleSizeView: {
    width: WINDOW_WITH / 2 - 2.5,
  },
  number: {
    fontSize: WINDOW_WITH > 320 ? 35 : 25,
  },
});

export default Button;
