import React, { useState, useContext } from 'react';
import { View, Text, TextInput, StyleSheet, Alert,TouchableOpacity } from 'react-native';
import WebView from 'react-native-webview';
import { ThemeContext } from '../../../context/ThemeContext';
import useAsyncStorage from '../../../hooks/useAsyncStorage';
import { useTranslation } from 'react-i18next';
import OnlineStatusContext from '../../../context/OnlineStatusContext';
import InvoiceList from './InvoiceList';
import ActionsMenu from './ActionsMenu';

const ReportsScreen = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const { isOnline } = useContext(OnlineStatusContext);
  const [invoices, setInvoices] = useAsyncStorage('invoices', []);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const sendRequestToStore = async () => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({ success: true });
      }, 2000);

      setTimeout(async () => {
        if (invoices.length > 0) {
          const updatedInvoices = invoices.map(invoice => {
            if (!invoice.online) {
              return { ...invoice, online: true };
            }
            return invoice;
          });
          await setInvoices(updatedInvoices);
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
        await setInvoices(updatedInvoices);
      }
    } catch (error) {
      console.error('Error confirming send store:', error);
    } finally {
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
      await setInvoices(updatedInvoices);
    } catch (error) {
      console.error('Error deleting invoice:', error);
    }
  };

  const handleDeleteAllInvoices = async () => {
    if (invoices.length === 0) {
      handleDeleteAllAlert();
    } else {
      try {
        await setInvoices([]);
      } catch (error) {
        console.error('Error deleting all invoices:', error);
      }
    }
  };

  const handleDeleteAllAlert = () => {
    Alert.alert(
      t('No Invoices'),
      t('There are no invoices to delete.'),
      [{ text: 'OK' }],
      { cancelable: false }
    );
  };

  const filteredInvoices = invoices.filter(invoice => invoice.salesNo.toString().includes(searchTerm));
  const falseInvoicesCount = invoices.filter(invoice => !invoice.online).length;

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Text style={[styles.title, isDarkMode && styles.darkText]}>{t('Reports')}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.searchBar, isDarkMode && styles.darkInput]}
          placeholder={t('Search by sales number')}
          placeholderTextColor={isDarkMode ? '#ccc' : '#999'}
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <ActionsMenu
          isOnline={isOnline}
          falseInvoicesCount={falseInvoicesCount}
          isLoading={isLoading}
          handleConfirmSendStore={handleConfirmSendStore}
          handleDeleteAllInvoices={handleDeleteAllInvoices}
          t={t}
        />
      </View>
      {selectedInvoice ? (
        <View style={styles.webViewContainer}>
          <WebView
            originWhitelist={['*']}
            source={{ html: selectedInvoice.html }}
            style={{ flex: 1 }}
          />
          <TouchableOpacity style={styles.closeButton} onPress={handleCloseWebView}>
            <Text style={styles.closeButtonText}>{t('Close')} </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <InvoiceList
          invoices={filteredInvoices}
          isDarkMode={isDarkMode}
          handleInvoicePress={handleInvoicePress}
          handleDeleteInvoice={handleDeleteInvoice}
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
  darkText:{
    color:'white'
  },
  darkContainer: {
    backgroundColor: '#1E1E1E',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
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
  searchBar: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    color: 'black',
    backgroundColor: 'white',
  },
  darkInput: {
    color: 'white',
    backgroundColor: '#333',
    borderColor: '#555',
  },
  webViewContainer: {
    flex: 1,
  },
});

export default ReportsScreen;
