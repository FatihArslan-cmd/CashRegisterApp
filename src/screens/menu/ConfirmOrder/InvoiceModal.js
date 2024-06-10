import React from 'react';
import { Platform, StyleSheet, Text } from 'react-native';
import { Modal, VStack, Button } from 'native-base';
import LoadingIndicator from '../../../components/LoadingIndicator';
import { useTranslation } from 'react-i18next';

const InvoiceModal = ({ isOpen, onClose, loading, print, printToFile, selectPrinter, selectedPrinter, handleCloseModal }) => {
  const { t } = useTranslation();

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header>{t('Invoice')}</Modal.Header>
        <Modal.Body>
          <VStack style={styles.modalContainer} space={4} alignItems="center">
            {loading ? (
              <LoadingIndicator />
            ) : (
              <>
                <Button onPress={print}>{t('Print')}</Button>
                <Button onPress={printToFile}>{t('Share the Invoice file')}</Button>
                {Platform.OS === 'ios' && (
                  <>
                    <Button title="Select printer" onPress={selectPrinter} />
                    {selectedPrinter ? (
                      <Text style={styles.printer}>{`Selected printer: ${selectedPrinter.name}`}</Text>
                    ) : null}
                  </>
                )}
              </>
            )}
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button onPress={handleCloseModal} variant="ghost" colorScheme="blueGray">
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
    padding: 20,
  },
  printer: {
    textAlign: 'center',
  },
});

export default InvoiceModal;
