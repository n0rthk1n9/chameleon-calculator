import React from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';

const WINDOW_WITH = Dimensions.get('window').width;

const Display = ({ display }) => {
  return (
    <View>
      <Text style={styles.display}>
        {Number(display) >= 1000000000
          ? Number(display).toExponential()
          : Number(display).toLocaleString()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  display: {
    fontSize: WINDOW_WITH > 320 ? 40 : 25,
    color: '#FFFFFF',
    paddingHorizontal: 10,
  },
});

export default Display;
