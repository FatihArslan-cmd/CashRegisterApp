import React from 'react';

import { HStack,Spinner,NativeBaseProvider } from 'native-base';
const LoadingIndicator = () => (
  <NativeBaseProvider>
    <HStack zIndex={999} space={8} justifyContent="center" alignItems="center">
    <Spinner size="lg" color="emerald.500" />
   </HStack>
  </NativeBaseProvider>
);



export default LoadingIndicator;
