import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert,Image } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons';
import getAppVersion from '../functions/getAppVersion';
import loadUserProfile from '../functions/LoadUserProfile';
import GetIP from '../functions/GetIp';
import OnlineStatusInformer from '../functions/OnlineStatusInformer';
const InformationRow = ({ label, value, iconName, iconColor, style }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
    {iconName && <AntDesign name={iconName} size={20} color={iconColor} />}
    <Text style={{ marginLeft: iconName ? 10 : 0, fontWeight: 'bold', ...style }}>{label}: {value}</Text>
  </View>
);


const CustomDrawerContent = (props) => {
  const { navigation } = props;
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const profile = await loadUserProfile();
      setUserProfile(profile);
    };

    fetchUserProfile();
  }, []);

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

  const storeNo = '1';
  const cashRegisterNo = '38462';
  const ipAddress = GetIP(); 
  const version = getAppVersion();

  return (
    
    <DrawerContentScrollView {...props}>
      <OnlineStatusInformer />
      <View style={{ alignItems:'center' }}>
        <AntDesign name="user" size={72} color="gray"  />
      </View>

      <View style={{ flex: 1, marginTop: 5, paddingHorizontal: 16, borderStyle: 'solid', borderColor: 'lightgray', borderWidth: 1 }}>
        <View style={{ paddingBottom: 10 }}>
        
          {userProfile && (
            <View>
              <InformationRow label="Staff Email" value={userProfile.email} iconName="mail" iconColor="gray" />
              <InformationRow label="Store No" value={storeNo} iconName="shoppingcart" iconColor="gray" />
              <InformationRow label="Cash Register No" value={cashRegisterNo} iconName="barcode" iconColor="gray" />
              <InformationRow label="Cash Register IP"  value={ipAddress} iconName="wifi" iconColor="gray" />
              <InformationRow label="Version" value={version} iconName="info" iconColor="gray" />
            </View>
          )}
        </View>
      </View>

      <View style={{borderWidth:1, borderColor:'lightgray'}}>
      <DrawerItem
        label="Menu"
        icon={({color, size }) => <AntDesign name="menu-fold" size={size} color={color} />}
        onPress={() => {
          navigation.navigate('Menu');
        }}
      />
      <DrawerItem
        label="Settings"
        icon={({color, size }) => <AntDesign name="setting" size={size} color={color} />}
        onPress={() => {
          // Navigate to Settings screen
          navigation.navigate('Settings');
        }}
      />
      </View>

      <View style={{borderWidth:1,borderRadius:20,borderColor: 'lightcoral'}}>
      <TouchableOpacity onPress={handleLeaveAccount} style={{ flexDirection: 'row', alignItems: 'center', justifyContent:'center'}}>
        <AntDesign name={"back"} size={36} color={"red"} />
        <Text style={{ color: 'red', fontWeight: 'bold'}}>Leave the Account</Text>
      </TouchableOpacity>
      </View>

      
      
    </DrawerContentScrollView>
    
  );
};

export default CustomDrawerContent;
