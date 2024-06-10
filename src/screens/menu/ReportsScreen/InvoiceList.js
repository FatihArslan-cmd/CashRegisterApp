// InvoiceList.js
import React from 'react';
import { FlatList, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

const InvoiceList = ({ invoices, isDarkMode, handleInvoicePress, handleDeleteInvoice }) => {
  const { t } = useTranslation();

  return (
    <FlatList
      data={invoices}
      renderItem={({ item, index }) => (
        <View style={[styles.invoiceContainer, isDarkMode && styles.darkInvoiceContainer]}>
          <MaterialCommunityIcons
            name="checkbox-blank-circle"
            size={24}
            color={item.online ? "green" : "red"}
          />
          <Text style={[styles.salesNoText, isDarkMode && styles.darkText]}>{t('Sales No')} {item.salesNo}</Text>
          <TouchableOpacity style={styles.accessButton} onPress={() => handleInvoicePress(item)}>
            <Text style={styles.accessButtonText}>{item.date}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteInvoice(index)}>
            <Ionicons name="trash-outline" size={24} color="red" />
          </TouchableOpacity>
        </View>
      )}
      keyExtractor={(item, index) => index.toString()}
      ListEmptyComponent={<Text style={[styles.emptyText, isDarkMode && styles.darkEmptyText]}>{t('No invoices available')}</Text>}
    />
  );
};

const styles = StyleSheet.create({
  invoiceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  darkInvoiceContainer: {
    backgroundColor: '#333',
    borderColor: '#555',
  },
  salesNoText: {
    fontWeight: 'bold',
  },
  accessButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  accessButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: 'gray',
  },
  darkEmptyText: {
    color: 'lightgray',
  },
});

export default InvoiceList;
