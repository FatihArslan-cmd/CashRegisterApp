import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, TextInput, View, Text, Button, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { getProductPrice } from '../../MockApi/GetProductPrice';
import Entypo from 'react-native-vector-icons/Entypo';
import FaturaButton from '../../functions/EfaturaButton';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Application = () => {
  const [productId, setProductId] = useState('');
  const [productData, setProductData] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const scrollViewRef = useRef(null);

  const onProductIdChange = (text) => {
    setProductId(text);
  };

  const getPrice = async () => {
    await getProductPrice(productId, productData, setProductData, subTotal, setSubTotal);
  };

  const removeProduct = (indexToRemove, price) => {
    const updatedProducts = productData.filter((_, index) => index !== indexToRemove);
    setProductData(updatedProducts);
    setSubTotal(subTotal - price); 
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

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.productIdInput, { flex: 1 }]}
          placeholder="Enter Product ID"
          onChangeText={onProductIdChange}
        />
        <TouchableOpacity style={styles.getPriceButton} onPress={getPrice} >
          <Text style={styles.enterButton}>Enter</Text>
        </TouchableOpacity>
      </View>

      <ScrollView ref={scrollViewRef} style={styles.productPricesList}>
        {productData.length === 0 ? (
          
          <View style={{alignSelf:'center'}}>
            <Text style={styles.emptyText}>Empty</Text>
            <MaterialCommunityIcons name={"lock-question"} size={36} color={"gray"}/>
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
                    <Text style={styles.productTax}>1 PCS</Text>
                    <Text style={styles.productTax}>KDV %{product.kdv}</Text>
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
        <Text style={styles.subTotal}>Sub Total: {subTotal} $</Text>
        <View style={styles.separator} />
        
        <Text style={styles.subTotal}>All Total: {subTotal} $</Text>
      </View>
      
      <TouchableOpacity onPress={cancelOrder} style={styles.cancelButton}>
        <View style={{flexDirection:'row'}}>
          <Entypo name={"cross"} size={36} color={"white"} style={styles.inputIcon} />
          <Text style={styles.cancelButtonText}>Cancel Order</Text>
        </View>
      </TouchableOpacity>
      
      <FaturaButton/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
  },
  getPriceButton:{
    backgroundColor:'green',
    borderRadius:10
  },
  enterButton:{
    padding:10,
    color:'white',
    fontWeight:'bold'
  },
  subTotalContainer: {
    backgroundColor: '#1e445e',
    borderRadius: 10,
    margin: 5,
  },
  productTax:
  {
    color:'gray',
    fontSize:13,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productIdInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
    flex: 1,
  },
  productContainer: {
    padding: 9,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    marginBottom: 8,
  },
  productPricesList: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    maxHeight: 200,
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
    textAlign:'center'
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
    width: 85,
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
    marginBottom:20
  },
});

export default Application;
