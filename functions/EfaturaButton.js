import React, { useState } from 'react';
import { Modal, VStack, FormControl, Input, Button, NativeBaseProvider, } from 'native-base';
import { Alert } from 'react-native';
import { useTranslation } from 'react-i18next';

const FaturaButton = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);
    const { t } = useTranslation();

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleEnter = () => {
        const isValid = validateEmail(email);
        setIsValidEmail(isValid);

        if (isValid) {
            setModalVisible(false);
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
        Alert.alert(t('Success'),t('Your invoice will be sent as soon as possible.'));
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
                <Button style={{backgroundColor:'#bf7700',borderRadius:15,marginTop:20}} onPress={() => setModalVisible(!modalVisible)}>
                {t('E-Document')} 
                </Button>
              
            </VStack>
        </NativeBaseProvider>
    );
};

export default FaturaButton;
