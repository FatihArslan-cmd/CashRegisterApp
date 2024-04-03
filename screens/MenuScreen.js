import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const Button = ({ text }) => {
  return (
    <TouchableOpacity style={styles.button}>
      <LinearGradient colors={['#1e3c72', '#2a5298']} style={styles.gradient}>
        <Text style={styles.buttonText}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const MenuScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Button text="Button 1" />
        <Button text="Button 2" />
      </View>
      <View style={styles.row}>
        <Button text="Button 3" />
        <Button text="Button 4" />
      </View>
      <View style={styles.row}>
        <Button text="Button 5" />
        <Button text="Button 6" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 30,
   
  },
  
  buttonText: {
    padding: 30,
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default MenuScreen;
