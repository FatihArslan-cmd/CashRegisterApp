import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Animatable from 'react-native-animatable';
import CountUpAnimation from '../../components/AnimatedNumber';
import { ThemeContext } from '../../context/ThemeContext';
import { useTranslation } from 'react-i18next';
const CounterItem = ({ label, value, duration, interval, showDollarSign, backgroundColor, isDarkMode }) => (
  <View style={[styles.itemContainer, isDarkMode && styles.darkItemContainer, { backgroundColor: isDarkMode ? '#333' : backgroundColor }]}>
    <Text style={[styles.text, isDarkMode && styles.darkText]}>{label}</Text>
    <Animatable.View animation="pulse" iterationCount="infinite" style={styles.textBackground}>
      <CountUpAnimation targetNumber={value} duration={duration} interval={interval} style={styles.animation} showDollarSign={showDollarSign} />
    </Animatable.View>
  </View>
);

const CollectionsScreen = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const { t } = useTranslation();
  const [invoiceNumber, setInvoiceNumber] = useState(0);
  const [everTotal, setEverTotal] = useState(0);
  const [eInvoiceCount, setEInvoiceCount] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [campaignCounterdb, setCampaignCounterdb] = useState(0);

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

  return (
    <Animatable.View animation="fadeInUp" duration={1500} style={[styles.container, isDarkMode && styles.darkContainer]}>
      <CounterItem label={t('Order Number')} value={invoiceNumber} duration={2000} interval={1} showDollarSign={false} backgroundColor="rgba(0, 0, 255, 0.1)" isDarkMode={isDarkMode} />
      <CounterItem label={t('Earned')} value={everTotal} duration={100} interval={1} showDollarSign={true} backgroundColor="rgba(255, 0, 0, 0.1)" isDarkMode={isDarkMode} />
      <CounterItem label={t('Total Discount')} value={totalDiscount} duration={100} interval={1} showDollarSign={true} backgroundColor="rgba(0, 255, 0, 0.1)" isDarkMode={isDarkMode} />
      <CounterItem label={t('Campaigns Applied')} value={campaignCounterdb} duration={4500} interval={10} showDollarSign={false} backgroundColor="rgba(255, 255, 0, 0.1)" isDarkMode={isDarkMode} />
      <CounterItem label={t('Number of Users')} value={1} duration={4000} interval={1} showDollarSign={false} backgroundColor="rgba(255, 0, 255, 0.1)" isDarkMode={isDarkMode} />
      <CounterItem label={t('E-Document Number')} value={eInvoiceCount} duration={4000} interval={10} showDollarSign={false} backgroundColor="rgba(0, 255, 255, 0.1)" isDarkMode={isDarkMode} />
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  darkContainer: {
    backgroundColor: '#1E1E1E',
  },
  itemContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
  darkItemContainer: {
    backgroundColor: '#333',
    borderColor: '#444',
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
    borderRadius: 5,
  },
  darkText: {
    color: 'white',
  },
  animation: {
    marginTop: 5,
  },
});

export default CollectionsScreen;
