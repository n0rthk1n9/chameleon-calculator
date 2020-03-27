import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

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
    fontSize: 40,
    color: '#FFFFFF'
  }
});

export default Display;
