import React, { useState, useEffect } from 'react';
import { Modal, VStack, FormControl, Input, Button, NativeBaseProvider } from 'native-base';
import { Alert} from 'react-native'; // Import AsyncStorage
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Fatura button is basically pop up user enter the email 
//checks if it is a valid mail or not

const FaturaButton = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [eInvoiceCount, setEInvoiceCount] = useState(0); // State to hold e-invoice count
    const { t } = useTranslation();

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

    const saveEInvoiceCount = async (count) => {
        try {
            await AsyncStorage.setItem('eInvoiceCount', count.toString());
        } catch (error) {
            console.error('Error saving e-invoice count:', error);
        }
    };

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleEnter = () => {
        const isValid = validateEmail(email);
        setIsValidEmail(isValid);

        if (isValid) {
            setModalVisible(false);
            // Increment e-invoice count and save it to AsyncStorage
            const newCount = eInvoiceCount + 1;
            setEInvoiceCount(newCount);
            saveEInvoiceCount(newCount);
            // Show alert
            showAlert();
        }
    };

    const closeModal = () => {
        setModalVisible(false);
        setEmail('');
        setIsValidEmail(true);
    };

    const showAlert = () => {
        Alert.alert(t('Success'), t('Your invoice will be sent as soon as possible.'));
    };

    return (
        <NativeBaseProvider>
            <Modal isOpen={modalVisible} onClose={closeModal} avoidKeyboard justifyContent="center" bottom="4" size="lg">
                <Modal.Content>
                    <Modal.CloseButton />
                    <Modal.Header>{t('Enter Your E-mail')}</Modal.Header>
                    <Modal.Body>
                        {t('Enter email address and we ll send the bill to your e-mail.')}
                        <FormControl mt="3" isInvalid={!isValidEmail}>
                            <FormControl.Label>Email</FormControl.Label>
                            <Input onChangeText={(value) => setEmail(value)} />
                            {!isValidEmail && (
                                <FormControl.HelperText mt={1} mb={2} color="red.500">
                                    {t('Please enter a valid email.')}
                                </FormControl.HelperText>
                            )}
                        </FormControl>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button flex="1" onPress={handleEnter}>
                            {t('Proceed')}
                        </Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
            <VStack space={8} alignItems="center">
                <Button style={{ backgroundColor: '#bf7700', borderRadius: 15, marginTop: 20 }} onPress={() => setModalVisible(!modalVisible)}>
                    {t('E-Document')}
                </Button>
            </VStack>
        </NativeBaseProvider>
    );
};

export default FaturaButton;
