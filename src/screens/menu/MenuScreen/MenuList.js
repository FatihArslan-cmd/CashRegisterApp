import React from 'react';
import { View, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import MenuButton from './MenuButton'; 

const MenuList = ({ menuItems, handleItemPress, isDarkMode }) => {
  return (
    <Animatable.View
      animation="fadeInUp"
      delay={250}
      useNativeDriver
      style={styles.container}
    >
      {menuItems.map((item, index) => (
        <MenuButton
          key={index}
          icon={item.icon}
          color={item.color}
          label={item.label}
          onPress={() => handleItemPress(item)}
          isDarkMode={isDarkMode}
        />
      ))}
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

export default MenuList;
