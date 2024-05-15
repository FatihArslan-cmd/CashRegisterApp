import React, { useState,useEffect } from 'react';
import { Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Heading, NativeBaseProvider, VStack, Center, Button, Modal } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

const CampaignScreen = ({ allTotal, onDataReceived, ondiscountApplied, paymentSuccess,campaignCounter }) => {
    const [showModal, setShowModal] = useState(false);
    const [discountApplied, setDiscountApplied] = useState(false);
    const [campaignCounterdb, setCampaignCounterdb] = useState(0); // State to hold campaign counter

    const { t } = useTranslation();

    useEffect(() => {
        if (campaignCounter > 0) {
            setDiscountApplied(false);
    
        }
        return () => {};
      }, [campaignCounter]);


    const canApplyDiscount = () => {
        if (allTotal === 0) {
            Alert.alert(
                t('No Items'),
                t('There are no items in the list. Cannot apply discount.'),
                [
                    { text: "OK"}
                ]
            );
            return false;
        }
        return true;
    };
    const saveDiscountAmount = async (amount) => {
        try {
            let discountAmounts = await AsyncStorage.getItem('discountAmounts');
            
            if (!discountAmounts) {
                discountAmounts = [];
            } else {
                discountAmounts = JSON.parse(discountAmounts);
            }
            discountAmounts.push(amount);
            await AsyncStorage.setItem('discountAmounts', JSON.stringify(discountAmounts));
         
        } catch (error) {
            console.error('Error saving discount amount: ', error);
        }
    };
    const updateCampaignCounter = async () => {
        try {
            let campaignCounterdbb = await AsyncStorage.getItem('campaignCounterdb');
            campaignCounterdbb = parseInt(campaignCounterdbb || 0) + 1; // Increment the counter
            await AsyncStorage.setItem('campaignCounterdb', JSON.stringify(campaignCounterdbb));
            setCampaignCounterdb(campaignCounterdbb);
        } catch (error) {
            console.error('Error updating campaign counter: ', error);
        }
    };
    
    const applyDiscount = () => {
        if (!canApplyDiscount()) {
            return allTotal;
        }
    
        if (!discountApplied) {
            const discountedAllTotal = (allTotal * 0.8).toFixed(2);
            saveDiscountAmount(allTotal - discountedAllTotal); // Save the discount amount
            Alert.alert(
                t('Success'),
                t('Discount applied successfully'),
                [
                    { text: "OK"}
                ]
            );
            updateCampaignCounter(); // Call the function to update the counter
            return discountedAllTotal;
        } else {
            Alert.alert(
            t('Discount Already Applied'),
            t('The discount has already been applied to the order.'),
                [
                    { text: "OK" }
                ]
            );
            return allTotal;
        }
    };

    const getDayOfWeek = () => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const today = new Date().getDay();
        return days[today];
    };

    const blackFridayDiscount = () => {
        if (!canApplyDiscount()) {
            return allTotal;
        }

        const dayOfWeek = getDayOfWeek();
        console.log(dayOfWeek)
        if (dayOfWeek === 'Friday') {
            if (!discountApplied) {
                const discountedAllTotal = (allTotal * 0.3).toFixed(2);

                Alert.alert(
                    t('Success'),
                    t('Discount applied successfully'),
                    [
                        { text: "OK"}
                    ]
                );
                return discountedAllTotal;
            } else {
                Alert.alert(
                t('Discount Already Applied'),
                t('The discount has already been applied to the order.'),
                    [
                        { text: "OK"}
                    ]
                );
                return allTotal;
            }
        } else {
            Alert.alert(
                t('No Discount Today'),
                t('Today is not Black Friday. The discount only available on Fridays'),
                [
                    { text: "OK"}
                ]
            );
            return allTotal;
        }
    };

    const sendDataToParent = () => {
        if (paymentSuccess) {
            Alert.alert(
                t('Payment Done'),
                t('Discounts cannot be applied after payment has been made.'),
                [
                    { text: "OK"}
                ]
            );
            return;
        }
        if (!canApplyDiscount()) {
            return;
        }
        const updatedAllTotal = applyDiscount();
        onDataReceived(updatedAllTotal);
        ondiscountApplied(false);
    };

    return (
        <NativeBaseProvider>
            <Center>
                <TouchableOpacity style={styles.CampaignsButton} onPress={() => setShowModal(true)}>
                    <MaterialIcons style={{ padding: 8 }} name={"campaign"} size={32} color={"white"} />
                </TouchableOpacity>
                <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                    <Modal.Content maxWidth="400px">
                        <Modal.CloseButton />
                        <Modal.Body>
                            <VStack style={styles.modalContainer} space={1} alignItems="center">
                                <Heading>{t('Campaigns')}</Heading>
                                <Heading size="sm">{t('Choose the one that you want to use')}</Heading>
                                
                                <TouchableOpacity onPress={() => sendDataToParent()}>
                                    <MaterialIcons name={"discount"} size={24} color={"red"} style={styles.inputIcon} />
                                    <Text>{t('20% discount for all products')} </Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity onPress={() => blackFridayDiscount()}>
                                    <MaterialIcons name={"discount"} size={24} color={"green"} style={styles.inputIcon} />
                                    <Text>{t('Black Friday %70 discount')}</Text>
                                </TouchableOpacity>

                            </VStack>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button.Group space={2}>
                                <Button onPress={() => { setDiscountApplied(true); setShowModal(false); }} variant="ghost" colorScheme="blueGray">
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
    modalContainer: {
        flexGrow: 1,
        backgroundColor: '#fff',
        height: 200,
    },
    CampaignsButton: {
        backgroundColor: '#3e66ae',
        borderRadius: 10,
        justifyContent: 'center',
    },
    enterButton: {
        padding: 15,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    closeButton: {
        backgroundColor: '#3e66ae',
        marginTop: 10,
        padding: 10,
        borderRadius: 20,
    },
    closeButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default CampaignScreen;
