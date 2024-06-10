// ActionsMenu.js
import React from 'react';
import { Box, Button, Popover, StyleSheet,NativeBaseProvider } from 'native-base';
import LoadingIndicator from '../../../components/LoadingIndicator';
import { useTranslation } from 'react-i18next';

const ActionsMenu = ({ isOnline, falseInvoicesCount, isLoading, handleConfirmSendStore, handleDeleteAllInvoices, t }) => {
  return (
    <NativeBaseProvider>
    <Box w="100%" alignItems="center" flexDirection="row" flexWrap="wrap" justifyContent="space-between">
      <Popover trigger={triggerProps => {
        return <Button {...triggerProps} colorScheme="blue">{t('Send Store')}</Button>;
      }}>
        <Popover.Content accessibilityLabel="Confirm" w="56">
          <Popover.Arrow />
          <Popover.CloseButton />
          <Popover.Header>{isOnline ? t('Send Orders') : t('Offline')}</Popover.Header>
          <Popover.Body>
            {isOnline ?
              (falseInvoicesCount === 0 ?
                t('No orders done when offline.') :
                `${falseInvoicesCount} ${t('Orders done when offline will be sent to the store. Do you Confirm?')}`
              ) :
              t('You are offline. Come back when you are online')
            }
          </Popover.Body>
          <Popover.Footer justifyContent="flex-end">
            <Button.Group space={2}>
              {isLoading ? (
                <LoadingIndicator />
              ) : (
                <>
                  {isOnline ? (
                    <Button onPress={handleConfirmSendStore} colorScheme="blue" isDisabled={falseInvoicesCount === 0}>
                      {t('Confirm')}
                    </Button>
                  ) : (
                    <Button onPress={handleConfirmSendStore} colorScheme="blue" isDisabled>
                      {t('Confirm')}
                    </Button>
                  )}
                </>
              )}
            </Button.Group>
          </Popover.Footer>
        </Popover.Content>
      </Popover>
      <Popover trigger={triggerProps => {
        return <Button {...triggerProps} colorScheme="red">{t('Delete All')}</Button>;
      }}>
        <Popover.Content accessibilityLabel="Delete Invoices" w="56">
          <Popover.Arrow />
          <Popover.CloseButton />
          <Popover.Header>{t('Delete All')}</Popover.Header>
          <Popover.Body>
            {t('This will remove all invoices. This action cannot be reversed. Deleted data cannot be recovered')}
          </Popover.Body>
          <Popover.Footer justifyContent="flex-end">
            <Button.Group space={2}>
              <Button onPress={handleDeleteAllInvoices} colorScheme="danger">{t('Delete')}</Button>
            </Button.Group>
          </Popover.Footer>
        </Popover.Content>
      </Popover>
    </Box>
    </NativeBaseProvider>
  );
};

export default ActionsMenu;
