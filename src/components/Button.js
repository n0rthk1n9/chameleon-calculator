import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Dimensions
} from 'react-native';

const Button = ({ label, operation, doubleSize }) => {
  return (
    <View
      style={
        doubleSize
          ? [styles.view, styles.doubleSizeView]
          : [styles.view, styles.singleSizeView]
      }
    >
      <TouchableHighlight
        style={styles.button}
        underlayColor={'red'}
        onPress={operation}
      >
        <Text style={styles.number}>{label}</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    padding: 10
  },
  singleSizeView: {
    width: Dimensions.get('window').width / 4
  },
  doubleSizeView: {
    width: Dimensions.get('window').width / 2
  },
  number: {
    fontSize: 35,
    textAlign: 'center'
  }
});

export default Button;
