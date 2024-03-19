import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import AnimatedTyping from '../functions/AnimatedTypewriterText';
import ShareEg from '../functions/ShareButton';
import ContactMe from '../functions/ContactButton';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <AnimatedTyping />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginMethods')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <ShareEg />
        <ContactMe />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 300, // Adjust the margin according to your preference
  },
  button: {
    backgroundColor: 'black',
    paddingVertical: 30,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginHorizontal: 10, // Adjust the spacing between buttons
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
