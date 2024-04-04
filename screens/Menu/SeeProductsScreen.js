import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Button } from 'react-native';

const SeeProductScreen = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [sortType, setSortType] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fatiharslan-cmd.github.io/mockjson/db.json');
      const data = await response.json();
      if (!data.products || !Array.isArray(data.products)) {
        throw new Error('Product data is not in the expected format');
      }
      setProducts(data.products);
      setFilteredProducts(data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSort = (type) => {
    let sortedProducts = [...filteredProducts];
    if (type === 'AtoZ') {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (type === 'ZtoA') {
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    } else if (type === 'LowToHigh') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (type === 'HighToLow') {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setSortType(type);
    setFilteredProducts(sortedProducts);
  };

  const toggleFavorite = (id) => {
    const index = favorites.findIndex((item) => item.id === id);
    if (index === -1) {
      // Ürün favori listesinde değilse ekleyin
      const favoriteProduct = products.find((item) => item.id === id);
      setFavorites([...favorites, favoriteProduct]);
    } else {
      // Ürün favori listesinde ise kaldırın
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
      <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
        <Text style={[styles.favoriteButton, isFavorite(item.id) && styles.favoriteButtonText]}>
          {isFavorite(item.id) ? 'Favorited' : 'Add to Favorites'}
        </Text>
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
          <Text style={styles.filterButtonText}>Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => handleSort('AtoZ')}>
          <Text style={styles.filterButtonText}>A to Z</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => handleSort('ZtoA')}>
          <Text style={styles.filterButtonText}>Z to A</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => handleSort('LowToHigh')}>
          <Text style={styles.filterButtonText}>Price: Low to High</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={() => handleSort('HighToLow')}>
          <Text style={styles.filterButtonText}>Price: High to Low</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton} onPress={fetchProducts}>
          <Text style={styles.filterButtonText}>Refresh</Text>
        </TouchableOpacity>
       
      </View>
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Modal visible={showFavorites} animationType="slide">
        <View style={styles.favoritesContainer}>
          <Text style={styles.sectionTitle}>Favorites</Text>
          <FlatList
            data={favorites}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
          <Button title="Close" onPress={() => setShowFavorites(false)} />
        </View>
      </Modal>
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
    marginBottom: 20,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007bff',
    borderRadius: 5,
  },
  filterButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  productContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
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
    color: 'blue',
    fontWeight: 'bold',
  },
  favoriteButtonText: {
    color: 'green',
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
  favoritesContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
});

export default SeeProductScreen;
