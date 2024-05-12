import React, { useState, useEffect,useContext } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet, Alert, Vibration } from 'react-native';
import { Heading, NativeBaseProvider, VStack, Center, Button, Modal } from 'native-base';
import { Entypo } from '@expo/vector-icons'; 
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import loadUserProfile from '../../functions/LoadUserProfile'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingIndicator from '../../functions/LoadingIndicator';
import OnlineStatusContext from '../../context/OnlineStatusContext';
import { useTranslation } from 'react-i18next';

const ConfirmOrder = ({ subTotal, allTotal, paymentSuccess, getValueFromConfirmOrder, change, receivedAmount, productData, paymentType }) => {
  const today = new Date();
  const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
  const hour = today.getHours() + 3;
  const minute = today.getMinutes();
  const second = today.getSeconds();
  const { isOnline} = useContext(OnlineStatusContext);
  const [selectedPrinter, setSelectedPrinter] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [confirmedValue, setConfirmedValue] = useState(0);
  const [userProfile, setUserProfile] = useState(null); 
  const [loading, setLoading] = useState(false); // Loading state for print operation
  const [salesNo, setSalesNo] = useState(0); // Sales number state
  const { t } = useTranslation();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const profile = await loadUserProfile(); 
        setUserProfile(profile); 
      } catch (error) {
        console.error('Error loading user profile:', error);
      }
    };

    fetchUserProfile();
  }, []); 

  useEffect(() => {
    const loadSalesNo = async () => {
      try {
        const savedSalesNo = await AsyncStorage.getItem('salesNo');
        if (savedSalesNo !== null) {
          setSalesNo(parseInt(savedSalesNo)); 
        }
      } catch (error) {
        console.error('Error loading sales number:', error);
      }
    };
  
    loadSalesNo();
  }, []);

  useEffect(() => {
    if (paymentSuccess) {
      // Increment sales number and save it to AsyncStorage
      const newSalesNo = salesNo + 1;
      setSalesNo(newSalesNo);
      AsyncStorage.setItem('salesNo', newSalesNo.toString());
    }
  }, [paymentSuccess]);

  const html = `
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
      <style>
        .flex-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .flex-row {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      </style>
    </head>
    <body>
      <h2 style="font-size: 24px; font-family: Courier New; font-weight: normal;">Date:${formattedDate} | ${hour}:${minute}:${second}</h2>
      <div class="flex-container">
        <h2 style="font-size: 50px; font-family: Courier New; font-weight: bold;">32Bit</h2>
        <p style="font-size: 24px; font-family: Courier New; font-weight: normal;">Kemalpaşa, Esentepe Kampüsü, Üniversite Cd., 54050 Serdivan/Sakarya</p>
        <p style="font-size: 24px; font-family: Courier New; font-weight: normal;">Sales no: ${salesNo}</p>
        <div class="flex-row"> 
        ${userProfile ? `
          <p style="font-size: 24px; font-family: Courier New; font-weight: normal;">Payment Type: ${paymentType}  <br/>  Cashier: ${userProfile.email}</p>
          ` : ''}
        </div>
      </div>
      <hr/>
      <h2 style="font-size: 24px; font-family: Courier New; font-weight: normal;">
      
      ${productData.map(product => `
      <p>${product.name}: ${product.price}$ | KDV :${product.kdv}% | 1 PCS  </p>
    `).join('')}
         
      </h2>
      <hr/>
      <h2 style="font-size: 24px; font-family: Courier New; font-weight: normal;">Received Money :${receivedAmount}$ <br/>Change :${change}$</h2>
      <hr/>
      <h2 style="font-size: 24px; font-family: Courier New; font-weight: normal;">Subtotal :${subTotal}$ <br/>AllTotal :${allTotal}$</h2>
      <hr/>
      
    </body>
    </html>
  `;
  const saveInvoiceHTML = async (html) => {
    try {
      const invoices = await AsyncStorage.getItem('invoices');
      let invoicesArray = [];
  
      if (invoices !== null) {
        invoicesArray = JSON.parse(invoices);
      }
  
    
      const existingInvoice = invoicesArray.find(invoice => invoice.salesNo === salesNo);
      if (existingInvoice) {
        return;
      }
  
      const invoiceWithDate = {
        salesNo,
        html,
        date: new Date().toLocaleString(),
  
        online: isOnline 
      };
  
      invoicesArray.push(invoiceWithDate);
      await AsyncStorage.setItem('invoices', JSON.stringify(invoicesArray));
  
      console.log(`Invoice saved ${isOnline ? 'online' : 'offline'} successfully.`);
    } catch (error) {
      console.error('Error saving invoice:', error);
    }
  };
  
  
 
  
  const print = async () => {
    setLoading(true); 
    await saveInvoiceHTML(html); 
    await Print.printAsync({
      html,
      printerUrl: selectedPrinter?.url,
    });
  
    setLoading(false); 
  };
  
  const printToFile = async () => {
    setLoading(true); 
    const { uri } = await Print.printToFileAsync({ html });
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    setLoading(false); 
  };

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync();
    setSelectedPrinter(printer);
  };

  const confirmOrder = () => {
    if (allTotal === 0) {
      Alert.alert(t('No products'),t('There are no products in the list. Please add products before confirming the order.'));
      Vibration.vibrate();
    } else if (!paymentSuccess) {
      Alert.alert(t('Payment Not Completed'), t('Please complete the payment before confirming the order.'));
      Vibration.vibrate();
    } else {
      // Update sales number on successful payment
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    // Increment confirmed value when modal is closed
    setConfirmedValue(confirmedValue + 1);
    getValueFromConfirmOrder(); // Call the function without increment operator
    setShowModal(false);
  };

  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <TouchableOpacity onPress={() => confirmOrder()} style={styles.confirmButton}>
          <View style={{ flexDirection: 'row' }}>
            <Entypo name="check" size={36} color="white" style={styles.inputIcon} />
            <Text style={[styles.cancelButtonText]}>{t('Confirm')}{"\n"}{t('Order')}</Text>
          </View>
        </TouchableOpacity>

        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>{t('Invoice')}</Modal.Header>
            <Modal.Body>
              <VStack style={styles.modalContainer} space={4} alignItems="center">
                {loading ? ( 
                  <LoadingIndicator/>
                ) : (
                  <>
                    <Button onPress={print}>{t('Print')}</Button>
                    <Button onPress={printToFile}>{t('Share the Invoice file')}</Button>
                    {Platform.OS === 'ios' && (
                      <>
                        <Button title="Select printer" onPress={selectPrinter} />
                        {selectedPrinter ? (
                          <Text style={styles.printer}>{`Selected printer: ${selectedPrinter.name}`}</Text>
                        ) : null}
                      </>
                    )}
                  </>
                )}
              </VStack>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button onPress={() => handleCloseModal()} variant="ghost" colorScheme="blueGray">
                  {t('Cancel')}
                </Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </Center>
    </NativeBaseProvider>
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
  printer: {
    textAlign: 'center',
  },
});

export default ConfirmOrder;
