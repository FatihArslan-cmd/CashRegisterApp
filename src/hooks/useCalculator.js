import { useContext } from 'react';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next'; 
import { ProductContext } from '../context/ProductContext';

const useCalculator = () => {
  const { t } = useTranslation(); 
  const { inputValue, setInputValue } = useContext(ProductContext);
  const {
    allTotal,
    setPaymentSuccess,
    setChange,
    setEnteredAmount,
    setPaymentType,
  } = useContext(ProductContext);

  const handleButtonPress = (value) => {
    if (value === 'clear') {
      setInputValue('');
    } else {
      setInputValue((prevValue) => prevValue + value.toString());
    }
  };

  const handleCalculatePayment = (type, oppositeType) => {
    if (inputValue === '') {
      Alert.alert(t('Please Enter a Number'), t('Please enter an amount before calculating.'));
      return;
    }

    if (allTotal === 0) {
      Alert.alert(t('No Items in the List'), t('There are no items in the list.'));
      return;
    }

    const amount = parseFloat(inputValue);
    const changeAmount = amount - allTotal;
    const requiredAmount = allTotal - amount;

    if (amount >= allTotal) {
      const successMessage = changeAmount === 0
        ? t('The order is completed. All the due has been paid.')
        : `${t('Your change is')} $${changeAmount.toFixed(2)}`;
      Alert.alert(t('Success'), successMessage);
      setChange(changeAmount);
      setPaymentSuccess(true);
      setPaymentType(type);
    } else {
      Alert.alert(
        t('Insufficient Balance'),
        `${t('The customer must give')} $${requiredAmount.toFixed(2)}`,
        [
          { text: t('Cancel'), style: 'cancel' },
          {
            text: `${t('Pay the rest by')} ${oppositeType}`,
            onPress: () => {
              Alert.alert(t('payment Successful'), `${t('The remaining balance has been paid by')} ${oppositeType}.`);
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
