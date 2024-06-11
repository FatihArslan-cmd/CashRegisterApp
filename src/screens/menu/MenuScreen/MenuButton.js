import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CustomText from '../../../components/CustomText';

const MenuButton = ({ icon, color, label, onPress, isDarkMode }) => {
  return (
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        { borderColor: color },
        isDarkMode && styles.darkButtonContainer
      ]}
      onPress={onPress}
    >
      <Icon name={icon} size={24} color={isDarkMode ? 'white' : color} />
      <CustomText style={[styles.buttonText, isDarkMode && styles.darkButtonText]}>
        {label}
      </CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    width: 250,
    margin: 15,
    height: 40,
  },
  darkButtonContainer: {
    backgroundColor: '#333',
  },
  buttonText: {
    fontSize: 20,
    marginLeft: 8,
    color: 'black',
  },
  darkButtonText: {
    color: 'white',
  },
});

export default MenuButton;
