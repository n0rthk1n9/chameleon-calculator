import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Dimensions,
} from 'react-native';

const WINDOW_WITH = Dimensions.get('window').width;

const Button = ({ label, operation, doubleSize, highlightButton }) => {
  return (
    <View
      style={doubleSize ? [styles.doubleSizeView] : [styles.singleSizeView]}
    >
      <TouchableHighlight
        style={
          highlightButton
            ? [styles.button, { backgroundColor: '#c8518b' }]
            : [styles.button]
        }
        underlayColor={'#c8518b'}
        onPress={operation}
      >
        <Text style={styles.number}>{label}</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#de5b9c',
    borderRadius: 4,
    margin: 5,
  },
  singleSizeView: {
    width: WINDOW_WITH / 4 - 2.5,
  },
  doubleSizeView: {
    width: WINDOW_WITH / 2 - 2.5,
  },
  number: {
    fontSize: WINDOW_WITH > 320 ? 35 : 25,
    color: '#FFFFFF',
  },
});

export default Button;
