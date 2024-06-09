import React, { useContext } from 'react';
import { View, TextInput, TouchableOpacity, Modal } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Antdesign from 'react-native-vector-icons/AntDesign';
import { ThemeContext } from '../../../context/ThemeContext';
import { useTranslation } from 'react-i18next';

const SearchBar = ({ searchTerm, setSearchTerm, setShowFavorites, setShowFiltersModal }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const { t } = useTranslation();

  return (
    <View style={isDarkMode ? darkStyles.filterContainer : lightStyles.filterContainer}>
      <TouchableOpacity style={isDarkMode ? darkStyles.filterButton : lightStyles.filterButton} onPress={() => setShowFavorites(true)}>
        <Antdesign style={isDarkMode ? darkStyles.favoriteIcon : lightStyles.favoriteIcon} name={"star"} size={28} color={"white"} />
      </TouchableOpacity>
      <TextInput
        style={isDarkMode ? darkStyles.searchInput : lightStyles.searchInput}
        placeholder={t('Search products')}
        onChangeText={text => setSearchTerm(text)}
        value={searchTerm}
        placeholderTextColor={isDarkMode ? '#ccc' : '#888'}
      />
      <TouchableOpacity onPress={() => setShowFiltersModal(true)}>
        <MaterialCommunityIcons style={isDarkMode ? darkStyles.searchIcons : lightStyles.searchIcons} name={"filter-variant"} size={30} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

const commonStyles = {
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    padding: 10,
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    paddingHorizontal: 10,
    margin: 5,
    padding: 5,
    color: '#000',
  },
  searchIcons: {
    color: 'black',
    marginTop: 12,
    marginRight: 20,
  },
  favoriteIcon: {
    padding: 4,
  },
  filterButton: {
    padding: 4,
    backgroundColor: 'orange',
    borderRadius: 15,
    marginLeft: 5,
  },
};

const lightStyles = {
  ...commonStyles,
};

const darkStyles = {
  ...commonStyles,
  filterContainer: {
    ...commonStyles.filterContainer,
    borderColor: '#444',
  },
  searchInput: {
    ...commonStyles.searchInput,
    borderColor: '#444',
    color: '#fff',
  },
  searchIcons: {
    color: 'white',
    marginTop: 12,
    marginRight: 20,
  },
};
