import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage from the correct package

const CalculatorApp = ({ receiveReceivedAndChange, allTotal, exampleValue, exampleValueCredit, paymentSuccessReceive, counter }) => {
  const [inputValue, setInputValue] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [change, setChange] = useState(0); // State to store the change
  const [enteredAmount, setEnteredAmount] = useState(0); // State to store the entered amount
  const [paymentType, setPaymentType] = useState('');

  useEffect(() => {
    if (exampleValue > 0) {
      handleCalculate();
    }
    return () => {};
  }, [exampleValue]);

  useEffect(() => {
    if (counter > 0) {
      setPaymentSuccess(false);
      console.log(paymentSuccess);
    }
    return () => {};
  }, [counter]);

  useEffect(() => {
    if (exampleValueCredit > 0) {
      handleCalculateCredit();
    }
    return () => {};
  }, [exampleValueCredit]);

  useEffect(() => {
    paymentSuccessReceive(paymentSuccess);
  }, [paymentSuccess, paymentSuccessReceive]);

  const handleButtonPress = (value) => {
    if (value === 'sil') {
      setInputValue('');
    } else if (value === '=') {
      handleCalculate();
    } else {
      setInputValue((prevValue) => prevValue + value.toString());
    }
  };

  const handleCalculatePayment = (paymentType, oppositePaymentType) => {
    if (inputValue === '') {
      Alert.alert('Please Enter a Number', 'Please enter an amount before calculating.');
      return;
    }

    if (allTotal === 0) {
      Alert.alert('No Items in the List', 'There are no items in the list.');
      return;
    }

    const amount = parseFloat(inputValue);
    const changeAmount = amount - allTotal;
    const requiredAmount = allTotal - amount;

    if (amount > allTotal) {
      Alert.alert('Success:', `Your change is $${changeAmount.toFixed(2)}`);
      setChange(changeAmount); // Update the state with change
      setInputValue('');
      setPaymentSuccess(true);
      setPaymentType(paymentType); 
    } else if (changeAmount === 0) {
      Alert.alert('The order is completed', 'All the due has been paid');
      setPaymentSuccess(true);
      setPaymentType(paymentType);
    } else {
      Alert.alert(
        'Insufficient Balance',
        `The customer must give $${requiredAmount.toFixed(2)} more.`,
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Payment canceled'),
            style: 'cancel',
          },
          {
            text: `Pay the rest by ${oppositePaymentType}`,
            onPress: () => {
              const paymentMethod = 'Cash' ? 'credit' : 'cash';
              Alert.alert('Payment Successful', `The remaining balance has been paid by ${paymentMethod}.`);
              setEnteredAmount(allTotal);
              setChange(0)
              setPaymentSuccess(true);
              setPaymentType('Cash and Credit'); // Set payment type as 'Both'
            },
          },
        ]
      );
    }

    setEnteredAmount(amount); 
  };

  const handleCalculate = () => {
    handleCalculatePayment('Cash', 'credit');
  };

  const handleCalculateCredit = () => {
    handleCalculatePayment('Card', 'cash');
  };

  useEffect(() => {
    if (paymentSuccess) {
      receiveReceivedAndChange(change, enteredAmount, paymentType);
    }
  }, [paymentSuccess]);
  

  const renderButtons = (numbers) => {
    return numbers.map((number) => (
      <TouchableOpacity key={number} style={styles.button} onPress={() => handleButtonPress(number)}>
        <Text style={styles.buttonText}>{number}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={inputValue}
        keyboardType="numeric"
        editable={false}
        placeholder="Enter Amount of Money"
      />

      <View style={styles.row}>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('00')}>
          <Text style={styles.buttonText}>00</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('000')}>
          <Text style={styles.buttonText}>000</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('sil')}>
          <FontAwesome name={'remove'} size={24} color={'white'} style={styles.inputIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.row}>{renderButtons([7, 8, 9])}</View>
      <View style={styles.row}>{renderButtons([4, 5, 6])}</View>
      <View style={styles.row}>{renderButtons([1, 2, 3])}</View>

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
    backgroundColor: '#1e445e',
    borderRadius: 10,
    marginHorizontal: 5,
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: 180,
    height: 50,
    padding: 10,
    margin: 20,
    color: 'black',
    borderRadius: 15,
    backgroundColor: 'white',
  },
  paymentSuccessMessage: {
    marginTop: 10,
    color: 'green',
    fontWeight: 'bold',
  },
});

export default CalculatorApp;
