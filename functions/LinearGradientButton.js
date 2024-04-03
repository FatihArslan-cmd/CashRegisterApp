import React from 'react';
import { Box, NativeBaseProvider } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const App = () => {
  return (
    
      <Box
        bg={{
          linearGradient: {
            colors: ['lightblue', 'violet'],
            start: [0, 0],
            end: [1, 0]
          }
        }}
        p={12}
        rounded="xl"
        _text={{
          fontSize: 'md',
          fontWeight: 'medium',
          color: 'warmGray.50',
          textAlign: 'center'
        }}
      >
        This is a Box with Linear Gradient
      </Box>
   
  );
};

const config = {
  dependencies: {
    'linear-gradient': LinearGradient
  }
};

function ColorfulButton() {
  return (
    <NativeBaseProvider config={config}>
      <App />
    </NativeBaseProvider>
  );
}

export default ColorfulButton;
