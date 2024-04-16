import React, { useState } from 'react';
import { Modal, VStack, FormControl, Input, Button, NativeBaseProvider, Alert } from 'native-base';

const FaturaButton = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [submitted, setSubmitted] = useState(false);

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleEnter = () => {
        const isValid = validateEmail(email);
        setIsValidEmail(isValid);

        if (isValid) {
            setModalVisible(false);

        }
    };

    const closeModal = () => {
        setModalVisible(false);
        setEmail('');
        setIsValidEmail(true);
    };

    return (
        <NativeBaseProvider>
            <Modal isOpen={modalVisible} onClose={closeModal} avoidKeyboard justifyContent="center" bottom="4" size="lg">
                <Modal.Content>
                    <Modal.CloseButton />
                    <Modal.Header>Enter Your E-mail</Modal.Header>
                    <Modal.Body>
                        Enter email address and we'll send the bill to your e-mail.
                        <FormControl mt="3" isInvalid={!isValidEmail}>
                            <FormControl.Label>Email</FormControl.Label>
                            <Input onChangeText={(value) => setEmail(value)} />
                            {!isValidEmail && (
                                <FormControl.HelperText mt={1} mb={2} color="red.500">
                                    Please enter a valid email.
                                </FormControl.HelperText>
                            )}
                        </FormControl>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button flex="1" onPress={handleEnter}>
                            Proceed
                        </Button>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
            <VStack space={8} alignItems="center">
                <Button w="104" onPress={() => setModalVisible(!modalVisible)}>
                    E-Fatura
                </Button>
               
            </VStack>
        </NativeBaseProvider>
    );
};

export default FaturaButton;
