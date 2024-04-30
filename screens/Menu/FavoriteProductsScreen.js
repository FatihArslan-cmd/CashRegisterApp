import React, { useState, useEffect } from 'react';
import { View, Text, FlatList,Alert, StyleSheet, Image, TouchableOpacity, Modal, RefreshControl, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Antdesign from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';
import { useNavigation, useRoute } from '@react-navigation/native';
import LoadingIndicator from '../../functions/LoadingIndicator';
const FavoriteProductsScreen = ({disableActions,paymentSuccess}) => {
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [showToastItem, setShowToastItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();
  

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

  const showToastMessage = (selectedItem) => {
    setIsLoading(true);
    setShowToast(true);
    setShowToastItem(selectedItem); 
    setTimeout(() => {
      ;
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
    // Show alert when actions are disabled
    Alert.alert("Actions Disabled", "You cannot remove/add products after the discount is applied/Payment is done.");
  }
  };

  const filteredFavorites = favorites.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
        
      <TouchableOpacity style={styles.filterButton} onPress={() => setShowFavorites(true)}>
        <Antdesign style={styles.favoriteIcon} name={"star"} size={28} color={"white"} />
      </TouchableOpacity>
      <Modal visible={showFavorites} animationType="slide">
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
                 {isLoading && <LoadingIndicator />}
              </View>
              
            </Animatable.View>
            {filteredFavorites.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Image
                  source={{ uri: 'https://bwmachinery.com.au/wp-content/uploads/2019/08/no-product-500x500.png' }}
                  style={styles.emptyImage}
                />
              </View>
            ) : (
              <Animatable.View
                animation="fadeInUp"
                delay={500}
                useNativeDriver
              >
               
                <Animatable.Text style={styles.tapToAddText} animation="slideInUp" iterationCount={3} direction="alternate">
                  Tap to add!
                </Animatable.Text>
                
                  <FlatList
                    data={filteredFavorites}
                    renderItem={({ item }) => (
                      <TouchableOpacity 
                      onPress={() => addToFavorites(item)} 
                      disabled={isLoading} 
                    >
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
                    refreshControl={
                      <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                      />
                    }
                  />
               
  
                {showToast && (
                  <View style={styles.toast}>
                    <Text style={styles.toastText}>
                      {showToastItem ? `"${showToastItem.name}" has been added ` : ''}
                    </Text>
                  </View>
                )}
              </Animatable.View>
            )}
          </View>
        </View>
      
        <TouchableOpacity onPress={() => setShowFavorites(false)} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
            
      </Modal>
    
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
  toast: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
    position: 'absolute',
    marginBottom:'auto',
    alignSelf: 'center',
  },
  toastText: {
    color: 'white',
    fontSize: 16,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
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
