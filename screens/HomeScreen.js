
import React from 'react';
import { View, Button } from 'react-native';
import AnimatedTyping from '../functions/AnimatedTypewriterText';
export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <AnimatedTyping />
      <Button
        title="Email"
        onPress={() => navigation.navigate('Login')}
      />
      <Button
        title="Finger ID"
        onPress={() => navigation.navigate('Finger')}
      />
      <Button
        title="Face ID"
        onPress={() => navigation.navigate('Face')}
      />
    </View>
  );
}
