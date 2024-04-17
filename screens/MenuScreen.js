import {React,useContext} from 'react';
import { View, TouchableOpacity, StyleSheet, Linking,Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomText from '../functions/CustomText'; // Burada CustomText bileşenini import ediyoruz.
import * as Animatable from 'react-native-animatable';
const menuItems = [
  { icon: 'shopping-cart', color: 'black', label: 'SALES', navigation: 'Application' },
  { icon: 'money', color: 'green', label: 'PRODUCTS', navigation: 'SeeProducts' },
  { icon: 'undo', color: 'red', label: 'İADE İŞLEMLERİ' },
  { icon: 'credit-card', color: 'orange', label: 'TAHSİLATLAR' },
  { icon: 'file-text-o', color: 'gray', label: 'REPORTS' },
  { icon: 'ellipsis-h', color: 'black', label: 'DİĞER İŞLEMLER' },
  { icon: 'plus-square', color: 'blue', label: 'PRODUCT ENTRY', navigation: 'DirectProductEntry' },
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
    <Animatable.View
     animation="fadeInUp"
     delay={250} 
     useNativeDriver
   >
      {menuItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.buttonContainer, { borderColor: item.color }]}
          onPress={() => handle32bit(item)}
        >
          <Icon name={item.icon} size={24} color={item.color} />
         
          <CustomText style={styles.buttonText}>{item.label}</CustomText>
        </TouchableOpacity>
        
      ))}
      </Animatable.View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'lightgray',
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
    fontSize: 20,
    marginLeft: 8,
  },
});

export default MenuScreen;
