import React, { useState, useContext } from 'react';
import { View, Modal, Text, Pressable, StyleSheet } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../../context/ThemeContext'; // Update the path as necessary

const SortButton = ({ onPress, text, iconName, iconType, isDarkMode }) => (
  <Pressable style={[styles.sortButton, { backgroundColor: isDarkMode ? '#555' : '#3e66ae' }]} onPress={onPress}>
    <View style={styles.sortButtonContent}>
      {iconType === 'FontAwesome' ? (
        <FontAwesome name={iconName} size={24} color={isDarkMode ? 'white' : 'black'} style={styles.icon} />
      ) : (
        <FontAwesome5 name={iconName} size={24} color={isDarkMode ? 'white' : 'black'} style={styles.icon} />
      )}
      <Text style={[styles.buttonText, { color: isDarkMode ? 'white' : 'white' }]}>{text}</Text>
    </View>
  </Pressable>
);

const FilterModal = ({ showFiltersModal, setShowFiltersModal, filteredProducts, setFilteredProducts }) => {
  const [sortType, setSortType] = useState('');
  const { t } = useTranslation();
  const { isDarkMode } = useContext(ThemeContext); // Use ThemeContext

  const handleSort = (type) => {
    let sortedProducts = [...filteredProducts];
    if (type === 'AtoZ') {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (type === 'ZtoA') {
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    } else if (type === 'LowToHigh') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (type === 'HighToLow') {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (type === 'IdAscending') {
      sortedProducts.sort((a, b) => a.id - b.id);
    } else if (type === 'IdDescending') {
      sortedProducts.sort((a, b) => b.id - a.id);
    }
    setSortType(type);
    setFilteredProducts(sortedProducts);
  };

  const applySort = (type) => {
    handleSort(type);
    setShowFiltersModal(false);
  };

  return (
    <Modal visible={showFiltersModal} animationType="slide" transparent={true}>
      <View style={styles.centeredView}>
        <View style={[styles.modalView, { backgroundColor: isDarkMode ? '#333' : 'white' }]}>
          <Text style={[styles.modalText, { color: isDarkMode ? 'white' : 'black' }]}>{t('Filter Options')}</Text>
          <View style={styles.sortButtons}>
            <SortButton
              onPress={() => applySort('AtoZ')}
              text={t('Sort A to Z')}
              iconName="sort-alpha-asc"
              iconType="FontAwesome"
              isDarkMode={isDarkMode}
            />
            <SortButton
              onPress={() => applySort('ZtoA')}
              text={t('Sort Z to A')}
              iconName="sort-alpha-desc"
              iconType="FontAwesome"
              isDarkMode={isDarkMode}
            />
            <SortButton
              onPress={() => applySort('LowToHigh')}
              text={t('Sort Low to High')}
              iconName="sort-amount-down-alt"
              iconType="FontAwesome5"
              isDarkMode={isDarkMode}
            />
            <SortButton
              onPress={() => applySort('HighToLow')}
              text={t('Sort High to Low')}
              iconName="sort-amount-down"
              iconType="FontAwesome5"
              isDarkMode={isDarkMode}
            />
            <SortButton
              onPress={() => applySort('IdAscending')}
              text={t('Sort ID Ascending')}
              iconName="sort-numeric-down-alt"
              iconType="FontAwesome5"
              isDarkMode={isDarkMode}
            />
            <SortButton
              onPress={() => applySort('IdDescending')}
              text={t('Sort ID Descending')}
              iconName="sort-numeric-down"
              iconType="FontAwesome5"
              isDarkMode={isDarkMode}
            />
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Pressable
              style={[styles.button, styles.buttonClose, { backgroundColor: isDarkMode ? 'gray' : 'red' }]}
              onPress={() => setShowFiltersModal(false)}
            >
              <Text style={styles.textStyle}>{t('Cancel')}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  sortButton: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  sortButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
  },
  modalText: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default FilterModal;
