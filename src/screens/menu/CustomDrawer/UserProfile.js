import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import InformationRow from './InformationRow';

const UserProfile = ({ isDarkMode, storeNo, cashRegisterNo, ipAddress, version, currentDate }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const username = await AsyncStorage.getItem('username');
        if (username) {
          const user = JSON.parse(await AsyncStorage.getItem(username));
          if (user && user.email) {
            setEmail(user.email);
          }
        }
      } catch (error) {
        console.error('Error fetching email:', error);
      }
    };

    fetchEmail();
  }, []);

  return (
    <View style={[styles.infoContainer, isDarkMode && styles.darkInfoContainer]}>
      <View style={{ paddingBottom: 10 }}>
        <InformationRow
          label={t('email')}
          value={email}
          iconName="mail"
          iconColor={isDarkMode ? 'white' : 'gray'}
          style={isDarkMode && styles.darkText}
        />
        <InformationRow
          label={t('Store No')}
          value={storeNo}
          iconName="shoppingcart"
          iconColor={isDarkMode ? 'white' : 'gray'}
          style={isDarkMode && styles.darkText}
        />
        <InformationRow
          label={t('Cash Register No')}
          value={cashRegisterNo}
          iconName="barcode"
          iconColor={isDarkMode ? 'white' : 'gray'}
          style={isDarkMode && styles.darkText}
        />
        <InformationRow
          label={t('Cash Register IP')}
          value={ipAddress}
          iconName="wifi"
          iconColor={isDarkMode ? 'white' : 'gray'}
          style={isDarkMode && styles.darkText}
        />
        <InformationRow
          label={t('Version')}
          value={version}
          iconName="info"
          iconColor={isDarkMode ? 'white' : 'gray'}
          style={isDarkMode && styles.darkText}
        />
        <InformationRow
          label={t('Date')}
          value={currentDate}
          iconName="calendar"
          iconColor={isDarkMode ? 'white' : 'gray'}
          style={isDarkMode && styles.darkText}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    flex: 1,
    marginTop: 5,
    paddingHorizontal: 16,
    borderStyle: 'solid',
    borderColor: 'lightgray',
    borderWidth: 1,
  },
  darkInfoContainer: {
    borderColor: '#333',
  },
  darkText: {
    color: 'white',
  },
});

export default UserProfile;
