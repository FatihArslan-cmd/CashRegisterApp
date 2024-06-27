import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import axios from 'axios';
import { ProductContext } from '../../../context/ProductContext';
import useSound from '../../../hooks/SoundManager'; // SoundManager dosyasını ekliyoruz
import { API_BASE_URL } from '../../../utils/constants';
import ToastMessage from '../FavoriteProductScreen/ToastMessage';

//Unlike the favorite screen, in order to pass the products without using a route, they were transferred with the CONTEXT API instead.

export default function BarcodeScanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [showToast, setShowToast] = useState(false); 
  const [toastMessage, setToastMessage] = useState(''); 
  const { productData, setProductData, SubTotal, setSubTotal } = useContext(ProductContext);
  const { playSound } = useSound(require('../../../../assets/sound/positive_beeps-85504.mp3'));

//Checks if there is permission or not

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

//when barcode scanned it scans its ID in my mock Api

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);

    await getProductPrice(data);

    setTimeout(() => {
      setScanned(false);
    }, 1000);
  };

  const getProductPrice = async (productId) => {
    try {
      const response = await axios.get(API_BASE_URL);
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

      setToastMessage(`${product.name} has been added `) ;
      setShowToast(true);
      
      setTimeout(() => {
        setShowToast(false);
      }, 1500); 
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
      <View style={{justifyContent:'center', alignItems:'center'}}>
       {showToast && (
        <ToastMessage
          message={toastMessage}
          isDarkMode={false} // Tema durumunu burada belirleyebilirsiniz
        />
      )}
      </View>
      <View style={styles.subTotalContainer}>
        <Text style={styles.subTotalText}>Subtotal: ${SubTotal.toFixed(2)}</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end', 
    alignItems: 'center',
  },
  subTotalContainer: {
    width: '100%',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#f9f9f9',
    alignItems: 'center', 
  },
  subTotalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

