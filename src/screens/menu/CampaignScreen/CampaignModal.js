import React from 'react';
import { StyleSheet } from 'react-native';
import { Modal, VStack, Button, HStack, Text, Pressable, Heading } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';

const CampaignModal = ({ isOpen, onClose, sendDataToParent, blackFridayDiscount }) => {
    const { t } = useTranslation();

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Body>
                    <VStack style={styles.modalContainer} space={4} alignItems="center">
                        <Heading>{t('Campaigns')}</Heading>
                        <Heading size="sm">{t('Choose the one that you want to use')}</Heading>
                        
                        <Pressable onPress={sendDataToParent} style={styles.pressable}>
                            <HStack space={2} alignItems="center">
                                <MaterialIcons name="discount" size={24} color="red" />
                                <Text>{t('20% discount for all products')}</Text>
                            </HStack>
                        </Pressable>
                        
                        <Pressable onPress={blackFridayDiscount} style={styles.pressable}>
                            <HStack space={2} alignItems="center">
                                <MaterialIcons name="discount" size={24} color="green" />
                                <Text>{t('Black Friday %70 discount')}</Text>
                            </HStack>
                        </Pressable>
                    </VStack>
                </Modal.Body>
                <Modal.Footer>
                    <Button.Group space={2}>
                        <Button onPress={onClose} variant="ghost" colorScheme="blueGray">
                            {t('Cancel')}
                        </Button>
                    </Button.Group>
                </Modal.Footer>
            </Modal.Content>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flexGrow: 1,
        backgroundColor: '#fff',
        paddingVertical: 20,
    },
    pressable: {
        width: '100%',
        paddingVertical: 10,
        justifyContent: 'center',
        paddingHorizontal:10
    },
});

export default CampaignModal;
