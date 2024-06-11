import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const SearchBar = ({ placeholder, onChangeText, value, isDarkMode }) => {
  const styles = isDarkMode ? darkStyles : lightStyles;

  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        placeholderTextColor={isDarkMode ? '#ccc' : '#888'}
      />
    </View>
  );
};

const lightStyles = StyleSheet.create({
  searchContainer: {
    padding: 10,
    backgroundColor: '#fff',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    color: '#000',
  },
});

const darkStyles = StyleSheet.create({
  searchContainer: {
    padding: 10,
    backgroundColor: '#121212',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 10,
    padding: 10,
    color: '#fff',
  },
});

export default SearchBar;
