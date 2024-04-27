import React, { useState,useEffect } from 'react';
import { Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Heading, NativeBaseProvider, VStack, Center, Button, Modal } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CampaignScreen = ({ allTotal, onDataReceived, ondiscountApplied, paymentSuccess,campaignCounter }) => {
    const [showModal, setShowModal] = useState(false);
    const [discountApplied, setDiscountApplied] = useState(false);


    useEffect(() => {
        if (campaignCounter > 0) {
            setDiscountApplied(false);
         
    
        }
        return () => {};
      }, [campaignCounter]);


    const canApplyDiscount = () => {
        if (allTotal === 0) {
            Alert.alert(
                "No Items",
                "There are no items in the list. Cannot apply discount.",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
            return false;
        }
        return true;
    };

    const applyDiscount = () => {
        if (!canApplyDiscount()) {
            return allTotal;
        }

        if (!discountApplied) {
            const discountedAllTotal = (allTotal * 0.8).toFixed(2);

            Alert.alert(
                "Success",
                "Discount applied successfully",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
            return discountedAllTotal;
        } else {
            Alert.alert(
                "Discount Already Applied",
                "The discount has already been applied to the order.",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
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
                    "Success",
                    "Discount applied successfully",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
                return discountedAllTotal;
            } else {
                Alert.alert(
                    "Discount Already Applied",
                    "The discount has already been applied to the order.",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
                return allTotal;
            }
        } else {
            Alert.alert(
                "No Discount Today",
                "Today is not Black Friday. The discount only available on Fridays",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
            return allTotal;
        }
    };

    const sendDataToParent = () => {
        if (paymentSuccess) {
            Alert.alert(
                "Payment Done",
                "Discounts cannot be applied after payment has been made.",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
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
                                <Heading>Campaigns</Heading>
                                <Heading size="sm">Choose the one that you want to use</Heading>

                                <TouchableOpacity onPress={() => sendDataToParent()}>
                                    <MaterialIcons name={"discount"} size={24} color={"red"} style={styles.inputIcon} />
                                    <Text>20% discount for all products </Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => blackFridayDiscount()}>
                                    <MaterialIcons name={"discount"} size={24} color={"green"} style={styles.inputIcon} />
                                    <Text>Black Friday %70 discount </Text>
                                </TouchableOpacity>

                            </VStack>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button.Group space={2}>
                                <Button onPress={() => { setDiscountApplied(true); setShowModal(false); }} variant="ghost" colorScheme="blueGray">
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
