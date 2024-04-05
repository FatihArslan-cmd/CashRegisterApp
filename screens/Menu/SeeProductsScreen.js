import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Button, TextInput, Image, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // FontAwesome ikonlarını kullanmak için
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Antdesign from 'react-native-vector-icons/AntDesign';
import FilterModal from './FiltersModel';
const SeeProductScreen = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showFiltersModal, setShowFiltersModal] = useState(false); // Add state for showing filters modal
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fatiharslan-cmd.github.io/mockjson/db.json');
      const data = await response.json();
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
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

 
  

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

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>Price: ${item.price}</Text>
      <Text style={styles.productid}>ID: {item.id}</Text>
      
      <Image source={{ uri: item.image }} style={{ width: 100, height: 100 ,borderRadius:15, marginTop:5,marginBottom:5 }} />
      <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Icon name={isFavorite(item.id) ? 'heart' : 'heart-o'} size={24} color={isFavorite(item.id) ? 'orange' : 'green'} />
          <Text style={[styles.favoriteButton, isFavorite(item.id) && styles.favoriteButtonText]}>
            {isFavorite(item.id) ? 'Favorited' : 'Add to Favorites'}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const isFavorite = (id) => {
    return favorites.some((item) => item.id === id);
  };
  
  
  return (
    <View style={styles.container}>
      <View style={styles.filterContainer}>
        <TouchableOpacity style={styles.filterButton} onPress={() => setShowFavorites(true)}> 
          <Antdesign style={styles.favoriteIcon} name={"star"} size={28} color={"white"} />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products"
          onChangeText={text => setSearchTerm(text)}
          value={searchTerm}
        />
        <TouchableOpacity onPress={() => setShowFiltersModal(true)}>
          <MaterialCommunityIcons style={styles.searchIcons} name={"filter-variant"} size={30} color={"black"} />
        </TouchableOpacity>
      </View>
      
      <View style={styles.productsListContainer}>
        <FlatList
          data={filteredProducts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      
      <Modal visible={showFavorites} animationType="slide">
        <View style={styles.favoritesContainer}>
          <Text style={styles.sectionTitle}>Favorites</Text>
          <FlatList
            data={favorites}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
          <Button title="Close" onPress={() => setShowFavorites(false)} style={{ backgroundColor: 'orange' }} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom:20,
    marginTop:20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    padding:10
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    paddingHorizontal: 10,
    margin:5,
    padding:5
  },
  searchIcons:{
    marginTop:12,
    marginRight:20
  },
  sortButtons: {
    flexDirection: 'column',
    borderRadius:15,
    backgroundColor:'orange',
    margin:5
  },
  favoriteIcon:{
    padding:4,
  },
  filterButton: {
    padding: 4,
    backgroundColor: 'orange',
    borderRadius: 15,
    marginLeft: 5,
  },
  filterButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize:10,
  },
  productContainer: {
    marginBottom: 20,
    marginRight: 20, 
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    justifyContent:'center',
    alignItems:'center'
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
    color: 'green',
    fontWeight: 'bold',
  },
  favoriteButtonText: {
    color: 'orange',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  favoritesContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight:'bold'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight:'bold'
  },
  sortButton: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
});

export default SeeProductScreen;
