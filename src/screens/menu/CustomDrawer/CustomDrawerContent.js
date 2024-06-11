import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { ThemeContext } from '../../../context/ThemeContext';
import { formatDateTime } from '../../../utils/helpers';
import getAppVersion from '../../../components/getAppVersion';
import GetIP from '../../../components/GetIp';
import OnlineStatusInformer from '../../../components/OnlineStatusInformer';
import UserProfile from './UserProfile';
import DrawerNavigationItems from './DrawerNavigationItems';
import LeaveAccountButton from './LeaveAccountButton';

const CustomDrawerContent = ({ navigation }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const today = new Date();
  const currentDate = formatDateTime(today);

  const storeNo = '1';
  const cashRegisterNo = '38462';
  const ipAddress = GetIP();
  const version = getAppVersion();

  const handleLeaveAccount = () => {
    navigation.navigate('Home');
  };

  return (
    <DrawerContentScrollView style={isDarkMode ? styles.darkScrollView : styles.scrollView}>
      <OnlineStatusInformer />
      <View style={{ alignItems: 'center' }}>
        <AntDesign name="user" size={72} color={isDarkMode ? 'white' : 'gray'} />
      </View>

      <UserProfile
        isDarkMode={isDarkMode}
        storeNo={storeNo}
        cashRegisterNo={cashRegisterNo}
        ipAddress={ipAddress}
        version={version}
        currentDate={currentDate}
      />

      <DrawerNavigationItems navigation={navigation} isDarkMode={isDarkMode} />

      <LeaveAccountButton onLeave={handleLeaveAccount} />
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
});

export default CustomDrawerContent;
