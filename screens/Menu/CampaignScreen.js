import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Heading, NativeBaseProvider, VStack, Center, Button, Modal } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CampaignScreen = ({ subTotal, onDataReceived,ondiscountApplied }) => {
    const [showModal, setShowModal] = useState(false);
    const [discountApplied, setDiscountApplied] = useState(false);
  

    const applyDiscount = () => {
        if (subTotal === 0) {
            Alert.alert(
                "No Items",
                "There are no items in the list. Cannot apply discount.",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
            return;
        }
        else{
        if (!discountApplied) {
            const discountedSubTotal = (subTotal * 0.8).toFixed(2);
            
            Alert.alert(
                "Success",
                "Discount applied successfully",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
            return discountedSubTotal;
        } else {
            Alert.alert(
                "Discount Already Applied",
                "The discount has already been applied to the order.",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
            return subTotal;
        }
    }
    };

    const getDayOfWeek = () => {
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const today = new Date().getDay();
        return days[today];
    };

    const blackFridayDiscount = () => {
        if (subTotal === 0) {
            Alert.alert(
                "No Items",
                "There are no items in the list. Cannot apply discount.",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
            return;
        }
        else{
        const dayOfWeek = getDayOfWeek();
        console.log(dayOfWeek)
        if (dayOfWeek === 'Friday') {
            if (!discountApplied) {
                const discountedSubTotal = (subTotal * 0.3).toFixed(2);
    
                Alert.alert(
                    "Success",
                    "Discount applied successfully",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
                return discountedSubTotal;
            } else {
                Alert.alert(
                    "Discount Already Applied",
                    "The discount has already been applied to the order.",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
                return subTotal;
            }
        } else {
            Alert.alert(
                "No Discount Today",
                "Today is not Black Friday. The discount only available on fridays",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
            return subTotal;
        }
    }
    };

   const sendDataToParent = () => {
   

    const updatedSubTotal = applyDiscount();
    onDataReceived(updatedSubTotal);
    ondiscountApplied(false);
};

    
    return (
        <NativeBaseProvider>
            <Animatable.View
                animation="fadeInUp"
                delay={500}
                useNativeDriver
            >
                <Center>
                    <TouchableOpacity style={styles.CampaignsButton} onPress={() => setShowModal(true)}>
                    <MaterialIcons style={{padding:8}} name={"campaign"} size={32} color={"white"} />
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
                                        <Text>20% discount for all products</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity onPress={() => blackFridayDiscount()}>
                                        <MaterialIcons name={"discount"} size={24} color={"green"} style={styles.inputIcon} />
                                        <Text>Black Friday %70 discount</Text>
                                    </TouchableOpacity>

                                </VStack>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button.Group space={2}>
                                    <Button  onPress={() => setDiscountApplied(true)} variant="ghost" colorScheme="blueGray" onPress={() => { setShowModal(false); }}>
                                        Cancel
                                    </Button>
                                </Button.Group>
                            </Modal.Footer>
                        </Modal.Content>
                    </Modal>
                </Center>
            </Animatable.View>
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