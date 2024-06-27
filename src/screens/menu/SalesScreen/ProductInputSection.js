import {React,useContext,useState} from 'react';
import { View, TextInput, TouchableOpacity, Text,Alert } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import CampaignScreen from '../CampaignScreen/CampaignScreen';
import FavoriteProductsScreen from '../FavoriteProductScreen/FavoriteProductsScreen';
import { getProductPrice } from '../../../services/GetProductPrice';
import { ProductContext } from '../../../context/ProductContext';
const ProductInputSection = ({
  isDarkMode,
  styles,
  isLoading,
  paymentSuccess,
  setIsLoading
}) => {
  const navigation = useNavigation();
  const { productData, setProductData, SubTotal, setSubTotal,allTotal,disableActions } = useContext(ProductContext);
  const [productId, setProductId] = useState('');

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

  
  const clearInput = () => {
    setProductId('');

  };
  return (
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
          style={[styles.getPriceButton, isLoading && { backgroundColor: '#ccc' }]}
          onPress={getPrice}
          disabled={isLoading}
        >
          <Text style={styles.enterButton}>Enter</Text>
        </TouchableOpacity>
        <CampaignScreen
          allTotal={allTotal}
          paymentSuccess={paymentSuccess}
        />
        <FavoriteProductsScreen />
        {!paymentSuccess && (
          <TouchableOpacity onPress={() => navigation.navigate('BarcodeScreen')}>
            <AntDesign name="barcode" size={28} color={isDarkMode ? 'white' : 'black'} style={styles.inputIcon} />
          </TouchableOpacity>
        )}
      </View>
    </Animatable.View>
  );
};

export default ProductInputSection;
