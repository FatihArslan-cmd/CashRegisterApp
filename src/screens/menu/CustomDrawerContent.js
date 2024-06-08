import React, { useState, useCallback, useContext } from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getAppVersion from '../../components/getAppVersion';
import GetIP from '../../components/GetIp';
import OnlineStatusInformer from '../../components/OnlineStatusInformer';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/native';
import { ThemeContext } from '../../context/ThemeContext';
import { formatDateTime } from '../../utils/helpers';  

const InformationRow = ({ label, value, iconName, iconColor, style }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
    {iconName && <AntDesign name={iconName} size={20} color={iconColor} />}
    <Text style={{ marginLeft: iconName ? 10 : 0, fontWeight: 'bold', ...style }}>{label}: {value}</Text>
  </View>
);

const CustomDrawerContent = ({ navigation }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const { t } = useTranslation();
  const [userProfile, setUserProfile] = useState(null);
  const [username, setUsername] = useState('');

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
      Alert.alert(t('Error'), 'An error occurred while fetching user profile');
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserProfile();
    }, [])
  );

  const today = new Date();
  const currentDate = formatDateTime(today); 
  
  const storeNo = '1';
  const cashRegisterNo = '38462';
  const ipAddress = GetIP();
  const version = getAppVersion();

  const handleLeaveAccount = () => {
    Alert.alert(
      t('Are you sure?'),
      t('Are you sure you want to leave your account?'),
      [
        {
          text: t('Yes'),
          onPress: () => {
            navigation.navigate('Home');
          },
        },
        {
          text: t('No'),
          onPress: () => console.log('Account stayed'),
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <DrawerContentScrollView style={isDarkMode ? styles.darkScrollView : styles.scrollView}>
      <OnlineStatusInformer />
      <View style={{ alignItems: 'center' }}>
        <AntDesign name="user" size={72} color={isDarkMode ? 'white' : 'gray'} />
      </View>

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

      <View style={isDarkMode ? styles.darkDrawerSection : styles.drawerSection}>
        <DrawerItem
          label={t('Menu')}
          icon={({ color, size }) => <AntDesign name="menu-fold" size={size} color={isDarkMode ? 'white' : color} />}
          labelStyle={isDarkMode && styles.darkText}
          onPress={() => navigation.navigate(t('Menu'))}
        />
        <DrawerItem
          label={t('Settings')}
          icon={({ color, size }) => <AntDesign name="setting" size={size} color={isDarkMode ? 'white' : color} />}
          labelStyle={isDarkMode && styles.darkText}
          onPress={() => navigation.navigate(t('Settings'))}
        />
      </View>

      <View style={[styles.leaveAccountContainer, isDarkMode && styles.darkLeaveAccountContainer]}>
        <TouchableOpacity onPress={handleLeaveAccount} style={styles.leaveAccountButton}>
          <AntDesign name="back" size={36} color="red" />
          <Text style={[styles.leaveAccountText, isDarkMode && styles.darkLeaveAccountText]}>{t('Leave the Account')}</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'white',
  },
  darkScrollView: {
    backgroundColor: '#1E1E1E',
  },
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
  drawerSection: {
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  darkDrawerSection: {
    borderColor: '#333',
  },
  leaveAccountContainer: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'lightcoral',
  },
  darkLeaveAccountContainer: {
    borderColor: 'darkred',
  },
  leaveAccountButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leaveAccountText: {
    color: 'red',
    fontWeight: 'bold',
  },
  darkLeaveAccountText: {
    color: 'darkred',
  },
  darkText: {
    color: 'white',
  },
});

export default CustomDrawerContent;
