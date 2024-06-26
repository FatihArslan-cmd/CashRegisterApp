import React, { useState, useEffect,useContext } from 'react';
import { useRoute } from '@react-navigation/native';
import { View } from 'react-native';
import { ProductContext } from '../../../context/ProductContext';
import { ThemeContext } from '../../../context/ThemeContext';
import ProductInputSection from './ProductInputSection';
import ProductListSection from './ProductListSection';
import OrderControls from './OrderControls';
import { lightStyles, darkStyles } from './styles';

const Application = () => {

  //we use route to get the product chosen in favorite product screen
  const route = useRoute();
  const { favoriteItem } = route.params || {}; 

  const { productData,
          setProductData,
          SubTotal,
          setSubTotal,
          paymentSuccess } = useContext(ProductContext);
          //get needed values from context

  const [isLoading, setIsLoading] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);
  const styles = isDarkMode ? darkStyles : lightStyles; 
  
  //Product gotten using route here is being proceeded
  useEffect(() => {
    if (favoriteItem) {
      setSubTotal(SubTotal + favoriteItem.price);
      setProductData([...productData, favoriteItem]);
    }
  }, [favoriteItem]);

  return (
    <View style={styles.container}>
       <ProductInputSection
        isDarkMode={isDarkMode}
        styles={styles}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        paymentSuccess={paymentSuccess}
      />
       <ProductListSection
        styles={styles}
        productData={productData}
        isLoading={isLoading}
      />
      <OrderControls
        styles={styles}
      />
    </View>
  );
};


export default Application;