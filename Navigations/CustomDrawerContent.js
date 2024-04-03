import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons';
import getAppVersion from '../functions/getAppVersion';
// Reusable component for displaying information rows
const InformationRow = ({ label, value }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
    <Text style={{ fontWeight: 'bold' }}>{label}:</Text>
    <Text style={{ marginLeft: 10 }}>{value}</Text>
  </View>
);

// Reusable component for the leave account button
const LeaveAccountButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20, paddingHorizontal: 16 }}>
    <AntDesign name={"back"} size={24} color={"red"} />
    <Text style={{ color: 'red', fontWeight: 'bold', marginLeft: 15 }}>Leave the Account</Text>
  </TouchableOpacity>
);

const CustomDrawerContent = (props) => {
  const { navigation } = props;

  // Function to handle leaving the account
  const handleLeaveAccount = () => {
    Alert.alert(
      'Are you sure?',
      'Are you sure you want to leave your account?',
      [
        {
          text: 'Yes',
          onPress: () => {
            // Here you can add the operations to leave the account.
            // For example: AsyncStorage.clear() or any other relevant operation.
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
  const cashRegisterNo = '1';
  const ipAddress = '123';
  const version = getAppVersion();

  return (
    <DrawerContentScrollView {...props}>
        <View style={{ marginTop: 20, paddingHorizontal: 16 }}>
        <InformationRow label="Store No" value={storeNo} />
        <InformationRow label="Cash Register No" value={cashRegisterNo} />
        <InformationRow label="Cash Register IP" value={ipAddress} />
        <InformationRow label="Version" value={version} />
      </View>
      <DrawerItemList {...props} />
      
      <LeaveAccountButton onPress={handleLeaveAccount} />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
