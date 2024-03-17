import React from 'react';
import { View, Button, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

export default function FingerprintScreen({ navigation }) {
  const handleAuthentication = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();

    if (!compatible) {
      Alert.alert('Your device does not support fingerprint scanner!');
      return;
    }

    const enrolled = await LocalAuthentication.isEnrolledAsync();
    if (!enrolled) {
      Alert.alert('Please add fingerprint to your device!');
      return;
    }

    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Scan your fingerprint',
      });
      if (result.success) {
        Alert.alert('Congratulations', 'Fingerprint verified!');
        navigation.navigate('Application');
      } else {
        Alert.alert('Error', 'Fingerprint authentication failed.');
      }
    } catch (error) {
      console.error('Fingerprint authentication error:', error);
    }
  };

  return (
    <View style={{marginTop:100}}>
      <Button title="Scan the Fingerprint" onPress={handleAuthentication} />
    </View>
  );
}
