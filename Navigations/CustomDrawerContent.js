import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import getAppVersion from '../functions/getAppVersion';
import GetIP from '../functions/GetIp';
import OnlineStatusInformer from '../functions/OnlineStatusInformer';

const InformationRow = ({ label, value, iconName, iconColor, style }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
    {iconName && <AntDesign name={iconName} size={20} color={iconColor} />}
    <Text style={{ marginLeft: iconName ? 10 : 0, fontWeight: 'bold', ...style }}>{label}: {value}</Text>
  </View>
);

const CustomDrawerContent = ({ navigation }) => {
  const [userProfile, setUserProfile] = useState(null); // State to hold user profile
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Function to fetch username from AsyncStorage
    const fetchUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        setUsername(storedUsername);
      } catch (error) {
        console.error('Error fetching username:', error);
        Alert.alert('Error', 'An error occurred while fetching username');
      }
    };

    fetchUsername(); 
  }, []);

  useEffect(() => {
    // Function to fetch user profile from AsyncStorage
    const fetchUserProfile = async () => {
      try {
        const userProfileJSON = await AsyncStorage.getItem(username);
        const userProfile = JSON.parse(userProfileJSON);
        setUserProfile(userProfile);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        Alert.alert('Error', 'An error occurred while fetching user profile');
      }
    };

    if (username) {
      fetchUserProfile(); // Call the function to fetch user profile
    }
  }, [username]);

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

  // Function to handle leaving the account
  const handleLeaveAccount = () => {
    Alert.alert(
      'Are you sure?',
      'Are you sure you want to leave your account?',
      [
        {
          text: 'Yes',
          onPress: () => {
            navigation.navigate('Home'); // Navigates to the home screen.
          },
        },
        {
          text: 'No',
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
              <InformationRow label="Staff Email" value={userProfile ? userProfile.email : ''} iconName="mail" iconColor="gray" />
              <InformationRow label="Store No" value={storeNo} iconName="shoppingcart" iconColor="gray" />
              <InformationRow label="Cash Register No" value={cashRegisterNo} iconName="barcode" iconColor="gray" />
              <InformationRow label="Cash Register IP" value={ipAddress} iconName="wifi" iconColor="gray" />
              <InformationRow label="Version" value={version} iconName="info" iconColor="gray" />
              <InformationRow label="Date" value={currentDate} iconName="calendar" iconColor="gray" />
            </View>
         
        </View>
      </View>

      <View style={{ borderWidth: 1, borderColor: 'lightgray' }}>
        <DrawerItem
          label="Menu"
          icon={({ color, size }) => <AntDesign name="menu-fold" size={size} color={color} />}
          onPress={() => {
            navigation.navigate('Menu');
          }}
        />
        <DrawerItem
          label="Settings"
          icon={({ color, size }) => <AntDesign name="setting" size={size} color={color} />}
          onPress={() => {
            // Navigate to Settings screen
            navigation.navigate('Settings');
          }}
        />
      </View>

      <View style={{ borderWidth: 1, borderRadius: 20, borderColor: 'lightcoral' }}>
        <TouchableOpacity onPress={handleLeaveAccount} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <AntDesign name={"back"} size={36} color={"red"} />
          <Text style={{ color: 'red', fontWeight: 'bold' }}>Leave the Account</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
