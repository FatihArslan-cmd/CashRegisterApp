
import React from 'react';
import { View, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title="Email"
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        title="Finger ID"
        onPress={() => navigation.navigate('finger')}
      />
    </View>
  );
}
