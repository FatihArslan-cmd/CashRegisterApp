import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const menuItems = [
  { icon: 'shopping-cart', color: 'black', label: 'SALES', navigation: 'Application' },
  { icon: 'money', color: 'green', label: 'PRODUCTS', navigation: 'SeeProducts' },
  { icon: 'undo', color: 'red', label: 'İADE İŞLEMLERİ' },
  { icon: 'credit-card', color: 'orange', label: 'TAHSİLATLAR' },
  { icon: 'file-text-o', color: 'gray', label: 'REPORTS' },
  { icon: 'ellipsis-h', color: 'black', label: 'DİĞER İŞLEMLER' },
  { icon: 'plus-square', color: 'blue', label: 'DİREKT ÜRÜN GİRİŞİ' },
  { icon: 'external-link', color: 'black', label: 'www', url: 'https://32bit.com.tr/' }, // Add URL to www item
];

const MenuScreen = () => {
  const navigation = useNavigation();

  const handle32bit = (item) => {
    if (item.url) {
      Linking.openURL(item.url);
    } else {
      navigation.navigate(item.navigation);
    }
  };

  return (
    <View style={styles.container}>
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.buttonContainer, { borderColor: item.color }]}
          onPress={() => handle32bit(item)}
        >
          <Icon name={item.icon} size={24} color={item.color} />
          <Text style={styles.buttonText}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    margin: 30
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    width: 250,
    margin: 15,
    height: 40
  },
  buttonText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default MenuScreen;
