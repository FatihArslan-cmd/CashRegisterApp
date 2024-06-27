import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import * as Font from 'expo-font';


//To manage font 


const CustomText = ({ children, style, fontFamily }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'pop': require('../../assets/fonts/Poppins-Bold.ttf'),
        'bungee': require('../../assets/fonts/BungeeSpice-Regular.ttf'),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; 
  }

  const selectedFontFamily = fontFamily || 'pop'; 

  return (
    <Text style={[style, fontsLoaded && { fontFamily: selectedFontFamily }]}>
      {children}
    </Text>
  );
};

export default CustomText;
