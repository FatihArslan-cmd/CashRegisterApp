import React, { useState, useContext } from 'react';
import { View, TouchableOpacity, StyleSheet,Alert } from 'react-native';
import Antdesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../../context/ThemeContext';
import useAsyncStorage from '../../../hooks/useAsyncStorage';
import FavoritesModal from './FavoritesModal';
import { ProductContext } from '../../../context/ProductContext';

const FavoriteProductsScreen = () => {
  const [favorites, setFavorites] = useAsyncStorage('favorites', []);
  const [showFavorites, setShowFavorites] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [showToastItem, setShowToastItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { disableActions } = useContext(ProductContext);
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { isDarkMode } = useContext(ThemeContext);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const storedFavorites = await setFavorites([]);
      if (storedFavorites !== null) {
        setFavorites(storedFavorites);
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
    setRefreshing(false);
  };

  const showToastMessage = (selectedItem) => {
    setIsLoading(true);
    setShowToast(true);
    setShowToastItem(selectedItem);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  const addToFavorites = (item) => {
    if (!disableActions) {
      navigation.navigate('Application', { favoriteItem: item });
      showToastMessage(item);
    } else {
      Alert.alert(t('Actions Disabled'), t('You cannot remove/add products after the discount is applied/Payment is done.'));
    }
  };

  const filteredFavorites = favorites.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const styles = isDarkMode ? darkStyles : lightStyles;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.filterButton} onPress={() => setShowFavorites(true)}>
        <Antdesign style={styles.favoriteIcon} name="star" size={28} color="white" />
      </TouchableOpacity>
      <FavoritesModal
        showFavorites={showFavorites}
        setShowFavorites={setShowFavorites}
        favorites={favorites}
        filteredFavorites={filteredFavorites}
        onSearch={setSearchText}
        onRefresh={onRefresh}
        refreshing={refreshing}
        addToFavorites={addToFavorites}
        isLoading={isLoading}
        isDarkMode={isDarkMode}
        showToast={showToast}
        showToastItem={showToastItem}
      />
    </View>
  );
};

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButton: {
    padding: 4,
    backgroundColor: 'orange',
    borderRadius: 15,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIcon: {
    padding: 7,
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButton: {
    padding: 4,
    backgroundColor: 'orange',
    borderRadius: 15,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteIcon: {
    padding: 7,
  },
});

export default FavoriteProductsScreen;
