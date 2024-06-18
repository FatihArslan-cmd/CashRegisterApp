import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ToastMessage = ({ message, isDarkMode }) => {
  const styles = isDarkMode ? darkStyles : lightStyles;

  return (
    <View style={styles.toast}>
      <Text style={styles.toastText}> {message} </Text>
    </View>
  );
};

const lightStyles = StyleSheet.create({
  toast: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 20,
  },
  toastText: {
    color: 'white',
    fontSize: 16,
  },
});

const darkStyles = StyleSheet.create({
  toast: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    position: 'absolute',
    alignSelf: 'center',
    bottom: 20,
  },
  toastText: {
    color: 'black',
    fontSize: 16,
  },
});

export default ToastMessage;
