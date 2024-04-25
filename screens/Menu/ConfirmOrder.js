import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import { Heading, NativeBaseProvider, VStack, Center, Button, Modal } from 'native-base';
import { Entypo } from '@expo/vector-icons'; // Expo'dan Entypo ikonunu içe aktar

import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

const ConfirmOrder = ({ subTotal }) => {
  // Tarih bilgisini al
  const today = new Date();
  const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;
  const hour = today.getHours() + 3;
  const minute = today.getMinutes();
  const second = today.getSeconds();

  // Rasgele 6 basamaklı satış numarası üretme fonksiyonu
  const generateRandomSalesNo = () => {
    let salesNo = '';
    for (let i = 0; i < 6; i++) {
      salesNo += Math.floor(Math.random() * 10); // 0 ile 9 arasında rastgele rakam ekle
    }
    return salesNo;
  };

  const [selectedPrinter, setSelectedPrinter] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
          <p style="font-size: 24px; font-family: Courier New; font-weight: normal;">Payment Type:   |   Cashier:</p>
        </div>
      </div>
      <hr/>
      <h2 style="font-size: 24px; font-family: Courier New; font-weight: normal;">Products</h2>
      <hr/>
      <h2 style="font-size: 24px; font-family: Courier New; font-weight: normal;">Received money Chnage</h2>
      <hr/>
      <h2 style="font-size: 24px; font-family: Courier New; font-weight: normal;">Subtotal :${subTotal}all total</h2>
    </body>
    </html>
  `;

  const print = async () => {
    await Print.printAsync({
      html,
      printerUrl: selectedPrinter?.url,
    });
  };

  const printToFile = async () => {
    const { uri } = await Print.printToFileAsync({ html });
    console.log('File has been saved to:', uri);
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  };

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync();
    setSelectedPrinter(printer);
  };

  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <TouchableOpacity onPress={() => setShowModal(true)} style={styles.confirmButton}>
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
              </VStack>
            </Modal.Body>
            <Modal.Footer>
              <Button.Group space={2}>
                <Button onPress={() => setShowModal(false)} variant="ghost" colorScheme="blueGray">
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
