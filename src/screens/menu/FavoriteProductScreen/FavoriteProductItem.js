import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

const FavoriteProductItem = ({ item, onPress, isDarkMode, isLoading }) => {
  const { t } = useTranslation();
  const styles = isDarkMode ? darkStyles : lightStyles;

  return (
    <TouchableOpacity onPress={onPress} disabled={isLoading}>
      <View style={styles.productContainer}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productID}>ID: {item.id}</Text>
        <Text style={styles.productPrice}>{t('price')}: ${item.price}</Text>
        <Text style={styles.productPrice}>KDV %{item.kdv}</Text>
        <Image source={{ uri: item.image }} style={styles.productImage} />
      </View>
    </TouchableOpacity>
  );
};

const lightStyles = StyleSheet.create({
  productContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    alignItems: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  productID: {
    marginBottom: 5,
    color: '#000',
  },
  productPrice: {
    marginBottom: 5,
    color: '#000',
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginTop: 5,
  },
});

const darkStyles = StyleSheet.create({
  productContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 20,
    alignItems: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff',
  },
  productID: {
    marginBottom: 5,
    color: '#fff',
  },
  productPrice: {
    marginBottom: 5,
    color: '#fff',
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginTop: 5,
  },
});

export default FavoriteProductItem;
