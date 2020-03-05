import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Display = ({ display }) => {
  return (
    <View>
      <Text style={styles.display}>{display}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  display: {
    fontSize: 40,
    color: 'red'
  }
});

export default Display;
