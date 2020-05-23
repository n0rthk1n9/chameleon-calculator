import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Dimensions,
  AsyncStorage,
  Button,
} from 'react-native';
import { useDispatch } from 'react-redux';

import { setSelectedTheme } from '../store/actions/themes';

const WINDOW_WITH = Dimensions.get('window').width;

const ThemeRow = ({ themeName, theme, selectedTheme, navigation }) => {
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
    navigation.navigate('Calculator');
  };

  return (
    <View style={styles.themeRow}>
      <Text>{theme.title}</Text>
      <View style={{ flexDirection: 'row' }}>
        <View
          style={{ backgroundColor: theme.gradient[0], width: 30, height: 30 }}
        />
        <View
          style={{ backgroundColor: theme.gradient[1], width: 30, height: 30 }}
        />
        <View
          style={{
            backgroundColor: theme.buttonTheme.buttonPressColor,
            width: 30,
            height: 30,
          }}
        />
      </View>
      <Button title="select" onPress={selectedThemeHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  themeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default ThemeRow;
