import React, { useState } from 'react';
import { View, Modal, Text, Pressable, StyleSheet } from 'react-native';

const SortButton = ({ onPress, text }) => (
  <Pressable style={styles.sortButton} onPress={onPress}>
    <Text style={styles.buttonText}>{text}</Text>
  </Pressable>
);

const FilterModal = ({ showFiltersModal, setShowFiltersModal, filteredProducts, setFilteredProducts }) => {
  const [sortType, setSortType] = useState('');

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
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Filter Options</Text>
          <View style={styles.sortButtons}>
            <SortButton onPress={() => applySort('AtoZ')} text="Sort A to Z" />
            <SortButton onPress={() => applySort('ZtoA')} text="Sort Z to A" />
            <SortButton onPress={() => applySort('LowToHigh')} text="Sort Low to High" />
            <SortButton onPress={() => applySort('HighToLow')} text="Sort High to Low" />
            <SortButton onPress={() => applySort('IdAscending')} text="Sort ID Ascending" />
            <SortButton onPress={() => applySort('IdDescending')} text="Sort ID Descending" />
          </View>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setShowFiltersModal(false);
              }}
            >
              <Text style={styles.textStyle}>Cancel</Text>
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
    backgroundColor: 'white',
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
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  sortButton: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: 'orange',
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    borderWidth:1,
    borderColor:'lightgray',
    padding:5
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default FilterModal;
