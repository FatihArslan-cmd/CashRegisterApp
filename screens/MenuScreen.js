import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook from React Navigation
import Icon from 'react-native-vector-icons/FontAwesome';

const menuItems = [
  { icon: 'shopping-cart', color: 'black', label: 'SATIŞ', navigation: 'Application' },
  { icon: 'money', color: 'green', label: 'FİYAT GÖR' },
  { icon: 'undo', color: 'red', label: 'İADE İŞLEMLERİ' },
  { icon: 'credit-card', color: 'orange', label: 'TAHSİLATLAR' },
  { icon: 'file-text-o', color: 'gray', label: 'RAPORLAR' },
  { icon: 'ellipsis-h', color: 'black', label: 'DİĞER İŞLEMLER' },
  { icon: 'plus-square', color: 'blue', label: 'DİREKT ÜRÜN GİRİŞİ' },
  { icon: 'external-link', color: 'black', label: 'www' },
];

const MenuScreen = () => {
  const navigation = useNavigation(); // Get the navigation object using useNavigation hook

  return (
    <View style={styles.container}>
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.buttonContainer, { borderColor: item.color }]}
          onPress={() => {
            navigation.navigate(item.navigation); // Use item.navigation instead of 'item.navigation'
          }}
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
