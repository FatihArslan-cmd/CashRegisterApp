import React, { useState, useEffect, useCallback, memo, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, TextInput, Image, RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Antdesign from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';
import { Menu, Box, NativeBaseProvider, Pressable, HamburgerIcon, Heading } from 'native-base';
import axios from 'axios';
import LoadingIndicator from '../../components/LoadingIndicator';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../context/ThemeContext'; // Adjust the path accordingly
import FilterModal from './FiltersModel';

const SeeProductScreen = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showFiltersModal, setShowFiltersModal] = useState(false); 
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [favoriteAllPressed, setFavoriteAllPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { t } = useTranslation();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

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
        image: product.image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT9k_SAGieVTJrmp8-xBMsgguDKxWVv7iqpA&s' 
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
    if (!favoriteAllPressed) {
      setFavorites([...favorites, ...products]);
      setFavoriteAllPressed(true);
      setShowAssignModal(false);
    }
  };

  const unFavoriteAll = () => {
    setFavorites([]);
    setShowAssignModal(false);
    setFavoriteAllPressed(false); 
  };

  const toggleFavorite = (id) => {
    const index = favorites.findIndex((item) => item.id === id);
    if (index === -1) {
      const favoriteProduct = products.find((item) => item.id === id);
      setFavorites([...favorites, favoriteProduct]);
    } else {
      const updatedFavorites = [...favorites];
      updatedFavorites.splice(index, 1);
      setFavorites(updatedFavorites);
    }
  };

  const memoizedIsFavorite = useCallback(
    (id) => favorites.some((item) => item.id === id),
    [favorites]
  );

  const RenderItem = memo(({ item }) => {
    const isFavorite = memoizedIsFavorite(item.id);
    return (
      <Animatable.View
        animation="fadeInUp"
        delay={500}
        useNativeDriver
      >
        <View style={isDarkMode ? darkStyles.productContainer : lightStyles.productContainer}>
          <Text style={isDarkMode ? darkStyles.productName : lightStyles.productName}>{item.name}</Text>
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
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProducts();
    setRefreshing(false);
  }, []);

  return (
    <View style={isDarkMode ? darkStyles.container : lightStyles.container}>
      <Animatable.View
        animation="fadeInDown"
        delay={300} 
        useNativeDriver
      >
        <View style={isDarkMode ? darkStyles.filterContainer : lightStyles.filterContainer}>
          <TouchableOpacity style={isDarkMode ? darkStyles.filterButton : lightStyles.filterButton} onPress={() => setShowFavorites(true)}> 
            <Antdesign style={isDarkMode ? darkStyles.favoriteIcon : lightStyles.favoriteIcon} name={"star"} size={28} color={"white"} />
          </TouchableOpacity>
          <TextInput
            style={isDarkMode ? darkStyles.searchInput : lightStyles.searchInput}
            placeholder={t('Search products')}
            onChangeText={text => setSearchTerm(text)}
            value={searchTerm}
            placeholderTextColor={isDarkMode ? '#ccc' : '#888'}
          />
          <TouchableOpacity onPress={() => setShowFiltersModal(true)}>
            <MaterialCommunityIcons style={isDarkMode ? darkStyles.searchIcons : lightStyles.searchIcons} name={"filter-variant"} size={30}/>
          </TouchableOpacity>
          <Modal visible={showAssignModal} animationType="slide" transparent>
            <View style={isDarkMode ? darkStyles.modalContainer : lightStyles.modalContainer}>
              <View style={isDarkMode ? darkStyles.modalContent : lightStyles.modalContent}>
                <TouchableOpacity style={[isDarkMode ? darkStyles.modalButton : lightStyles.modalButton, isDarkMode ? darkStyles.cancelButton : lightStyles.cancelButton]} onPress={() => setShowAssignModal(false)}>
                  <Text style={[isDarkMode ? darkStyles.modalButtonText : lightStyles.modalButtonText, isDarkMode ? darkStyles.cancelButtonText : lightStyles.cancelButtonText]}>{t('Cancel')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>

        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <View style={isDarkMode ? darkStyles.productsListContainer : lightStyles.productsListContainer}>
            <FlatList
              data={filteredProducts}
              renderItem={({ item }) => <RenderItem item={item} />}
              removeClippedSubviews={true}
              keyExtractor={(item) => item.id.toString()}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
            />
          </View>
        )}
      </Animatable.View>

      <Modal  visible={showFavorites} animationType="slide">
        <View style={isDarkMode ? darkStyles.favoritesContainer : lightStyles.favoritesContainer}>
          <View style={{ flexDirection: 'row' }}>
            <NativeBaseProvider>
              <Box justifyContent={'center'} alignItems={'center'} >
              <Heading style={{ color: isDarkMode ? 'white' : 'black' }}>{t('Favorites')}</Heading>
                <Menu w="190" trigger={triggerProps => {
                  return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                    <HamburgerIcon />
                  </Pressable>;
                }}>
                  <Menu.Item onPress={assignAllFavorites}>{t('Favorite All Products')}</Menu.Item>
                  <Menu.Item onPress={unFavoriteAll}>{t('Unfavorite All Products')}</Menu.Item>
                </Menu>
              </Box>
            </NativeBaseProvider>
          </View>
          
          {favorites.length === 0 ? (
            <View style={isDarkMode ? darkStyles.emptyContainer : lightStyles.emptyContainer}>
              <Image
                source={{ uri: 'https://bwmachinery.com.au/wp-content/uploads/2019/08/no-product-500x500.png' }}
                style={{ width: 200, height: 200, alignSelf: 'center', alignItems: 'center' }} 
              />
            </View>
          ) : (
            <FlatList
              data={favorites}
              renderItem={({ item }) => <RenderItem item={item} />}
              keyExtractor={(item) => item.id.toString()}
            />
          )}
         
          <TouchableOpacity onPress={() => setShowFavorites(false)} style={{ backgroundColor:isDarkMode ? 'white' : 'black'
, marginTop: 'auto',borderRadius:15 }}>
            <Text style={{  color: isDarkMode ? 'black' : 'white' , padding: 10, textAlign: 'center', fontWeight: 'bold' }}>{t('Close')}</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <FilterModal
        showFiltersModal={showFiltersModal}
        setShowFiltersModal={setShowFiltersModal}
        filteredProducts={filteredProducts}
        setFilteredProducts={setFilteredProducts}
      />
    </View>
  );
};

