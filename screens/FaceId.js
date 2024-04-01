import React, { useEffect, useState } from 'react';
import { View, Text, Alert ,TouchableOpacity} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

const FaceIDScreen = () => {
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);

  useEffect(() => {
    checkBiometricSupport();
  }, []);

  const checkBiometricSupport = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    setIsBiometricSupported(compatible);
  };

  const handleBiometricAuth = async () => {
    const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
    if (!savedBiometrics) {
      Alert.alert(
        'Biometric record not found',
        'Please verify your identity with your password',
        [{ text: 'OK', onPress: () => fallBackToDefaultAuth() }]
      );
    } else {
      const biometricAuth = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Login with Biometrics',
        disableDeviceFallback: true,
      });

      if (biometricAuth.success) {
        Alert.alert('Success', 'Biometric authentication successful!');
      } else {
        Alert.alert('Error', 'Biometric authentication failed.');
      }
    }
  };

  const fallBackToDefaultAuth = () => {
    // Fallback to default authentication method
    console.log('Fallback to default authentication method');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>
        {isBiometricSupported
          ? 'Your device is compatible with Biometrics'
          : 'Face or Fingerprint scanner is available on this device'}
      </Text>
      <Text>Press the button below to authenticate with Biometrics:</Text>
      <TouchableOpacity onPress={handleBiometricAuth}>
        <Text>Authenticate with Biometrics</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FaceIDScreen;
