import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, TextInput, View, Text, Button, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { getProductPrice } from '../../MockApi/GetProductPrice';
import Entypo from 'react-native-vector-icons/Entypo';
import FaturaButton from '../../functions/EfaturaButton';
import FavoriteProductsScreen from './FavoriteProductsScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CalculatorApp from '../../functions/NumberButtons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';
import { useRoute, useNavigation } from '@react-navigation/native';
import CampaignScreen from './CampaignScreen';
import ConfirmOrder from './ConfirmOrder';

const Application = () => {
  const route = useRoute();
  const { favoriteItem } = route.params || {}; 
  const [productId, setProductId] = useState('');
  const [productData, setProductData] = useState([]);
  const [SubTotal, setSubTotal] = useState(0);
  const [allTotal, setAllTotal] = useState(0); // State for all total
  const scrollViewRef = useRef(null);
  const [exampleValue, setexampleValue] = useState(0);
  const [exampleValueCredit, setexampleValueCredit] = useState(0);
  const [disableActions, setDisableActions] = useState(false); // State to disable actions

  useEffect(() => {
    if (favoriteItem) {
      setSubTotal(SubTotal + favoriteItem.price);
      setProductData([...productData, favoriteItem]);
    }
  }, [favoriteItem]);

  useEffect(() => {
    // Calculate all total whenever SubTotal changes
    setAllTotal(SubTotal);
  }, [SubTotal]);

  const onProductIdChange = (text) => {
    setProductId(text);
  };

  const getPrice = async () => {
    if (!disableActions) {
      await getProductPrice(productId, productData, setProductData, SubTotal, setSubTotal);
    } else {
      // Show alert when actions are disabled
      Alert.alert("Actions Disabled", "You cannot remove/add products after the discount is applied.");
    }
  };

  const onDataReceived = (data) => {
    setAllTotal(data);
    setDisableActions(true);
  };

  const ondiscountApplied = (discountApplied) => {
    console.log(discountApplied);
  };

  const removeProduct = (indexToRemove, price) => {
    if (!disableActions) {
      const updatedProducts = productData.filter((_, index) => index !== indexToRemove);
      setProductData(updatedProducts);
      setSubTotal(SubTotal - price);
    } else {
      // Show alert when actions are disabled
      Alert.alert("Actions Disabled", "You cannot remove products after the discount is applied.");
    }
  };

  const cancelOrder = () => {
    Alert.alert(
      "Are you sure?",
      "Do you really want to cancel the order?",
      [
        {
          text: "yes",
          onPress: () => {
            setProductData([]);
            setSubTotal(0);
            setDisableActions(false);
            discountApplied='false';
          }
        },
        {
          text: "no",
          style: "cancel"
        }
      ]
    );
  };

  useEffect(() => {
    // Scroll to the bottom of the ScrollView whenever productData changes
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [productData]); // Dependency on productData for automatic scrolling

  const clearInput = () => {
    setProductId('');
  };

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInUp" delay={250} useNativeDriver>
        <View style={styles.inputContainer}>
          <AntDesign name="search1" size={24} color="black" />
          <TextInput
            style={{ marginLeft: 10, flex: 1 }}
            placeholder="Enter ID"
            onChangeText={onProductIdChange}
            value={productId}
          />
          <TouchableOpacity style={{marginRight:20}} onPress={clearInput}>
            <AntDesign name="closecircle" size={20} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.getPriceButton} onPress={getPrice}>
            <Text style={styles.enterButton}>Enter </Text>
          </TouchableOpacity>
          <CampaignScreen allTotal={allTotal} onDataReceived={onDataReceived} ondiscountApplied={ondiscountApplied} />
          <FavoriteProductsScreen disableActions={disableActions} />
        </View>
      </Animatable.View>
      <ScrollView ref={scrollViewRef} style={styles.productPricesList}>
        {productData.length === 0 ? (
          <View style={{ alignSelf: 'center' }}>
            <Text style={styles.emptyText}>Empty </Text>
            <MaterialCommunityIcons name={"lock-question"} size={36} color={"gray"} />
          </View>
        ) : (
          productData.map((product, index) => (
            <Swipeable key={index} renderRightActions={() => (
              <TouchableOpacity onPress={() => removeProduct(index, product.price)} style={styles.deleteButton}>
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            )}>
              <View style={styles.productContainer}>
                <View style={styles.productPrice}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.productId}>{product.id}</Text>
                    <Text style={styles.productTax}>1 PCS </Text>
                    <Text style={styles.productTax}>KDV %{product.kdv} </Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.productName}>{product.name}:</Text>
                    <Text style={[styles.productPriceValue, { marginLeft: 'auto' }]}> {product.price} $</Text>
                  </View>
                </View>
              </View>
            </Swipeable>
          ))
        )}
      </ScrollView>
      <View style={styles.separator} />
      <View style={styles.subTotalContainer}>
        <Text style={styles.subTotal}>Sub Total: {SubTotal} $</Text>
        <View style={styles.separator} />
        <Text style={styles.subTotal}>All Total: {allTotal} $</Text>
      </View>
      <Animatable.View animation="fadeInUp" delay={250} useNativeDriver>
        <View style={{ flexDirection: 'row', marginTop: 'auto' }}>
          <CalculatorApp allTotal={allTotal} exampleValue={exampleValue} exampleValueCredit={exampleValueCredit} />
          <View style={{ flexDirection: 'column', borderWidth: 1, borderColor: '#ccc', borderRadius: 15, marginLeft: 5 }}>
            <FaturaButton />
            <TouchableOpacity onPress={cancelOrder} style={styles.cancelButton}>
              <View style={{ flexDirection: 'row' }}>
                <Entypo name={"cross"} size={36} color={"white"} style={styles.inputIcon} />
                <Text style={styles.cancelButtonText}>Cancel Order</Text>
              </View>
            </TouchableOpacity>
            <ConfirmOrder subTotal={SubTotal}/>
            <TouchableOpacity onPress={() => setexampleValue(exampleValue + 1)} style={styles.cashButton}>
              <View style={{ flexDirection: 'row' }}>
                <MaterialCommunityIcons name={"cash"} size={24} color={"white"} style={styles.inputIcon} />
                <Text style={styles.cancelButtonText}>Cash</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setexampleValueCredit(exampleValueCredit + 1)} style={styles.creditButton}>
              <View style={{ flexDirection: 'row' }}>
                <AntDesign name={"creditcard"} size={24} color={"white"} style={styles.inputIcon} />
                <Text style={styles.cancelButtonText}>Credit</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Animatable.View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#d9e0e8',
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center'
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
  },
  getPriceButton: {
    backgroundColor: '#028a3b',
    borderRadius: 10,
    marginLeft: 0,
    marginRight: 1
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
  productTax:
  {
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
    backgroundColor: 'white'
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
    textAlign: 'center'
  },
  deleteButton: {
    backgroundColor: 'red',
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
    height: 60
  },
  confirmButton: {
    backgroundColor: '#3e66ae',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    padding: 10,
    borderRadius: 15,
    width: 85,
    height: 70
  },
  cashButton: {
    backgroundColor: '#008b38',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    padding: 10,
    borderRadius: 15,
    width: 90,
    height: 70
  },
  creditButton: {
    backgroundColor: '#008b38',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    padding: 10,
    borderRadius: 15,
    width: 90,
    height: 70
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
    marginBottom: 20
  },
});

export default Application;
