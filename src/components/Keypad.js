import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Keypad = ({ onPress, isDarkMode }) => {
  const renderButtons = (numbers) => {
    return numbers.map((number) => (
      <TouchableOpacity
        key={number}
        style={[styles.button, { backgroundColor: isDarkMode ? '#555' : '#1e445e' }]}
        onPress={() => onPress(number)}
      >
        <Text style={styles.buttonText}>{number}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: isDarkMode ? '#555' : '#1e445e' }]}
          onPress={() => onPress('00')}
        >
          <Text style={styles.buttonText}>00</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: isDarkMode ? '#555' : '#1e445e' }]}
          onPress={() => onPress('000')}
        >
          <Text style={styles.buttonText}>000</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: isDarkMode ? '#555' : '#1e445e' }]}
          onPress={() => onPress('clear')}
        >
          <FontAwesome name={'remove'} size={24} color={isDarkMode ? 'black' : 'white'} style={styles.inputIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.row}>{renderButtons([7, 8, 9])}</View>
      <View style={styles.row}>{renderButtons([4, 5, 6])}</View>
      <View style={styles.row}>{renderButtons([1, 2, 3])}</View>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: isDarkMode ? '#555' : '#1e445e' }]}
          onPress={() => onPress('0')}
        >
          <Text style={styles.buttonText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: isDarkMode ? '#555' : '#1e445e' }]}
          onPress={() => onPress('.')}
        >
          <Text style={styles.buttonText}>.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 5,
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  inputIcon: {
    marginRight: 5,
  },
});

export default Keypad;