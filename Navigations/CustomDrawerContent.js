import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons';
import getAppVersion from '../functions/getAppVersion';

// Reusable component for displaying information rows
const InformationRow = ({ label, value, iconName, iconColor, style }) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
    {iconName && <AntDesign name={iconName} size={20} color={iconColor} />}
    <Text style={{ marginLeft: iconName ? 10 : 0, fontWeight: 'bold', ...style }}>{label}: {value}</Text>
  </View>
);

// Reusable component for the leave account button
const LeaveAccountButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 350, paddingHorizontal: 16 }}>
    <AntDesign name={"back"} size={36} color={"red"} />
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
  const cashRegisterNo = '38462';
  const ipAddress = '192.168.X.X'; 
  const version = getAppVersion();

  return (
    <DrawerContentScrollView {...props}>
      <View style={{ alignItems:'center' }}>
        <AntDesign name="user" size={72} color="gray"  />
      </View>

      <View style={{ flex: 1, marginTop: 5, marginBottom: 40, paddingHorizontal: 16, borderStyle: 'solid', borderColor: 'gray', borderWidth: 1 }}>
        <View style={{ paddingBottom: 10 }}>
          <InformationRow label="Store No" value={storeNo} iconName="shoppingcart" iconColor="gray" />
          <InformationRow label="Cash Register No" value={cashRegisterNo} iconName="barcode" iconColor="gray" />
          <InformationRow label="Cash Register IP"  value={ipAddress} iconName="wifi" iconColor="gray" />
          <InformationRow label="Version" value={version} iconName="info" iconColor="gray" />
        </View>
      </View>

      <DrawerItem
        label="Menu"
        icon={({color, size }) => <AntDesign name="menu-fold" size={size} color={color} />}
        onPress={() => {
          // Navigate to Menu screen
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

      <LeaveAccountButton  onPress={handleLeaveAccount} />
    </DrawerContentScrollView>
  );
};

export default CustomDrawerContent;
