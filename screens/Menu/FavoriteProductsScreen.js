import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Modal, RefreshControl, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Antdesign from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';

const FavoriteModal = ({ visible, favorites, onClose }) => {
  const [searchText, setSearchText] = useState('');

  const filteredFavorites = favorites.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const addToFavorites = (item) => {
    console.log(item);
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
      
        <View style={styles.favoritesContainer}>
          <Animatable.View
            animation="fadeInDown"
            delay={100}
            useNativeDriver
          >
            <Text style={styles.sectionTitle}>Favorites</Text>
          
          <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name"
            onChangeText={text => setSearchText(text)}
            value={searchText}
          />
        </View>
        </Animatable.View>
          <Animatable.View
            animation="fadeInUp"
            delay={500}
            useNativeDriver
          >
            <Animatable.Text style={{fontWeight:'bold'}} animation="slideInUp" iterationCount={15} direction="alternate">Tap to add!</Animatable.Text>
            <FlatList
              data={filteredFavorites}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => addToFavorites(item)}>
                  <View style={styles.productContainer}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.productID}>ID: {item.id}</Text>
                    <Text style={styles.productPrice}>Price: ${item.price}</Text>
                    <Text style={styles.productPrice}>KDV %{item.kdv}</Text>
                    <Image source={{ uri: item.image }} style={styles.productImage} />
                  </View>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
          </Animatable.View>
        </View>
      </View>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity>
    </Modal>
  );
};

const FavoriteProductsScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
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

    loadFavorites();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      if (storedFavorites !== null) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.filterButton} onPress={() => setShowFavorites(true)}>
        <Antdesign style={styles.favoriteIcon} name={"star"} size={28} color={"white"} />
      </TouchableOpacity>

      <FavoriteModal
        visible={showFavorites}
        favorites={favorites}
        onClose={() => setShowFavorites(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    padding: 10,
    backgroundColor: '#fff',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
  },
  favoritesContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  favoriteIcon: {
    padding: 7
  },
  productID: {
    marginBottom: 5
  },
  productPrice: {
    marginBottom: 5
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
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
    marginBottom: 5
  },
  filterButton: {
    padding: 4,
    backgroundColor: 'orange',
    borderRadius: 15,
    width: 50,
    height: 50,

  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 15,
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 10,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: 'orange',
    marginTop: 10,
    padding: 10,
    borderRadius: 20,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
  },
});

export default FavoriteProductsScreen;
