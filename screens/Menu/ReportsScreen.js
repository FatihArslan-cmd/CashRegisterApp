import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { Box, Popover, Button, NativeBaseProvider } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OnlineStatusContext from '../../context/OnlineStatusContext';
import LoadingIndicator from '../../functions/LoadingIndicator';
import { useTranslation } from 'react-i18next';

const ReportsScreen = () => {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { isOnline } = useContext(OnlineStatusContext);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

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
  const sendRequestToStore = async () => {
    return new Promise(resolve => {
     
      setTimeout(() => {
        resolve({ success: true });
      }, 2000); 
  
      setTimeout(() => {
        if (invoices.length > 0) {
          const updatedInvoices = invoices.map(invoice => {
            if (!invoice.online) {
              return { ...invoice, online: true };
            }
            return invoice;
          });
          AsyncStorage.setItem('invoices', JSON.stringify(updatedInvoices));
          setInvoices(updatedInvoices);
        }
      }, 4000); 
    
    });
  };
  
  const handleConfirmSendStore = async () => {
    try {
      setIsLoading(true);
      const response = await sendRequestToStore();
      if (response.success && invoices.some(invoice => !invoice.online)) {
        const updatedInvoices = invoices.map(invoice => {
          if (!invoice.online) {
            return { ...invoice, online: true };
          }
          return invoice;
        });
        await AsyncStorage.setItem('invoices', JSON.stringify(updatedInvoices));
        setInvoices(updatedInvoices);
      }
    } catch (error) {
      console.error('Error confirming send store:', error);
    }
    finally{
      setIsLoading(false);
    }
  };
  
  
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
      t('No Invoices'),
      t('There are no invoices to delete.')
      [{ text: 'OK' }],
      { cancelable: false }
    );
  };

  const filteredInvoices = invoices.filter(invoice => invoice.salesNo.toString().includes(searchTerm));

  const falseInvoicesCount = invoices.filter(invoice => !invoice.online).length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('Reports')}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder={t('Search by sales number')}
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <NativeBaseProvider>
        
          <Box w="150%" alignItems="center" flexDirection="row">
            <Popover trigger={triggerProps => {
              return <Button {...triggerProps} colorScheme="blue">{t('Send Store')}</Button>;
            }}>
              <Popover.Content accessibilityLabel="Confirm" w="56">
                <Popover.Arrow />
                <Popover.CloseButton />
                <Popover.Header>{isOnline ? t('Send Orders') : "Offline"}</Popover.Header>
                <Popover.Body>
  {isOnline ? 
    (falseInvoicesCount === 0 ? 
      t('No orders done when offline.') :
      `${falseInvoicesCount} ${t('Orders done when offline will be sent to the store. Do you Confirm?')}`
    ) :
    t('You are offline. Come back when you are online')
  }
</Popover.Body>

                <Popover.Footer justifyContent="flex-end">
                <Button.Group space={2}>
  {isLoading ? (
   
      <LoadingIndicator />
   
  ) : (
    <>
      {isOnline ? (
        <Button onPress={handleConfirmSendStore} colorScheme="blue" isDisabled={falseInvoicesCount === 0}>
         {t('Confirm')}
        </Button>
      ) : (
        <Button onPress={handleConfirmSendStore} colorScheme="blue" isDisabled>
          {t('Confirm')}
        </Button>
      )}
    </>
  )}
</Button.Group>
                </Popover.Footer>
              </Popover.Content>
            </Popover>

            <Popover trigger={triggerProps => {
              return <Button {...triggerProps} colorScheme="red">{t('Delete All')}</Button>;
            }}>
              <Popover.Content accessibilityLabel="Delete Invoices" w="56">
                <Popover.Arrow />
                <Popover.CloseButton />
                <Popover.Header>{t('Delete All')}</Popover.Header>
                <Popover.Body>
                {t('This will remove all invoices. This action cannot be reversed. Deleted data cannot be recovered')}
                </Popover.Body>
                <Popover.Footer justifyContent="flex-end">
                  <Button.Group space={2}>
                    <Button onPress={handleDeleteAllInvoices} colorScheme="danger">{t('delete')}</Button>
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
            <Text style={styles.closeButtonText}>{t('close')}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredInvoices}
          renderItem={({ item, index }) => (
            <View style={styles.invoiceContainer}>
              <MaterialCommunityIcons
                name={item.online ? "checkbox-blank-circle" : "checkbox-blank-circle"}
                size={24}
                color={item.online ? "green" : "red"}
              />
              <Text style={styles.salesNoText}>{t('Sales No')} {item.salesNo}</Text>
              <TouchableOpacity style={styles.accessButton} onPress={() => handleInvoicePress(item)}>
                <Text style={styles.accessButtonText}>{item.date} </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteInvoice(index)}>
                <Ionicons name="trash-outline" size={24} color="red" />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={<Text style={{ textAlign: 'center', color: 'gray' }}>{t('No invoices available')}</Text>}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',

  },
  salesNoText: {
    fontWeight: 'bold'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical:10,
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
  deleteAllFalseContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  deleteAllFalseButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  deleteAllFalseButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ReportsScreen;
