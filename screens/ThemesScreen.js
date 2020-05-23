import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';

import { THEMES } from '../constants/themes';
import ThemeRow from '../components/ThemeRow';

const WINDOW_HEIGHT = Dimensions.get('window').height;

const ThemesScreen = ({ navigation }) => {
  const selectedTheme = useSelector((state) => state.themes.selectedTheme);

  return (
    <View style={styles.themes}>
      {Object.keys(THEMES).map((themeName) => {
        return (
          <ThemeRow
            key={themeName}
            themeName={themeName}
            theme={THEMES[themeName]}
            selectedTheme={selectedTheme}
            navigation={navigation}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  themes: {
    paddingTop: 100,
  },
});

export default ThemesScreen;
