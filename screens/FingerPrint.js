import React, { useEffect } from 'react';
import { View, Alert, TouchableOpacity,Text } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { Entypo } from '@expo/vector-icons'; // Entypo ikonlarını ekledik

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
        Alert.alert('Succesful', 'Fingerprint verified!');
        navigation.navigate('Menu');
      } else {
        Alert.alert('Error', 'Fingerprint authentication failed.');
      }
    } catch (error) {
      console.error('Fingerprint authentication error:', error);
    }
  };

  useEffect(() => {
    handleAuthentication(); // Sayfa yüklendiğinde otomatik olarak parmak izi taramasını başlatır
  }, []); // Boş bağımlılık dizisi, bunun yalnızca bir kez çalıştırılmasını sağlar.

  return (
    <View style={{  marginTop:300,alignItems: 'center',justifyContent:'center' }}>
      <TouchableOpacity onPress={handleAuthentication}>
        <Entypo name={"fingerprint"} size={200} color={"black"} />
      </TouchableOpacity>
    </View>
  );
}

export default FingerprintScreen;
