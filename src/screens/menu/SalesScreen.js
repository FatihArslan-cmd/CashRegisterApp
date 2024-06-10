import React, { useState, useRef, useEffect,useContext } from 'react';
import { StyleSheet, TextInput, View, Text, Button, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { getProductPrice } from '../../services/GetProductPrice';
import Entypo from 'react-native-vector-icons/Entypo';
import FaturaButton from '../../components/EfaturaButton';
import FavoriteProductsScreen from './FavoriteProductsScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CalculatorApp from '../../components/NumberButtons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';
import { useRoute,useNavigation } from '@react-navigation/native';
import CampaignScreen from './CampaignScreen/CampaignScreen';
import ConfirmOrder from './ConfirmOrder/ConfirmOrder';
import LoadingIndicator from '../../components/LoadingIndicator';
import { useTranslation } from 'react-i18next';
import { ProductContext } from '../../context/ProductContext';
import { ThemeContext } from '../../context/ThemeContext';
const Application = () => {
  const route = useRoute();
  const { favoriteItem } = route.params || {}; 
  const [productId, setProductId] = useState('');
  const { productData, setProductData, SubTotal, setSubTotal } = useContext(ProductContext);
  const [allTotal, setAllTotal] = useState(0); // State for all total
  const scrollViewRef = useRef(null);
  const [exampleValue, setexampleValue] = useState(0);
  const [exampleValueCredit, setexampleValueCredit] = useState(0);
  const [disableActions, setDisableActions] = useState(false); // State to disable actions
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [getValueFromConfirm, setGetValueFromConfirm] = useState(0);
  const [counter, setCounter] = useState(0);
  const [campaignCounter, setcampaignCounter] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [receivedAmount, setReceivedAmount] = useState(false);
  const [change, setChange] = useState(false);
  const [paymentType, setPaymentType] = useState('');
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { isDarkMode } = useContext(ThemeContext); // Get the current theme mode

  const styles = isDarkMode ? darkStyles : lightStyles; // Determine styles based on theme
  
  const getValueFromConfirmOrder = (data) => {
    setGetValueFromConfirm(getValueFromConfirm+data)
  };
  const createNewOrder = () => {
    setProductData([]);
    setCounter(counter+1);
    setSubTotal(0);
    setcampaignCounter(campaignCounter+1)
  };


  useEffect(() => {
    if (favoriteItem) {
      setSubTotal(SubTotal + favoriteItem.price);
      setProductData([...productData, favoriteItem]);
    }
  }, [favoriteItem]);


  const paymentSuccessReceive = (data) => {
    setPaymentSuccess(data);
  };


  useEffect(() => {
    setAllTotal(SubTotal);
  }, [SubTotal]);

  
  const onProductIdChange = (text) => {
    setProductId(text);
  };


 const getPrice = async () => {
  if (!disableActions && !paymentSuccess) { 
    try {
      setIsLoading(true);
      await getProductPrice(productId, productData, setProductData, SubTotal, setSubTotal);
    }
    catch (error) {
      console.error('Error fetching data: ', error);
    } finally {
      setIsLoading(false);
    }
  } else {
    Alert.alert(t('Actions Disabled'), t('You cannot add products after the payment is done /Any campaign is applied.'));
  }
};


  const onDataReceived = (data) => {
    setAllTotal(data);
    setDisableActions(true);
  };

  useEffect(() => {
    if (getValueFromConfirm > 0) {
      setPaymentSuccess(false);
      setDisableActions(false);
      
    }
    return () => {};
  }, [getValueFromConfirm]);


  const ondiscountApplied = (discountApplied) => {
    console.log(discountApplied);
  };


  const removeProduct = (indexToRemove, price) => {
    if (!disableActions && !paymentSuccess) { 
      const updatedProducts = productData.filter((_, index) => index !== indexToRemove);
      setProductData(updatedProducts);
      setSubTotal(SubTotal - price);
    } else {
      
      Alert.alert(t('Actions Disabled'), t('You cannot remove products after the payment is done /Any campaign is applied.'));
    }
  };


  const cancelOrder = () => {
    if (paymentSuccess) {
      Alert.alert(
        t('Cannot Cancel Order'),
        t('The order has been successfully completed. You cannot cancel it. Create a new order to continue.'),
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
              setcampaignCounter(campaignCounter+1);
            }
          },
          { text: t('No'), style: "cancel" }
        ]
      );
    } else {
      // Display a message indicating that the order cannot be canceled because the total amount is zero
      Alert.alert(
        t('No products'),
        t('There are no products in the list. Please add products before confirming the order.'),
        [{ text: "OK"}]
      );
    }
  };
  


  useEffect(() => {
    setDisableActions(paymentSuccess);
  }, [paymentSuccess]);
  
  const receiveReceivedAndChange = (change,receivedAmount,paymentType) => {
    setChange(change);
    setReceivedAmount(receivedAmount);
    setPaymentType(paymentType);
    console.log(paymentType);
  };

  useEffect(() => {
    // Scroll to the bottom of the ScrollView whenever productData or paymentSuccess changes
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [productData, paymentSuccess,isLoading]);
   // Dependency on productData for automatic scrolling

  
  const addProductToList = (product) => {
    if (!disableActions && !paymentSuccess) { 
    setProductData([...productData, product]); 
    setSubTotal(SubTotal + product.price);
  } else {
      
    Alert.alert(t('Actions Disabled'), t('You cannot remove products after the payment is done /Any campaign is applied.'));
  }
  };
  
 
  
  
  const clearInput = () => {
    setProductId('');

  };
 

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInUp" delay={250} useNativeDriver>
        <View style={styles.inputContainer}>
          <AntDesign name="search1" size={24} color={isDarkMode ? 'white' : 'black'} />
          <TextInput
            style={[styles.productIdInput, { color: isDarkMode ? 'white' : 'black' }]}
            placeholder="Enter ID"
            placeholderTextColor={isDarkMode ? '#aaa' : '#555'}
            onChangeText={onProductIdChange}
            value={productId}
          />
          <TouchableOpacity style={{ marginRight: 20 }} onPress={clearInput}>
            <AntDesign name="closecircle" size={20} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.getPriceButton, isLoading && { backgroundColor: '#ccc' }]} // Disable button style when loading
            onPress={getPrice}
            disabled={isLoading}
          >
            <Text style={styles.enterButton}>Enter</Text>
          </TouchableOpacity>
          <CampaignScreen
            allTotal={allTotal}
            onDataReceived={onDataReceived}
            ondiscountApplied={ondiscountApplied}
            paymentSuccess={paymentSuccess}
            campaignCounter={campaignCounter}
          />
          <FavoriteProductsScreen disableActions={disableActions} />
          {!paymentSuccess && (
            <TouchableOpacity onPress={() => navigation.navigate('BarcodeScreen')}>
              <AntDesign name="barcode" size={28} color={isDarkMode ? 'white' : 'black'} style={styles.inputIcon} />
            </TouchableOpacity>
          )}
        </View>
      </Animatable.View>
      <ScrollView ref={scrollViewRef} style={styles.productPricesList}>
        {productData.length === 0 && !isLoading && (
          <View style={{ alignSelf: 'center' }}>
            <Text style={styles.emptyText}>No Products Found</Text>
            <MaterialCommunityIcons style={{marginLeft:45}} name="lock-question" size={36} color="gray" />
          </View>
        )}
        {productData.map((product, index) => (
          <Swipeable
            key={index}
            renderRightActions={() => (
              <TouchableOpacity onPress={() => removeProduct(index, product.price)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            )}
            renderLeftActions={() => (
              <TouchableOpacity onPress={() => addProductToList(product)} style={styles.addMultipleProducts}>
                <Text style={styles.deleteButtonText}>+</Text>
              </TouchableOpacity>
            )}
          >
            <View style={styles.productContainer}>
              <View style={styles.productPrice}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.productId}>{product.id}</Text>
                  <Text style={styles.productTax}>1 pcs </Text>
                  <Text style={styles.productTax}>KDV %{product.kdv} </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.productName}>{product.name}:</Text>
                  <Text style={[styles.productPriceValue, { marginLeft: 'auto' }]}> {product.price} $</Text>
                </View>
              </View>
            </View>
          </Swipeable>
        ))}
        {isLoading && (
          <View style={{ marginBottom: 20 }}>
            <LoadingIndicator />
          </View>
        )}
        {paymentSuccess && (
          <View style={{ alignItems: 'center', marginBottom: 20 }}>
            <Entypo name="check" size={36} color="#008b38" style={styles.inputIcon} />
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#008b38' }}>Payment Successful</Text>
            <TouchableOpacity onPress={createNewOrder} style={{ backgroundColor: '#3e66ae', borderRadius: 10, margin: 10 }}>
              <View style={{ flexDirection: 'row', margin: 5 }}>
                <MaterialCommunityIcons name="autorenew" size={24} color="white" style={{ marginTop: 1 }} />
                <Text style={{ color: 'white', padding: 5, fontWeight: 'bold' }}>Create new order</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <View style={styles.separator} />
      <View style={styles.subTotalContainer}>
        <Text style={styles.subTotal}>Subtotal: {SubTotal} $</Text>
        <View style={styles.separator} />
        <Text style={styles.subTotal}>Total: {allTotal} $</Text>
      </View>
      <Animatable.View animation="fadeInUp" delay={250} useNativeDriver>
        <View style={{ flexDirection: 'row', marginTop: 'auto' }}>
          <CalculatorApp
            allTotal={allTotal}
            exampleValue={exampleValue}
            exampleValueCredit={exampleValueCredit}
            paymentSuccessReceive={paymentSuccessReceive}
            counter={counter}
            receiveReceivedAndChange={receiveReceivedAndChange}
          />
          <View style={{ flexDirection: 'column', borderWidth: 1, borderColor: '#ccc', borderRadius: 15, marginLeft: 5 }}>
            <FaturaButton />
            <TouchableOpacity onPress={cancelOrder} style={styles.cancelButton}>
              <View style={{ flexDirection: 'row' }}>
                <Entypo name="cross" size={36} color="white" style={styles.inputIcon} />
                <Text style={styles.cancelButtonText}>Cancel Order</Text>
              </View>
            </TouchableOpacity>
            <ConfirmOrder
              subTotal={SubTotal}
              allTotal={allTotal}
              paymentSuccess={paymentSuccess}
              getValueFromConfirmOrder={getValueFromConfirmOrder}
              change={change}
              receivedAmount={receivedAmount}
              productData={productData}
              paymentType={paymentType}
            />
            <TouchableOpacity
              onPress={() => {
                setDisableActions();
                if (paymentSuccess) {
                  Alert.alert('The order is completed', 'The order is already successfully completed');
                } else {
                  setexampleValue(exampleValue + 1);
                }
              }}
              style={styles.cashButton}
            >
              <View style={{ flexDirection: 'row' }}>
                <MaterialCommunityIcons name="cash" size={24} color="white" style={styles.inputIcon} />
                <Text style={styles.cancelButtonText}>Cash</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (paymentSuccess) {
                  Alert.alert('The order is completed', 'The order is already successfully completed');
                } else {
                  setexampleValueCredit(exampleValueCredit + 1);
                }
              }}
              style={styles.creditButton}
            >
              <View style={{ flexDirection: 'row' }}>
                <AntDesign name="creditcard" size={24} color="white" style={styles.inputIcon} />
                <Text style={styles.cancelButtonText}>Credit</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Animatable.View>
    </View>
  );
};

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#d9e0e8',
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
  },
  getPriceButton: {
    backgroundColor: '#028a3b',
    borderRadius: 10,
    marginLeft: 0,
    marginRight: 1,
  },
  CampaignsButton: {
    backgroundColor: '#3e66ae',
    borderRadius: 10,
  },
  enterButton: {
    padding: 15,
    color: 'white',
    fontWeight: 'bold',
  },
  subTotalContainer: {
    backgroundColor: '#1e445e',
    borderRadius: 10,
    margin: 5,
  },
  productTax: {
    color: 'gray',
    fontSize: 13,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
  },
  productIdInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
    flex: 1,
    backgroundColor: 'white',
  },
  productContainer: {
    padding: 9,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    marginBottom: 8,
    backgroundColor: 'white',
  },
  productPricesList: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    maxHeight: 260,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  productPrice: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  productId: {
    color: 'gray',
  },
  productName: {
    color: '#1e445e',
    fontWeight: 'bold',
  },
  productPriceValue: {
    color: '#E00012',
  },
  subTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 7,
    color: 'white',
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    borderRadius: 15,
  },
  addMultipleProducts: {
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    borderRadius: 15,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#CA0B00',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    padding: 10,
    borderRadius: 15,
    width: 90,
    height: 60,
  },
  confirmButton: {
    backgroundColor: '#3e66ae',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    padding: 10,
    borderRadius: 15,
    width: 85,
    height: 70,
  },
  cashButton: {
    backgroundColor: '#008b38',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    padding: 10,
    borderRadius: 15,
    width: 90,
    height: 70,
  },
  creditButton: {
    backgroundColor: '#008b38',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    padding: 10,
    borderRadius: 15,
    width: 90,
    height: 70,
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
    borderWidth: 1,
    borderColor: '#333',
    justifyContent: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#121212',
  },
  getPriceButton: {
    backgroundColor: '#1e88e5',
    borderRadius: 10,
    marginLeft: 0,
    marginRight: 1,
  },
  CampaignsButton: {
    backgroundColor: '#1e88e5',
    borderRadius: 10,
  },
  enterButton: {
    padding: 15,
    color: 'white',
    fontWeight: 'bold',
  },
  subTotalContainer: {
    backgroundColor: '#333',
    borderRadius: 10,
    margin: 5,
  },
  productTax: {
    color: 'gray',
    fontSize: 13,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 15,
  },
  productIdInput: {
    borderColor: '#333',
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
    flex: 1,
    backgroundColor: '#222',
  },
  productContainer: {
    padding: 9,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 15,
    marginBottom: 8,
    backgroundColor: '#222',
  },
  productPricesList: {
    borderColor: '#333',
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    maxHeight: 260,
    backgroundColor: '#222',
    borderRadius: 15,
  },
  productPrice: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
    color: 'white',
  },
  productId: {
    color: 'gray',
  },
  productName: {
    color: '#bb86fc',
    fontWeight: 'bold',
  },
  productPriceValue: {
    color: '#cf6679',
  },
  subTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 7,
    color: 'white',
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    borderRadius: 15,
  },
  addMultipleProducts: {
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    borderRadius: 15,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#CA0B00',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    padding: 10,
    borderRadius: 15,
    width: 90,
    height: 60,
  },
  confirmButton: {
    backgroundColor: '#1e88e5',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    padding: 10,
    borderRadius: 15,
    width: 85,
    height: 70,
  },
  cashButton: {
    backgroundColor: '#008b38',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    padding: 10,
    borderRadius: 15,
    width: 90,
    height: 70,
  },
  creditButton: {
    backgroundColor: '#008b38',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    padding: 10,
    borderRadius: 15,
    width: 90,
    height: 70,
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
});

export default Application;