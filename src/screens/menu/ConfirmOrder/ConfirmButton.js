import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

const ConfirmButton = ({ onPress }) => {
  const { t } = useTranslation();

  return (
    <TouchableOpacity onPress={onPress} style={styles.confirmButton}>
      <View style={{ flexDirection: 'row' }}>
        <Entypo name="check" size={36} color="white" style={styles.inputIcon} />
        <Text style={styles.cancelButtonText}>
          {t('Confirm')}
          {"\n"}
          {t('Order')}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  confirmButton: {
    backgroundColor: '#3e66ae',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    padding: 10,
    borderRadius: 15,
    width: 90,
    marginRight: 'auto',
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ConfirmButton;
