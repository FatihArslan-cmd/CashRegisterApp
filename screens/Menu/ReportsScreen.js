import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons'; 
import { Box, Popover, Button, NativeBaseProvider } from 'native-base';

const ReportsScreen = () => {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const getInvoices = async () => {
      try {
        const storedInvoices = await AsyncStorage.getItem('invoices');
        if (storedInvoices !== null) {
          setInvoices(JSON.parse(storedInvoices));
        }
      } catch (error) {
        console.error('Error retrieving invoices:', error);
      }
    };

    getInvoices();
  }, []);

  const handleInvoicePress = (invoice) => {
    setSelectedInvoice(invoice);
  };

  const handleCloseWebView = () => {
    setSelectedInvoice(null);
  };

  const handleDeleteInvoice = async (index) => {
    try {
      const updatedInvoices = [...invoices];
      updatedInvoices.splice(index, 1);
      await AsyncStorage.setItem('invoices', JSON.stringify(updatedInvoices));
      setInvoices(updatedInvoices);
    } catch (error) {
      console.error('Error deleting invoice:', error);
    }
  };

  const handleDeleteAllInvoices = async () => {
    if (invoices.length === 0) {
      handleDeleteAllAlert();
    } else {
      try {
        await AsyncStorage.removeItem('invoices');
        setInvoices([]);
      } catch (error) {
        console.error('Error deleting all invoices:', error);
      }
    }
  };

  const handleDeleteAllAlert = () => {
    Alert.alert(
      'No Invoices',
      'There are no invoices to delete.',
      [{ text: 'OK' }],
      { cancelable: false }
    );
  };

  const filteredInvoices = invoices.filter(invoice => invoice.salesNo.toString().includes(searchTerm));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>REPORTS</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search by sales number..."
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <NativeBaseProvider>
          <Box w="150%" alignItems="center">
            <Popover trigger={triggerProps => {
              return <Button {...triggerProps} colorScheme="red">Delete All</Button>;
            }}>
              <Popover.Content accessibilityLabel="Delete Invoices" w="56">
                <Popover.Arrow />
                <Popover.CloseButton />
                <Popover.Header>Delete All</Popover.Header>
                <Popover.Body>
                  This will remove all invoices. This action cannot be reversed. Deleted data cannot be recovered.
                </Popover.Body>
                <Popover.Footer justifyContent="flex-end">
                  <Button.Group space={2}>
                    <Button onPress={handleDeleteAllInvoices} colorScheme="danger">Delete</Button>
                  </Button.Group>
                </Popover.Footer>
              </Popover.Content>
            </Popover>
          </Box>
        </NativeBaseProvider>
      </View>
      {selectedInvoice ? (
        <View style={styles.webViewContainer}>
          <WebView
            originWhitelist={['*']}
            source={{ html: selectedInvoice.html }}
            style={{ flex: 1 }}
          />
          <TouchableOpacity style={styles.closeButton} onPress={handleCloseWebView}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredInvoices}
          renderItem={({ item, index }) => (
            <View style={styles.invoiceContainer}>
              <Text style={styles.salesNoText}>Sales No {item.salesNo}</Text>
              <TouchableOpacity style={styles.accessButton} onPress={() => handleInvoicePress(item)}>
                <Text style={styles.accessButtonText}>{item.date} </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteInvoice(index)}>
                <Ionicons name="trash-outline" size={24} color="red" />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={<Text style={{ textAlign: 'center', color: 'gray' }}>No invoices available</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  inputContainer: {
    flexDirection: 'row'
  },
  salesNoText: {
    fontWeight: 'bold'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  searchBar: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  invoiceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
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
  webViewContainer: {
    flex: 1,
  },
  closeButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default ReportsScreen;
