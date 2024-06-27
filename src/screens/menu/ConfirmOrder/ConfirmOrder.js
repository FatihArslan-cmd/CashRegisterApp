import React, { useState, useEffect, useContext } from 'react';
import { Alert, Vibration,Share } from 'react-native';
import { NativeBaseProvider, Center } from 'native-base';
import * as Print from 'expo-print';
import loadUserProfile from '../../../components/LoadUserProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import OnlineStatusContext from '../../../context/OnlineStatusContext';
import { useTranslation } from 'react-i18next';
import { formatDateTime } from '../../../utils/helpers';
import getInvoiceHTML from './InvoiceTemplate';
import ConfirmButton from './ConfirmButton'; 
import InvoiceModal from './InvoiceModal'; 
import { ProductContext } from '../../../context/ProductContext';
const ConfirmOrder = () => {
  const today = new Date();
  const formattedDateTime = formatDateTime(today);
  const { 
    allTotal,
     SubTotal,
      paymentSuccess,
      change,
      inputValue,
      productData,
      paymentType
      } = useContext(ProductContext);
  const { isOnline } = useContext(OnlineStatusContext);
  const [selectedPrinter, setSelectedPrinter] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [salesNo, setSalesNo] = useState(0);
  const [everTotal, setEverTotal] = useState(0);

  const { t } = useTranslation();

//here datas are saved into local storage to be used in Collections Screen , Report screen

  useEffect(() => {
    const loadEverTotal = async () => {
      try {
        const savedEverTotal = await AsyncStorage.getItem('everTotal');
        if (savedEverTotal !== null) {
          setEverTotal(parseFloat(savedEverTotal));
        }
      } catch (error) {
        console.error('Error loading everTotal:', error);
      }
    };

    loadEverTotal();
  }, []);

  useEffect(() => {
    const saveEverTotal = async () => {
      try {
        await AsyncStorage.setItem('everTotal', everTotal.toString());
      } catch (error) {
        console.error('Error saving everTotal:', error);
      }
    };

    saveEverTotal();
  }, [everTotal]);

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
      const newSalesNo = salesNo + 1;
      setSalesNo(newSalesNo);
      AsyncStorage.setItem('salesNo', newSalesNo.toString());
    }
  }, [paymentSuccess]);

  const html = getInvoiceHTML({ formattedDateTime, salesNo, userProfile, productData, inputValue, change, SubTotal, allTotal, paymentType });

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
        online: isOnline,
        everTotal,
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
    setEverTotal(everTotal + allTotal)
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
    await shareFile(uri);
    setLoading(false);
  };

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync();
    setSelectedPrinter(printer);
  };

 //after printing we can share the invoice with friends
  
  const shareFile = async (uri) => {
    try {
      await Share.share({
        url: uri,
        title: 'Invoice',
        message: 'Please find the attached invoice.',
      });
    } catch (error) {
      console.error('Error sharing the file:', error);
    }
  };

  const confirmOrder = () => {
    if (allTotal === 0) {
      Alert.alert(t('No products'), t('There are no products in the list. Please add products before confirming the order.'));
      Vibration.vibrate();
    } else if (!paymentSuccess) {
      Alert.alert(t('Payment Not Completed'), t('Please complete the payment before confirming the order.'));
      Vibration.vibrate();
    } else {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <ConfirmButton onPress={confirmOrder} />
        <InvoiceModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          loading={loading}
          print={print}
          printToFile={printToFile}
          selectPrinter={selectPrinter}
          selectedPrinter={selectedPrinter}
          handleCloseModal={handleCloseModal}
        />
      </Center>
    </NativeBaseProvider>
  );
};

export default ConfirmOrder;
