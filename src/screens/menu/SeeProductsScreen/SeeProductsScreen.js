import React, { useState, useEffect, useCallback, useContext } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../../context/ThemeContext';
import LoadingIndicator from '../../../components/LoadingIndicator';
import ProductItem from './ProductItem';
import SearchBar from './SearchBar';
import FavoritesModal from './FavoritesModal';
import FilterModal from './FiltersModel'; // Adjust the path if needed

const SeeProductScreen = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showFiltersModal, setShowFiltersModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();
  const { isDarkMode } = useContext(ThemeContext);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('https://fatiharslan-cmd.github.io/mockjson/db.json');
      const data = response.data;
      if (!data.products || !Array.isArray(data.products)) {
        throw new Error('Product data is not in the expected format');
      }

      const productsWithImages = data.products.map(product => ({
        ...product,
        image: product.image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT9k_SAGieVTJrmp8-xBMsgguDKxWVv7iqpA&s',
      }));
      setProducts(productsWithImages);
      setFilteredProducts(productsWithImages);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    loadFavorites();
  }, []);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  useEffect(() => {
    saveFavorites();
  }, [favorites]);

  const saveFavorites = async () => {
    try {
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites !== null) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const assignAllFavorites = () => {
    setFavorites([...favorites, ...products]);
  };

  const unFavoriteAll = () => {
    setFavorites([]);
  };

  const toggleFavorite = id => {
    const index = favorites.findIndex(item => item.id === id);
    if (index === -1) {
      const favoriteProduct = products.find(item => item.id === id);
      setFavorites([...favorites, favoriteProduct]);
    } else {
      const updatedFavorites = [...favorites];
      updatedFavorites.splice(index, 1);
      setFavorites(updatedFavorites);
    }
  };

  const memoizedIsFavorite = useCallback(
    id => favorites.some(item => item.id === id),
    [favorites]
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProducts();
    setRefreshing(false);
  }, []);

  return (
    <View style={isDarkMode ? darkStyles.container : lightStyles.container}>
      <Animatable.View animation="fadeInDown" delay={300} useNativeDriver>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          setShowFavorites={setShowFavorites}
          setShowFiltersModal={setShowFiltersModal}
        />

        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <View style={isDarkMode ? darkStyles.productsListContainer : lightStyles.productsListContainer}>
            <FlatList
              data={filteredProducts}
              renderItem={({ item }) => (
                <ProductItem
                  item={item}
                  isFavorite={memoizedIsFavorite(item.id)}
                  toggleFavorite={toggleFavorite}
                />
              )}
              keyExtractor={item => item.id.toString()}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          </View>
        )}
      </Animatable.View>

      <FavoritesModal
        showFavorites={showFavorites}
        setShowFavorites={setShowFavorites}
        favorites={favorites}
        assignAllFavorites={assignAllFavorites}
        unFavoriteAll={unFavoriteAll}
        toggleFavorite={toggleFavorite}
        memoizedIsFavorite={memoizedIsFavorite}
      />

      <FilterModal
        showFiltersModal={showFiltersModal}
        setShowFiltersModal={setShowFiltersModal}
        filteredProducts={filteredProducts}
        setFilteredProducts={setFilteredProducts}
      />
    </View>
  );
};

export default SeeProductScreen;

const lightStyles = {
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  productsListContainer: {
    backgroundColor: '#fff',
  },
};

const darkStyles = {
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1E1E1E',
  },
  productsListContainer: {
    backgroundColor: '#1E1E1E',
  },
};
