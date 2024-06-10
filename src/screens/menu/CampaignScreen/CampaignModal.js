import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Heading, Modal, VStack, Button } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';

const CampaignModal = ({ isOpen, onClose, sendDataToParent, blackFridayDiscount }) => {
    const { t } = useTranslation();

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <Modal.Content maxWidth="400px">
                <Modal.CloseButton />
                <Modal.Body>
                    <VStack style={styles.modalContainer} space={1} alignItems="center">
                        <Heading>{t('Campaigns')}</Heading>
                        <Heading size="sm">{t('Choose the one that you want to use')}</Heading>
                        
                        <TouchableOpacity onPress={sendDataToParent}>
                            <MaterialIcons name={"discount"} size={24} color={"red"} style={styles.inputIcon} />
                            <Text>{t('20% discount for all products')} </Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={blackFridayDiscount}>
                            <MaterialIcons name={"discount"} size={24} color={"green"} style={styles.inputIcon} />
                            <Text>{t('Black Friday %70 discount')}</Text>
                        </TouchableOpacity>
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
        height: 200,
    },
    inputIcon: {
        padding: 8,
    },
});

export default CampaignModal;
