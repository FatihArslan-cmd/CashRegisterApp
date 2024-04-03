import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Text, Button } from 'react-native';
import getProductPrice from '../MockApi/GetProductPrice';

const App = () => {
  const [productId, setProductId] = useState('');
  const [productData, setProductData] = useState([]);
  const [subTotal, setSubTotal] = useState(0);

  const onProductIdChange = (text) => {
    setProductId(text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.productIdInput}
        placeholder="Enter Product ID"
        onChangeText={onProductIdChange}
      />
      <Button
        title="Get Price"
        onPress={() => getProductPrice(productId, productData, setProductData, subTotal, setSubTotal)}
      />
      <View style={styles.productPricesList}>
        {productData.map((product, index) => (
          <Text key={index} style={styles.productPrice}>
            {product.name}: {product.price} TL
          </Text>
        ))}
      </View>
      <Text style={styles.subTotal}>Sub Total: {subTotal} TL</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  productIdInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  productPricesList: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
  },
  productPrice: {
    fontSize: 16,
    marginBottom: 5,
  },
  subTotal: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default App;
