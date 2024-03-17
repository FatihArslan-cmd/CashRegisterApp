// Application.js

import React, { useState } from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';

const Application = ({ navigation }) => {
  const [counter, setCounter] = useState(0);

  const incrementCounter = () => {
    setCounter(prevCounter => prevCounter + 1);
  };

  const handleLogout = () => {
    // Kullanıcıyı çıkış yapmak için ana ekranına yönlendir
    navigation.navigate('Home');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>React Native Uygulaması</Text>
      <Text>Sayaç Değeri: {counter}</Text>
      <Button title="Artır" onPress={incrementCounter} />

      {/* Hesaptan çık düğmesi */}
      <TouchableOpacity style={{ marginTop: 20 }} onPress={handleLogout}>
        <Text style={{ color: 'red', fontSize: 18 }}>Hesaptan Çık</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Application;
