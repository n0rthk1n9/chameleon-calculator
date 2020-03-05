import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight } from 'react-native';

const Button = ({ label, operation }) => {
  return (
    <View>
      <TouchableHighlight underlayColor={'red'} onPress={operation}>
        <Text style={styles.number}>{label}</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  number: {
    fontSize: 35
  }
});

export default Button;
