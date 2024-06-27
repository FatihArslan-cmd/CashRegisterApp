import React, { useContext } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../context/ThemeContext';
import useCalculator from '../hooks/useCalculator';
import { ProductContext } from '../context/ProductContext';

//the keybord that are used in sales screen

const CalculatorButton = ({ label, onPress, isDarkMode, icon }) => (
  <TouchableOpacity
    style={[styles.button, { backgroundColor: isDarkMode ? '#555' : '#1e445e' }]}
    onPress={onPress}
  >
    {icon ? <FontAwesome name={icon} size={24} style={styles.inputIcon} /> : <Text style={styles.buttonText}>{label}</Text>}
  </TouchableOpacity>
);

const CalculatorApp = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useContext(ThemeContext);
  const { handleButtonPress } = useCalculator();
  const { inputValue } = useContext(ProductContext);

  return (
    <View style={[styles.container, { borderColor: isDarkMode ? '#444' : '#ccc', backgroundColor: isDarkMode ? '#333' : '#d9e0e8' }]}>
      <TextInput
        style={[styles.input, { color: isDarkMode ? 'white' : 'black', borderColor: isDarkMode ? '#444' : '#ccc', backgroundColor: isDarkMode ? '#555' : 'white' }]}
        value={inputValue}
        keyboardType="numeric"
        editable={false}
        placeholder={t('Enter Amount of money')}
        placeholderTextColor={isDarkMode ? '#aaa' : '#ccc'}
      />
      <View style={styles.row}>
        <CalculatorButton label="00 " onPress={() => handleButtonPress('00')} isDarkMode={isDarkMode} />
        <CalculatorButton label="000 " onPress={() => handleButtonPress('000')} isDarkMode={isDarkMode} />
        <CalculatorButton icon="remove" onPress={() => handleButtonPress('clear')} isDarkMode={isDarkMode} />
      </View>
      <View style={styles.row}>
        <CalculatorButton label="7" onPress={() => handleButtonPress('7')} isDarkMode={isDarkMode} />
        <CalculatorButton label="8" onPress={() => handleButtonPress('8')} isDarkMode={isDarkMode} />
        <CalculatorButton label="9" onPress={() => handleButtonPress('9')} isDarkMode={isDarkMode} />
      </View>
      <View style={styles.row}>
        <CalculatorButton label="4" onPress={() => handleButtonPress('4')} isDarkMode={isDarkMode} />
        <CalculatorButton label="5" onPress={() => handleButtonPress('5')} isDarkMode={isDarkMode} />
        <CalculatorButton label="6" onPress={() => handleButtonPress('6')} isDarkMode={isDarkMode} />
      </View>
      <View style={styles.row}>
        <CalculatorButton label="1" onPress={() => handleButtonPress('1')} isDarkMode={isDarkMode} />
        <CalculatorButton label="2" onPress={() => handleButtonPress('2')} isDarkMode={isDarkMode} />
        <CalculatorButton label="3" onPress={() => handleButtonPress('3')} isDarkMode={isDarkMode} />
      </View>
      <View style={styles.row}>
        <CalculatorButton label="0" onPress={() => handleButtonPress('0')} isDarkMode={isDarkMode} />
        <CalculatorButton label="." onPress={() => handleButtonPress('.')} isDarkMode={isDarkMode} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    width: 275,
    borderRadius: 15,
  },
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
    color: 'white'
  },
  input: {
    borderWidth: 1,
    width: 180,
    height: 50,
    padding: 10,
    margin: 20,
    borderRadius: 15,
  },
  inputIcon: {
    marginRight: 5,
    color: 'white'
  },
});

export default CalculatorApp;
