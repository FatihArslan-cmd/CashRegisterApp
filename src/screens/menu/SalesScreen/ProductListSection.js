import React, { useContext, useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { FlatList, View, Text, TouchableOpacity, Alert } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import LoadingIndicator from '../../../components/LoadingIndicator';
import { ProductContext } from '../../../context/ProductContext';
import { useTranslation } from 'react-i18next';
import QuantityInputModal from './QuantityInputModal'; // Make sure to import your modal component

const ProductListSection = ({ styles, isLoading }) => {
  const { t } = useTranslation();
  const { 
    productData, setProductData, SubTotal, setSubTotal, 
    allTotal, paymentSuccess, setAllTotal, setDisableActions, 
    disableActions, setDiscountApplied, setPaymentSuccess 
  } = useContext(ProductContext);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    setDisableActions(paymentSuccess);
  }, [paymentSuccess]);

  const scrollViewRef = useRef(null);

  const removeProduct = (indexToRemove, price) => {
    if (!disableActions && !paymentSuccess) { 
      const updatedProducts = productData.filter((_, index) => index !== indexToRemove);
      setProductData(updatedProducts);
      setSubTotal(SubTotal - price);
    } else {
      Alert.alert(t('Actions Disabled'), t('You cannot remove/add products after the discount is applied/Payment is done.'));
    }
  };

  const createNewOrder = () => {
    setProductData([]);
    setPaymentSuccess(false);
    setSubTotal(0);
    setDiscountApplied(false);
  };

  useEffect(() => {
    setAllTotal(SubTotal);
  }, [SubTotal]);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [productData, paymentSuccess, isLoading]);

  const addProductToList = (product, quantity = 1) => {
    if (!disableActions && !paymentSuccess) {
      const updatedProducts = [...productData];
      for (let i = 0; i < quantity; i++) {
        updatedProducts.push(product);
      }
      setProductData(updatedProducts);
      setSubTotal(SubTotal + (product.price * quantity));
    } else {
      Alert.alert(t('Actions Disabled'), t('You cannot remove/add products after the discount is applied/Payment is done.'));
    }
  };

  const handleAddMultiple = (product) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
  };

  const renderItem = useCallback(({ item, index }) => (
    <Swipeable
      renderRightActions={() => (
        <TouchableOpacity onPress={() => removeProduct(index, item.price)} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>{t('Delete')}</Text>
        </TouchableOpacity>
      )}
      renderLeftActions={() => (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => handleAddMultiple(item)} style={styles.addMultipleProducts}>
            <Text style={styles.deleteButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      )}
    >
      <View style={styles.productContainer}>
        <View style={styles.productPrice}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.productId}>{item.id}</Text>
            <Text style={styles.productTax}>1 pcs </Text>
            <Text style={styles.productTax}>KDV %{item.kdv} </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.productName}>{item.name}:</Text>
            <Text style={[styles.productPriceValue, { marginLeft: 'auto' }]}> {item.price} $ </Text>
          </View>
        </View>
      </View>
    </Swipeable>
  ), [removeProduct, handleAddMultiple, styles, t]);

  const keyExtractor = useCallback((item, index) => index.toString(), []);

  return (
    <>
      <FlatList
        ref={scrollViewRef}
        style={styles.productPricesList}
        data={productData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        removeClippedSubviews={true}
        ListEmptyComponent={
          !isLoading && (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>{t('No products')} </Text>
              <MaterialCommunityIcons name="lock-question" size={36} color="gray" />
            </View>
          )
        }
        ListFooterComponent={
          isLoading ? (
            <View style={{ marginBottom: 20 }}>
              <LoadingIndicator />
            </View>
          ) : paymentSuccess ? (
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
              <Entypo name="check" size={36} color="#008b38" style={styles.inputIcon} />
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#008b38' }}>{t('payment Successful')}</Text>
              <TouchableOpacity onPress={createNewOrder} style={{ backgroundColor: '#3e66ae', borderRadius: 10, margin: 10 }}>
                <View style={{ flexDirection: 'row', margin: 5 }}>
                  <MaterialCommunityIcons name="autorenew" size={24} color="white" style={{ marginTop: 1 }} />
                  <Text style={{ color: 'white', padding: 5, fontWeight: 'bold' }}>{t('Create new order')}</Text>
                </View>
              </TouchableOpacity>
            </View>
          ) : null
        }
      />
      <View style={styles.separator} />
      <View style={styles.subTotalContainer}>
        <Text style={styles.subTotal}>{t('subtotal')}: {SubTotal} $</Text>
        <View style={styles.separator} />
        <Text style={styles.subTotal}>{t('alltotal')}: {allTotal} $</Text>
      </View>
      {selectedProduct && (
        <QuantityInputModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onAdd={(quantity) => addProductToList(selectedProduct, quantity)}
        />
      )}
    </>
  );
};

export default React.memo(ProductListSection);
