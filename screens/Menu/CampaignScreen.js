import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, RefreshControl, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Heading,NativeBaseProvider, VStack,Center,Button,Modal } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';

const FavoriteModal = ({ productData, setProductData, subTotal, setSubTotal }) => {
    const [showModal, setShowModal] = useState(false);
    const applyCampaign = (campaignType) => {
      let updatedSubTotal = subTotal;
      let updatedProductData = [...productData];
  
      switch (campaignType) {
        case 'buyThreePayTwo':
          // 3 al 2 öde kampanyası
          const eligibleItemCount = Math.floor(productData.length / 3);
          const discountAmount = eligibleItemCount * updatedProductData[0].price;
          updatedSubTotal -= discountAmount;
          break;
        case 'twentyPercentDiscount':
          // Tüm ürünlere %20 indirim kampanyası
          updatedProductData = updatedProductData.map((product) => ({
            ...product,
            price: product.price * 0.8,
          }));
          updatedSubTotal *= 0.8;
          break;
        case 'setDefault':
          // Varsayılan kampanyayı uygula
          updatedSubTotal = calculateDefaultSubTotal(updatedProductData);
          break;
        default:
          break;
      }
  
      setProductData(updatedProductData);
      setSubTotal(updatedSubTotal);
    };
  
    // Varsayılan toplamı hesapla
    const calculateDefaultSubTotal = (products) => {
      return products.reduce((total, product) => total + product.price, 0);
    };
  return (
    
    <NativeBaseProvider>
        <Animatable.View
    animation="fadeInUp"
    delay={500}
    useNativeDriver
  >
    <Center>
      <TouchableOpacity style={styles.CampaignsButton} onPress={() => setShowModal(true)} >
            <Text style={styles.enterButton}>Campaigns</Text>
          </TouchableOpacity>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          
          <Modal.Body>
          <VStack style={styles.modalContainer} space={1} alignItems="center">
       
       <Heading>Campaigns</Heading>
       <Heading size="sm">Choose the one that you want to use</Heading>
     
       <TouchableOpacity onPress={() => applyCampaign('buyThreePayTwo')}>
        <MaterialIcons name={"discount"} size={24} color={"red"} style={styles.inputIcon} />
        <Text>Buy 3, Pay 2</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => applyCampaign('twentyPercentDiscount')}>
        <MaterialIcons name={"discount"} size={24} color={"red"} style={styles.inputIcon} />
        <Text>20% discount for all products</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => applyCampaign('setDefault')}>
        <MaterialIcons name={"auto-fix-normal"} size={24} color={"gray"} style={styles.inputIcon} />
        <Text>Set Default</Text>
      </TouchableOpacity>
     </VStack>
           
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray"  onPress={() => {
              setShowModal(false);
            }}>
                Cancel
              </Button>
             
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </Center>
    </Animatable.View>
    </NativeBaseProvider>
    
  );
};

const CampaignScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

 

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
      
      
      <FavoriteModal
        visible={showFavorites}
        favorites={favorites}
        onClose={() => setShowFavorites(false)}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
    height: 200, // Modalın yüksekliğini buradan ayarlayabilirsiniz
  },
  
  CampaignsButton:{
    backgroundColor:'#3e66ae',
    borderRadius:10,
   
  },
  enterButton:{
    padding:15,
    color:'white',
    fontWeight:'bold',    
  },
 
  
  closeButton: {
    backgroundColor: '#3e66ae',
    marginTop: 10,
    padding: 10,
    borderRadius: 20,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  
});

export default CampaignScreen;
