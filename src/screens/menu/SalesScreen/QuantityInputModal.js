import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const QuantityInputModal = ({ visible, onClose, onAdd }) => {
  const [quantity, setQuantity] = useState('');

  const handleAdd = () => {
    const quantityNumber = parseInt(quantity, 10);
    if (!isNaN(quantityNumber) && quantityNumber > 0) {
      onAdd(quantityNumber);
      setQuantity('');
      onClose();
    } else {
      alert('Please enter a valid quantity.');
    }
  };

  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Enter Quantity</Text>
          <TextInput
            style={styles.modalInput}
            keyboardType="numeric"
            value={quantity}
            onChangeText={setQuantity}
            placeholder="Enter quantity"
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={onClose} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleAdd} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#3e66ae',
    borderRadius: 5,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default QuantityInputModal;
