import React from 'react';
import { View, Text, StyleSheet ,TouchableOpacity} from 'react-native';

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
       
          <Text >Show all the users in db</Text>
       
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default SettingsScreen;
