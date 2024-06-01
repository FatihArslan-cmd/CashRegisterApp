import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import getAppVersion from '../functions/getAppVersion';
import GetIP from '../functions/GetIp';
import OnlineStatusInformer from '../functions/OnlineStatusInformer';
import { useTranslation } from 'react-i18next';
import { useFocusEffect } from '@react-navigation/native';

const InformationRow = ({ label, value, iconName, iconColor, style }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
    {iconName && <AntDesign name={iconName} size={20} color={iconColor} />}
    <Text style={{ marginLeft: iconName ? 10 : 0, fontWeight: 'bold', ...style }}>{label}: {value}</Text>
  </View>
);

const CustomDrawerContent = ({ navigation }) => {
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

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

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
    <DrawerContentScrollView>
      <OnlineStatusInformer />
      <View style={{ alignItems: 'center' }}>
        <AntDesign name="user" size={72} color="gray" />
      </View>

      <View style={{ flex: 1, marginTop: 5, paddingHorizontal: 16, borderStyle: 'solid', borderColor: 'lightgray', borderWidth: 1 }}>
        <View style={{ paddingBottom: 10 }}>
          <View>
            <InformationRow label={t('email')} value={userProfile ? userProfile.email : ''} iconName="mail" iconColor="gray" />
            <InformationRow label={t('Store No')} value={storeNo} iconName="shoppingcart" iconColor="gray" />
            <InformationRow label={t('Cash Register No')} value={cashRegisterNo} iconName="barcode" iconColor="gray" />
            <InformationRow label={t('Cash Register IP')} value={ipAddress} iconName="wifi" iconColor="gray" />
            <InformationRow label={t('Version')} value={version} iconName="info" iconColor="gray" />
            <InformationRow label={t('Date')} value={currentDate} iconName="calendar" iconColor="gray" />
          </View>
        </View>
      </View>

      <View style={{ borderWidth: 1, borderColor: 'lightgray' }}>
        <DrawerItem
          label={t('Menu')}
          icon={({ color, size }) => <AntDesign name="menu-fold" size={size} color={color} />}
          onPress={() => navigation.navigate(t('Menu'))}
        />
        <DrawerItem
          label={t('Settings')}
          icon={({ color, size }) => <AntDesign name="setting" size={size} color={color} />}
          onPress={() => navigation.navigate(t('Settings'))}
        />
      </View>

      <View style={{ borderWidth: 1, borderRadius: 20, borderColor: 'lightcoral' }}>
        <TouchableOpacity onPress={handleLeaveAccount} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <AntDesign name={"back"} size={36} color={"red"} />
          <Text style={{ color: 'red', fontWeight: 'bold' }}>{t('Leave the Account')}</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
