import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, FlatList, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import axios from 'axios';
import { ProductContext } from '../../context/ProductContext';
import useSound from '../../components/SoundManager';// SoundManager dosyasını ekliyoruz

export default function BarcodeScanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const { productData, setProductData, SubTotal, setSubTotal } = useContext(ProductContext);
  const { playSound } = useSound(require('../../../assets/sound/positive_beeps-85504.mp3'));

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);

    await getProductPrice(data);

    setTimeout(() => {
      setScanned(false);
    }, 1500);
  };

  const getProductPrice = async (productId) => {
    try {
      const response = await axios.get('https://fatiharslan-cmd.github.io/mockjson/db.json');
      const data = response.data;

      if (!data.products || !Array.isArray(data.products)) {
        console.error('Product data is not in the expected format');
        throw new Error('Invalid product data format');
      }

      const product = data.products.find(item => item.id === productId);
      if (!product) {
        throw new Error(`Product with ID ${productId} not found`);
      }
      await playSound();
      const newProductData = [...productData, product];
      setProductData(newProductData);

      const newSubTotal = SubTotal + product.price;
      setSubTotal(newSubTotal);
    } catch (error) {
      console.error('Error:', error);
      Alert.alert(error.message || 'An error occurred while fetching product data');
    }
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <FlatList
        data={productData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Text>{item.name}</Text>
            <Text>${item.price.toFixed(2)}</Text>
          </View>
        )}
      />
      <View style={styles.subTotalContainer}>
        <Text style={styles.subTotalText}>Subtotal: ${SubTotal.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  subTotalContainer: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  subTotalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});
