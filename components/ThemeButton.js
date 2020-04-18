import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Dimensions,
  AsyncStorage,
} from 'react-native';
import { useDispatch } from 'react-redux';

import { setSelectedTheme } from '../store/actions/themes';

const WINDOW_WITH = Dimensions.get('window').width;

const ThemeButton = ({ themeName, theme, selectedTheme }) => {
  const dispatch = useDispatch();

  const writeSelectedTheme = async (chosenTheme) => {
    try {
      await AsyncStorage.setItem('theme', chosenTheme);
    } catch (error) {
      console.log(error);
    }
  };

  const selectedThemeHandler = () => {
    dispatch(setSelectedTheme(themeName));
    writeSelectedTheme(themeName);
  };

  return (
    <View>
      <TouchableHighlight
        style={[
          styles.button,
          {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            borderBottomColor:
              themeName === selectedTheme ? '#000000' : theme.gradient[0],
          },
        ]}
        underlayColor={theme.buttonTheme.buttonPressColor}
        onPress={selectedThemeHandler}
      >
        <Text
          style={{
            fontSize: 20,
            color: '#000000',
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
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
    marginHorizontal: 10,
  },
});

export default ThemeButton;
