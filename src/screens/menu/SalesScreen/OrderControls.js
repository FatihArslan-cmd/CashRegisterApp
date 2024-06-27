import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CalculatorApp from '../../../components/NumberButtons';
import FaturaButton from '../../../components/EfaturaButton';
import ConfirmOrder from '../ConfirmOrder/ConfirmOrder';
import * as Animatable from 'react-native-animatable';
import { useTranslation } from 'react-i18next';
import { ProductContext } from '../../../context/ProductContext';
import useCalculator from '../../../hooks/useCalculator';

const OrderControls = ({ styles }) => {
  const { t } = useTranslation();
  const { paymentSuccess, setProductData, setSubTotal, allTotal, setDisableActions, setDiscountApplied } = useContext(ProductContext);
  const { handleCalculate, handleCalculateCredit } = useCalculator();  // use the correct function names

  //when  chosen cash/card it will be proceed accordingly
  const handleCashButtonClick = () => {
    handleCalculate(); // now correctly calling the function for Cash payment
  };

  const handleCreditButtonClick = () => {
    handleCalculateCredit(); // now correctly calling the function for Credit payment
  };

  const cancelOrder = () => {
    if (paymentSuccess) {
      Alert.alert(
        t('Cannot Cancel Order'),
        t('The order has been successfully completed.You cannot cancel it.Create new order to continue'),
        [{ text: "OK"}]
      );
    } else if (allTotal > 0) { 
      Alert.alert( 
        t('Are you sure?'),
        t('Do you really want to cancel the order?'),
        [
          {
            text: t('Yes'),
            onPress: () => {
              setProductData([]);
              setSubTotal(0);
              setDisableActions(false);
              setDiscountApplied(false);
            }
          },
          { text: t('No'), style: "cancel" }
        ]
      );
    } else {
      Alert.alert(
        t('No products'),
        t('There are no products in the list. Please add products before confirming the order.'),
        [{ text: "OK"}]
      );
    }
  };

  return (
    <Animatable.View animation="fadeInUp" delay={250} useNativeDriver>
      <View style={{ flexDirection: 'row', marginTop: 'auto' }}>
        <CalculatorApp allTotal={allTotal} />
        <View style={{ flexDirection: 'column', borderWidth: 1, borderColor: '#ccc', borderRadius: 15, marginLeft: 5 }}>
          <FaturaButton />
          <TouchableOpacity onPress={cancelOrder} style={styles.cancelButton}>
            <View style={{ flexDirection: 'row' }}>
              <Entypo name="cross" size={36} color="white" style={styles.inputIcon} />
              <Text style={styles.cancelButtonText}>{t('cancelorder')}</Text>
            </View>
          </TouchableOpacity>
          <ConfirmOrder />
          <TouchableOpacity onPress={handleCashButtonClick} style={styles.cashButton}>
            <View style={{ flexDirection: 'row' }}>
              <MaterialCommunityIcons name="cash" size={24} color="white" style={styles.inputIcon} />
              <Text style={styles.cancelButtonText}>{t('cash')}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCreditButtonClick} style={styles.creditButton}>
            <View style={{ flexDirection: 'row' }}>
              <AntDesign name="creditcard" size={24} color="white" style={styles.inputIcon} />
              <Text style={styles.cancelButtonText}>{t('credit')}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Animatable.View>
  );
};

export default OrderControls;
