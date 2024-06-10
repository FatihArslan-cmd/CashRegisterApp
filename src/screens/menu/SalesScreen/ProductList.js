import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';

const ProductList = ({
  productData,
  isLoading,
  removeProduct,
  addProductToList,
  disableActions,
  paymentSuccess,
  scrollViewRef,
  styles
}) => {
  return (
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
  );
};

export default ProductList;