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
            fontSize: WINDOW_WITH > 320 ? 20 : 15,
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
    borderWidth: WINDOW_WITH > 320 ? 5 : 3,
    borderRadius: WINDOW_WITH > 320 ? 15 : 12,
    marginHorizontal: 5,
  },
});

export default ThemeButton;
