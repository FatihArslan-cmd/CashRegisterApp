import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import CampaignScreen from '../CampaignScreen';
import FavoriteProductsScreen from '../FavoriteProductsScreen';

const SearchBar = ({
  productId,
  onProductIdChange,
  clearInput,
  getPrice,
  isLoading,
  allTotal,
  onDataReceived,
  ondiscountApplied,
  paymentSuccess,
  campaignCounter,
  disableActions,
  isDarkMode,
  styles
}) => {
  const navigation = useNavigation();

  return (
    <Animatable.View animation="fadeInUp" delay={250} useNativeDriver>
      <View style={styles.inputContainer}>
        <AntDesign name="search1" size={24} color={isDarkMode ? 'white' : 'black'} />
        <TextInput
          style={[styles.productIdInput, { color: isDarkMode ? 'white' : 'black' }]}
          placeholder="Enter ID"
          placeholderTextColor={isDarkMode ? '#aaa' : '#555'}
          onChangeText={onProductIdChange}
          value={productId}
        />
        <TouchableOpacity style={{ marginRight: 20 }} onPress={clearInput}>
          <AntDesign name="closecircle" size={20} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.getPriceButton, isLoading && { backgroundColor: '#ccc' }]} // Disable button style when loading
          onPress={getPrice}
          disabled={isLoading}
        >
          <Text style={styles.enterButton}>Enter</Text>
        </TouchableOpacity>
        <CampaignScreen
          allTotal={allTotal}
          onDataReceived={onDataReceived}
          ondiscountApplied={ondiscountApplied}
          paymentSuccess={paymentSuccess}
          campaignCounter={campaignCounter}
        />
        <FavoriteProductsScreen disableActions={disableActions} />
        {!paymentSuccess && (
          <TouchableOpacity onPress={() => navigation.navigate('BarcodeScreen')}>
            <AntDesign name="barcode" size={28} color={isDarkMode ? 'white' : 'black'} style={styles.inputIcon} />
          </TouchableOpacity>
        )}
      </View>
    </Animatable.View>
  );
};

export default SearchBar;