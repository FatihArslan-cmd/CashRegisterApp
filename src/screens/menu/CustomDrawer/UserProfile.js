import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import InformationRow from './InformationRow';

const UserProfile = ({ isDarkMode, storeNo, cashRegisterNo, ipAddress, version, currentDate }) => {
  const { t } = useTranslation();
  const [userProfile, setUserProfile] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        let storedUsername = await AsyncStorage.getItem('username');
        if (!storedUsername) {
          storedUsername = 'test';
          await AsyncStorage.setItem('username', storedUsername);
          const testProfile = { email: 'test@test.com' };
          await AsyncStorage.setItem(storedUsername, JSON.stringify(testProfile));
        }
        setUsername(storedUsername);
        const userProfileJSON = await AsyncStorage.getItem(storedUsername);
        if (userProfileJSON) {
          const userProfile = JSON.parse(userProfileJSON);
          setUserProfile(userProfile);
        } else {
          throw new Error('User profile not found');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <View style={[styles.infoContainer, isDarkMode && styles.darkInfoContainer]}>
      <View style={{ paddingBottom: 10 }}>
        <View>
          <InformationRow
            label={t('email')}
            value={userProfile ? userProfile.email : ''}
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
