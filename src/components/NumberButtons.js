import React, { useContext } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../context/ThemeContext';
import useCalculator from '../hooks/useCalculator';
import { ProductContext } from '../context/ProductContext';
const CalculatorApp = () => {
  const { t } = useTranslation();
  const { isDarkMode } = useContext(ThemeContext);
  const { handleButtonPress} = useCalculator();
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
        <TouchableOpacity style={[styles.button, { backgroundColor: isDarkMode ? '#555' : '#1e445e' }]} onPress={() => handleButtonPress('00')}>
          <Text style={styles.buttonText}>00 </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: isDarkMode ? '#555' : '#1e445e' }]} onPress={() => handleButtonPress('000')}>
          <Text style={styles.buttonText}>000 </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: isDarkMode ? '#555' : '#1e445e' }]} onPress={() => handleButtonPress('clear')}>
          <FontAwesome name={'remove'} size={24} color={isDarkMode ? 'black' : 'white'} style={styles.inputIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={[styles.button, { backgroundColor: isDarkMode ? '#555' : '#1e445e' }]} onPress={() => handleButtonPress('7')}>
          <Text style={styles.buttonText}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: isDarkMode ? '#555' : '#1e445e' }]} onPress={() => handleButtonPress('8')}>
          <Text style={styles.buttonText}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: isDarkMode ? '#555' : '#1e445e' }]} onPress={() => handleButtonPress('9')}>
          <Text style={styles.buttonText}>9</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={[styles.button, { backgroundColor: isDarkMode ? '#555' : '#1e445e' }]} onPress={() => handleButtonPress('4')}>
          <Text style={styles.buttonText}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: isDarkMode ? '#555' : '#1e445e' }]} onPress={() => handleButtonPress('5')}>
          <Text style={styles.buttonText}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: isDarkMode ? '#555' : '#1e445e' }]} onPress={() => handleButtonPress('6')}>
          <Text style={styles.buttonText}>6</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={[styles.button, { backgroundColor: isDarkMode ? '#555' : '#1e445e' }]} onPress={() => handleButtonPress('1')}>
          <Text style={styles.buttonText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: isDarkMode ? '#555' : '#1e445e' }]} onPress={() => handleButtonPress('2')}>
          <Text style={styles.buttonText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: isDarkMode ? '#555' : '#1e445e' }]} onPress={() => handleButtonPress('3')}>
          <Text style={styles.buttonText}>3</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={[styles.button, { backgroundColor: isDarkMode ? '#555' : '#1e445e' }]} onPress={() => handleButtonPress('0')}>
          <Text style={styles.buttonText}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, { backgroundColor: isDarkMode ? '#555' : '#1e445e' }]} onPress={() => handleButtonPress('.')}>
          <Text style={styles.buttonText}>.</Text>
        </TouchableOpacity>
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
    color:'white'
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
  },
});

export default CalculatorApp;
