import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import OnlineStatusContext from '../context/OnlineStatusContext'; // Context dosyasının doğru yerini belirtmelisin
import { VStack, Switch, View } from 'native-base';
import OnlineStatusInformer from './OnlineStatusInformer';

const OnlineStatusToggle = () => {
  const { isOnline, toggleOnlineStatus } = useContext(OnlineStatusContext);

  const handleToggle = () => {
    toggleOnlineStatus(!isOnline); // Toggle the online status
  };

  return (
    <View style={styles.container}>
      <OnlineStatusInformer/>
      <VStack space={4} alignItems="center">
        <Switch
          isChecked={isOnline}
          onToggle={handleToggle}
          colorScheme="emerald"
        />
      </VStack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
   
  },
});

export default OnlineStatusToggle;
