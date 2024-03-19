import React, { useEffect } from 'react';
import { View, Button, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

const FingerprintScreen = ({ navigation }) => {
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

  useEffect(() => {
    handleAuthentication(); // Automatically initiate fingerprint scanning when the page loads
  }, []); // Passing an empty dependency array ensures this runs only once.

  return (
    <View style={{ marginTop: 100 }}>
      {/* Instead of password entry, here could be a button initiating fingerprint scanning */}
      <Button title="Scan the Fingerprint" onPress={handleAuthentication} />
    </View>
  );
}

export default FingerprintScreen;
