import { useState,useEffect } from 'react';
import React from 'react';
import { Text,View } from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
const CollectionsScreen = () => {
    const [invoiceNumber, setInvoiceNumber] = useState(0);
    const [everTotal, setEverTotal] = useState(0);
    const [eInvoiceCount, setEInvoiceCount] = useState(0); // State to hold e-invoice count
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [campaignCounterdb, setCampaignCounterdb] = useState(0); // State to hold campaign counter

    useEffect(() => {
        const fetchCampaignCounter = async () => {
            try {
                const storedCampaignCounter = await AsyncStorage.getItem('campaignCounterdb');
                if (storedCampaignCounter !== null) {
                    setCampaignCounterdb(parseInt(storedCampaignCounter));
                }
            } catch (error) {
                console.error('Error fetching campaign counter:', error);
            }
        };

        fetchCampaignCounter();
    }, []);
    useEffect(() => {
        const fetchTotalDiscount = async () => {
            try {
                const discountAmounts = await AsyncStorage.getItem('discountAmounts');
                if (discountAmounts) {
                    const parsedDiscountAmounts = JSON.parse(discountAmounts);
                    const totalDiscount = parsedDiscountAmounts.reduce((acc, curr) => acc + curr, 0);
                    setTotalDiscount(parseFloat(totalDiscount).toFixed(2)); // Format totalDiscount to show 2 decimal places
                }
            } catch (error) {
                console.error('Error fetching total discount: ', error);
            }
        };

        fetchTotalDiscount();
    }, []);
    useEffect(() => {
      const loadEverTotal = async () => {
        try {
          const savedEverTotal = await AsyncStorage.getItem('everTotal');
          if (savedEverTotal !== null) {
            setEverTotal(savedEverTotal);
          }
        } catch (error) {
          console.error('Error loading everTotal:', error);
        }
      };
  
      loadEverTotal();
    }, []);
    useEffect(() => {
        // Retrieve e-invoice count from AsyncStorage when component mounts
        retrieveEInvoiceCount();
    }, []);

    const retrieveEInvoiceCount = async () => {
        try {
            const value = await AsyncStorage.getItem('eInvoiceCount');
            if (value !== null) {
                setEInvoiceCount(parseInt(value));
            }
        } catch (error) {
            console.error('Error retrieving e-invoice count:', error);
        }
    };

    useEffect(() => {
        const loadSalesNo = async () => {
          try {
            const savedSalesNo = await AsyncStorage.getItem('salesNo');
            if (savedSalesNo !== null) {
                setInvoiceNumber(parseInt(savedSalesNo)); 
            }
          } catch (error) {
            console.error('Error loading sales number:', error);
          }
        };
      
        loadSalesNo();
      }, []);
  return (
    <View>
   <Text style={{textAlign:"center"}}>Invoice Number: {invoiceNumber}</Text>
   <Text style={{textAlign:"center"}}>Earned: {everTotal}</Text>
   <Text style={{textAlign:"center"}}>Kayıtlı kullanıcı : 1</Text>
   <Text style={{textAlign:"center"}}>Edocument : {eInvoiceCount}</Text>
     <Text style={{textAlign:"center"}}>Total Discount: {totalDiscount} </Text>
     <Text style={{ textAlign: "center" }}>Campaign Counter: {campaignCounterdb}</Text>

   </View>
  );
};



export default CollectionsScreen;
