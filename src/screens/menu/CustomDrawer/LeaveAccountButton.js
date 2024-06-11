import React from 'react';
import { View, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

const LeaveAccountButton = ({ onLeave }) => {
  const { t } = useTranslation();

  const handleLeaveAccount = () => {
    Alert.alert(
      t('Are you sure?'),
      t('Are you sure you want to leave your account?'),
      [
        {
          text: t('Yes'),
          onPress: onLeave,
        },
        {
          text: t('No'),
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.leaveAccountContainer}>
      <TouchableOpacity onPress={handleLeaveAccount} style={styles.leaveAccountButton}>
        <AntDesign name="back" size={36} color="red" />
        <Text style={styles.leaveAccountText}>{t('Leave the Account')}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  leaveAccountContainer: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'lightcoral',
    margin: 20,
  },
  leaveAccountButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  leaveAccountText: {
    color: 'red',
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default LeaveAccountButton;
