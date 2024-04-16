import React from 'react';
import { View,  StyleSheet ,TouchableOpacity} from 'react-native';
import AnimatedTypewriterText from '../functions/AnimatedTypewriterText'
import ShareEg from '../functions/ShareButton';
import ContactMe from '../functions/ContactButton';
const SettingsScreen = () => {
  return (
    <View style={styles.container}>
          <ShareEg/>
          <AnimatedTypewriterText></AnimatedTypewriterText>
          <ContactMe/>
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
