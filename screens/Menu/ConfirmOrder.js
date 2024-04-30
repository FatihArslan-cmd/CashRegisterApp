import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet, Alert, Vibration } from 'react-native';
import { Heading, NativeBaseProvider, VStack, Center, Button, Modal } from 'native-base';
import { Entypo } from '@expo/vector-icons'; 
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import loadUserProfile from '../../functions/LoadUserProfile'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingIndicator from '../../functions/LoadingIndicator';
const ConfirmOrder = ({ subTotal, allTotal, paymentSuccess, getValueFromConfirmOrder }) => {
  const today = new Date();
  const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
  const hour = today.getHours() + 3;
  const minute = today.getMinutes();
  const second = today.getSeconds();
  const [orderData, setOrderData] = useState(null);

  const generateRandomSalesNo = () => {
    let salesNo = '';
    for (let i = 0; i < 6; i++) {
      salesNo += Math.floor(Math.random() * 10); 
    }
    return salesNo;
  };

  const [selectedPrinter, setSelectedPrinter] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [confirmedValue, setConfirmedValue] = useState(0);
  const [userProfile, setUserProfile] = useState(null); 
  const [storedData, setStoredData] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state for print operation

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
    const fetchData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('orderData');
        const data = jsonValue != null ? JSON.parse(jsonValue) : null;
        setStoredData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
        <p style="font-size: 24px; font-family: Courier New; font-weight: normal;">Sales no: ${generateRandomSalesNo()}</p>
        <div class="flex-row"> 
        ${userProfile ? `
          <p style="font-size: 24px; font-family: Courier New; font-weight: normal;">Payment Type:  <br/>  Cashier: ${userProfile.email}</p>
          ` : ''}
        </div>
      </div>
      <hr/>
      <h2 style="font-size: 24px; font-family: Courier New; font-weight: normal;">${
        storedData ? (
          storedData.productData.map((product, index) => (
            `<p key=${index}>${index + 1}- ${product.name} ${product.price}$ KDV ${product.kdv}%</p>`
          )).join('')
        ) : (
          '<p>No data available</p>'
        )}
      </h2>
      <hr/>
      <h2 style="font-size: 24px; font-family: Courier New; font-weight: normal;">Received Money<br/>Change:</h2>
      <hr/>
      <h2 style="font-size: 24px; font-family: Courier New; font-weight: normal;">Subtotal :${subTotal}$ <br/>AllTotal :${allTotal}$</h2>
      <hr/>
    </body>
    </html>
  `;

 
  const print = async () => {
    setLoading(true); 
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
      Alert.alert("No products!", "There are no products in the list. Please add products before confirming the order.");
      Vibration.vibrate();
    } else if (!paymentSuccess) {
      Alert.alert("Payment Not Completed", "Please complete the payment before confirming the order.");
      Vibration.vibrate();
    } else {
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
            <Text style={[styles.cancelButtonText]}>Confirm{"\n"}Order</Text>
          </View>
        </TouchableOpacity>

        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Invoice</Modal.Header>
            <Modal.Body>
              <VStack style={styles.modalContainer} space={4} alignItems="center">
                {loading ? ( 
                  <LoadingIndicator/>
                ) : (
                  <>
                    <Button onPress={print}>Print</Button>
                    <Button onPress={printToFile}>Share the Invoice file</Button>
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
                  Cancel
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
