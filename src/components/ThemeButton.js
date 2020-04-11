import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Dimensions,
} from 'react-native';

const WINDOW_WITH = Dimensions.get('window').width;

const ThemeButton = ({ themeName, theme, selectedTheme, onThemeChange }) => {
  return (
    <View>
      <TouchableHighlight
        style={[
          styles.button,
          {
            backgroundColor: theme.buttonTheme.buttonBackgroundColor,
            borderColor:
              themeName === selectedTheme ? '#000000' : theme.gradient[0],
          },
        ]}
        underlayColor={theme.buttonTheme.buttonPressColor}
        onPress={() => onThemeChange(themeName)}
      >
        <Text
          style={{
            fontSize: 20,
            color: theme.buttonTheme.buttonFontColor,
          }}
        >
          {theme.titel}
        </Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 5,
    borderRadius: 15,
    marginHorizontal: 5,
  },
});

export default ThemeButton;
