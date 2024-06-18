import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import axios from 'axios';
import { ProductContext } from '../../../context/ProductContext';
import useSound from '../../../hooks/SoundManager'; // SoundManager dosyasını ekliyoruz
import { API_BASE_URL } from '../../../utils/constants';
import ToastMessage from '../FavoriteProductScreen/ToastMessage';

export default function BarcodeScanner() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [showToast, setShowToast] = useState(false); // Toast göstermek için state ekliyoruz
  const [toastMessage, setToastMessage] = useState(''); // Toast mesajı için state ekliyoruz
  const { productData, setProductData, SubTotal, setSubTotal } = useContext(ProductContext);
  const { playSound } = useSound(require('../../../../assets/sound/positive_beeps-85504.mp3'));

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

      // Toast mesajını ayarlama ve gösterme
      setToastMessage(`${product.name} has been added`);
      setShowToast(true);
      
      // Toast mesajını belirli bir süre sonra gizle
      setTimeout(() => {
        setShowToast(false);
      }, 1500); // 1.5 saniye sonra gizlenir
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

      {/* ToastMessage bileşenini ekliyoruz */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end', // Subtotal görünümünü en alta taşır
    alignItems: 'center',
  },
  subTotalContainer: {
    width: '100%',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#f9f9f9',
    alignItems: 'center', // Subtotal metnini ortalar
  },
  subTotalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

