import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import OnlineStatusContext from '../../context/OnlineStatusContext';
import { VStack, Switch, View } from 'native-base';


//The user simply toggle the status of online/offline

const OnlineStatusToggle = () => {
  const { isOnline, toggleOnlineStatus } = useContext(OnlineStatusContext);

  const handleToggle = () => {
    toggleOnlineStatus(!isOnline); 
  };

  return (
    <View style={styles.container}>
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
