import React, { memo, useContext } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import * as Animatable from 'react-native-animatable';
import { ThemeContext } from '../../../context/ThemeContext'; 
import { useTranslation } from 'react-i18next';

const ProductItem = ({ item, isFavorite, toggleFavorite }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const { t } = useTranslation();

  return (
    <Animatable.View animation="fadeInUp" delay={500} useNativeDriver>
      <View style={isDarkMode ? darkStyles.productContainer : lightStyles.productContainer}>
        <Text style={isDarkMode ? darkStyles.productName : lightStyles.productName}>{item.name} </Text>
        <Text style={isDarkMode ? darkStyles.productPrice : lightStyles.productPrice}>{t('price')}: ${item.price} </Text>
        <Text style={isDarkMode ? darkStyles.productid : lightStyles.productid}>ID: {item.id} </Text>
        <Image source={{ uri: item.image }} style={{ width: 100, height: 100, borderRadius: 15, marginTop: 5, marginBottom: 5 }} />
        <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name={isFavorite ? 'heart' : 'heart-o'} size={24} color={isFavorite ? 'orange' : 'green'} />
            <Text style={[isDarkMode ? darkStyles.favoriteButton : lightStyles.favoriteButton, isFavorite && (isDarkMode ? darkStyles.favoriteButtonText : lightStyles.favoriteButtonText)]}>
              {isFavorite ? t('Favorited') : t('Add to Favorites')}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </Animatable.View>
  );
};

export default memo(ProductItem);

const commonStyles = {
  productContainer: {
    marginBottom: 20,
    marginRight: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    marginTop: 5,
  },
  productid: {
    fontSize: 16,
    marginTop: 5,
  },
  favoriteButton: {
    marginTop: 5,
    marginLeft: 5,
    fontWeight: 'bold',
  },
  favoriteButtonText: {
    color: 'orange',
  },
};

const lightStyles = {
  ...commonStyles,
  productName: {
    ...commonStyles.productName,
    color: '#000',
  },
  productPrice: {
    ...commonStyles.productPrice,
    color: '#000',
  },
  productid: {
    ...commonStyles.productid,
    color: '#000',
  },
  favoriteButton: {
    ...commonStyles.favoriteButton,
    color: '#000',
  },
};

const darkStyles = {
  ...commonStyles,
  productContainer: {
    ...commonStyles.productContainer,
    backgroundColor: '#1E1E1E',
  },
  productName: {
    ...commonStyles.productName,
    color: '#FFF',
  },
  productPrice: {
    ...commonStyles.productPrice,
    color: '#FFF',
  },
  productid: {
    ...commonStyles.productid,
    color: '#FFF',
  },
  favoriteButton: {
    ...commonStyles.favoriteButton,
    color: '#FFF',
  },
  favoriteButtonText: {
    color: 'white',
  },
};
