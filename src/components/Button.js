import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Dimensions
} from 'react-native';

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
    // flex: 1,
    height: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#de5b9c',
    borderRadius: 4,
    margin: 5
  },
  singleSizeView: {
    width: Dimensions.get('window').width / 4 - 2.5
  },
  doubleSizeView: {
    width: Dimensions.get('window').width / 2 - 2.5
  },
  number: {
    // height: '100%',
    fontSize: 35,
    color: '#FFFFFF'
    // textAlign: 'center'
  }
});

export default Button;