const commonStyles = {
  productContainer: {
    marginBottom: 20,
    marginRight: 20, 
    padding: 10,
    borderWidth: 1,
    borderColor:'#ccc',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalButton: {
    padding: 15,
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    borderTopWidth: 1,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
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
  favoritesContainer: {
    flex: 1,
    padding: 20,
  },
};

const lightStyles = StyleSheet.create({
  ...commonStyles,
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    padding: 10
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    paddingHorizontal: 10,
    margin: 5,
    padding: 5,
    color: '#000',
  },
  searchIcons: {
    color:'black',
    marginTop: 12,
    marginRight: 20
  },
  favoriteIcon: {
    padding: 4,
  },
  filterButton: {
    padding: 4,
    backgroundColor: 'orange',
    borderRadius: 15,
    marginLeft: 5,
  },
  modalButtonText: {
    color: '#000',
  },
  cancelButtonText: {
    color: 'red',
  },
  productsListContainer: {
    backgroundColor: '#fff',
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const darkStyles = StyleSheet.create({
  ...commonStyles,
  productContainer:{
    marginBottom: 20,
    marginRight: 20, 
    padding: 10,
    borderWidth: 1,
    borderColor:'#ccc',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
backgroundColor:'#1E1E1E'
  },
  
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1E1E1E',
  },
  favoriteButtonText:{
color:'white'
  },
  favoriteButton:{
    color:'white'

  },
  productName:{
    fontSize:18,
    color:'white',
    fontWeight:'bold'
  },
  productPrice:{
    color:'white',
    fontWeight:'bold'
  },
  productid:{
    color:'white',
    fontWeight:'bold'
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 20,
    padding: 10
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 15,
    paddingHorizontal: 10,
    margin: 5,
    padding: 5,
    color: '#fff',
  },
  searchIcons: {
    color:'white',
    marginTop: 12,
    marginRight: 20
  },
  favoriteIcon: {
    padding: 4,
  },
  filterButton: {
    padding: 4,
    backgroundColor: 'orange',
    borderRadius: 15,
    marginLeft: 5,
  },
  modalButtonText: {
    color: '#fff',
  },
  cancelButtonText: {
    color: 'red',
  },
  productsListContainer: {
    backgroundColor: '#1E1E1E',
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoritesContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1E1E1E',
  },
});

export default SeeProductScreen;
