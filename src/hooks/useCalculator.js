import { useState, useEffect,useContext } from 'react';
import { Alert } from 'react-native';
import { ProductContext } from '../context/ProductContext';
const useCalculator = () => {
  const { inputValue,setInputValue } = useContext(ProductContext);
  const {allTotal,
    setPaymentSuccess,
    setChange,
    setEnteredAmount,
    setPaymentType } = useContext(ProductContext);

  const handleButtonPress = (value) => {
    if (value === 'clear') {
      setInputValue('');
    } else {
      setInputValue((prevValue) => prevValue + value.toString());
    }
  };

  const handleCalculatePayment = (type, oppositeType) => {
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
    
    if (amount >= allTotal) {
      const successMessage = changeAmount === 0 ? 'The order is completed. All the due has been paid.' : `Your change is $${changeAmount.toFixed(2)}`;
      Alert.alert('Success', successMessage);
      setChange(changeAmount);
      setPaymentSuccess(true);
      setPaymentType(type);
    } else {
      Alert.alert(
        'Insufficient Balance',
        `The customer must give $${requiredAmount.toFixed(2)}`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: `Pay the rest by ${oppositeType}`,
            onPress: () => {
              Alert.alert('Payment Successful', `The remaining balance has been paid by ${oppositeType}.`);
              setEnteredAmount(allTotal);
              setChange(0);
              setPaymentSuccess(true);
              setPaymentType('Cash and Credit');
            },
          },
        ]
      );
    }

    setEnteredAmount(amount);
    setInputValue('');
  };

  const handleCalculate = () => handleCalculatePayment('Cash', 'Card');
  const handleCalculateCredit = () => handleCalculatePayment('Card', 'Cash');

  return {
    inputValue,
    handleButtonPress,
    handleCalculate,
    handleCalculateCredit,
  };
};

export default useCalculator;