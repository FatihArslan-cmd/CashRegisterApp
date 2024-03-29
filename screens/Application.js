import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';

const Application = ({ navigation }) => {
  const [counter, setCounter] = useState(0);

  const incrementCounter = () => {
    setCounter(prevCounter => prevCounter + 1);
  };

  const handleLogout = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>React Native</Text>
      <Text>Counter value: {counter}</Text>
      <Button title="increase" onPress={incrementCounter} />

      <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
        <Text style={{ color: 'red', fontSize: 18 }}>Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ marginTop: 20 }} onPress={handleLogout}>
        <Text style={{ color: 'red', fontSize: 18 }}>Leave the account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Application;
