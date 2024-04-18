import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CalculatorApp = () => {
  const [inputValue, setInputValue] = useState('');

  const handleButtonPress = (value) => {
    if (value === 'sil') {
      setInputValue('');
    } else {
      setInputValue((prevValue) => prevValue + value.toString());
    }
  };

  return (
    <View style={styles.container}>
  <TextInput
    style={styles.input}
    value={inputValue}
    keyboardType="numeric"
    editable={false}
    placeholder='Enter Amount of Money'
  />
  <View style={styles.row}>
    <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('00')}>
      <Text style={styles.buttonText}>00</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('000')}>
      <Text style={styles.buttonText}>000</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('sil')}>
    <FontAwesome name={"remove"} size={24} color={"white"} style={styles.inputIcon} />
    </TouchableOpacity>
  </View>
  <View style={styles.row}>
    {[7, 8, 9].map((number) => (
      <TouchableOpacity key={number} style={styles.button} onPress={() => handleButtonPress(number)}>
        <Text style={styles.buttonText}>{number}</Text>
      </TouchableOpacity>
    ))}
   
  </View>
  <View style={styles.row}>
    {[4, 5, 6].map((number) => (
      <TouchableOpacity key={number} style={styles.button} onPress={() => handleButtonPress(number)}>
        <Text style={styles.buttonText}>{number}</Text>
      </TouchableOpacity>
    ))}
  </View>
  <View style={styles.row}>
    {[1, 2, 3].map((number) => (
      <TouchableOpacity key={number} style={styles.button} onPress={() => handleButtonPress(number)}>
        <Text style={styles.buttonText}>{number}</Text>
      </TouchableOpacity>
    ))}
  </View>
  <View style={styles.row}>
    <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('0')}>
      <Text style={styles.buttonText}>0</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('.')}>
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
    borderColor: '#ccc',
    width:275,
    borderRadius:15
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e445e',
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
    borderColor: '#ccc',
    width: 180,
    height:50,
    padding: 10,
    margin: 20,
    color:'black',
    borderRadius:15,
    backgroundColor:'white'
  },
});

export default CalculatorApp;
