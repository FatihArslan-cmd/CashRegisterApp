import React, { useState, useEffect, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import { ThemeContext } from '../../../context/ThemeContext';
import { useTranslation } from 'react-i18next';
import CounterItem from './CounterItem';

const CollectionsScreen = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const { t } = useTranslation();
  const [invoiceNumber, setInvoiceNumber] = useState(0);
  const [everTotal, setEverTotal] = useState(0);
  const [eInvoiceCount, setEInvoiceCount] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [campaignCounterdb, setCampaignCounterdb] = useState(0);

   //here we get the things which have been saved in ConfirmOrder into local storage


  useEffect(() => {
    const fetchData = async () => {
      try {
        const savedInvoiceNumber = await AsyncStorage.getItem('salesNo');
        if (savedInvoiceNumber !== null) {
          setInvoiceNumber(parseInt(savedInvoiceNumber));
        }

        const savedEverTotal = await AsyncStorage.getItem('everTotal');
        if (savedEverTotal !== null) {
          setEverTotal(parseFloat(savedEverTotal).toFixed(2));
        }

        const savedEInvoiceCount = await AsyncStorage.getItem('eInvoiceCount');
        if (savedEInvoiceCount !== null) {
          setEInvoiceCount(parseInt(savedEInvoiceCount));
        }

        const discountAmounts = await AsyncStorage.getItem('discountAmounts');
        if (discountAmounts) {
          const parsedDiscountAmounts = JSON.parse(discountAmounts);
          const totalDiscount = parsedDiscountAmounts.reduce((acc, curr) => acc + curr, 0);
          setTotalDiscount(parseFloat(totalDiscount).toFixed(2));
        }

        const storedCampaignCounter = await AsyncStorage.getItem('campaignCounterdb');
        if (storedCampaignCounter !== null) {
          setCampaignCounterdb(parseInt(storedCampaignCounter));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const styles = isDarkMode ? darkStyles : lightStyles;

  return (
    <Animatable.View animation="fadeInUp" duration={1500} style={styles.container}>
      <CounterItem
        label={t('Order Number')}
        value={invoiceNumber}
        duration={2000}
        interval={1}
        showDollarSign={false}
        backgroundColor="rgba(0, 0, 255, 0.1)"
        isDarkMode={isDarkMode}
      />
      <CounterItem
        label={t('Earned')}
        value={everTotal}
        duration={100}
        interval={1}
        showDollarSign={true}
        backgroundColor="rgba(255, 0, 0, 0.1)"
        isDarkMode={isDarkMode}
      />
      <CounterItem
        label={t('Total Discount')}
        value={totalDiscount}
        duration={100}
        interval={1}
        showDollarSign={true}
        backgroundColor="rgba(0, 255, 0, 0.1)"
        isDarkMode={isDarkMode}
      />
      <CounterItem
        label={t('Campaigns Applied')}
        value={campaignCounterdb}
        duration={4500}
        interval={10}
        showDollarSign={false}
        backgroundColor="rgba(255, 255, 0, 0.1)"
        isDarkMode={isDarkMode}
      />
      <CounterItem
        label={t('Number of Users')}
        value={1}
        duration={4000}
        interval={1}
        showDollarSign={false}
        backgroundColor="rgba(255, 0, 255, 0.1)"
        isDarkMode={isDarkMode}
      />
      <CounterItem
        label={t('E-Document Number')}
        value={eInvoiceCount}
        duration={4000}
        interval={10}
        showDollarSign={false}
        backgroundColor="rgba(0, 255, 255, 0.1)"
        isDarkMode={isDarkMode}
      />
    </Animatable.View>
  );
};

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
  },
});

export default CollectionsScreen;
