import React, { useState } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text, Image, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Antdesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = async () => {
    if (username.trim() === '' || password.trim() === '' || email.trim() === '') {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    try {
      // Check if the username already exists
      const existingUser = await AsyncStorage.getItem(username);
      if (existingUser !== null) {
        Alert.alert('Error', 'Username already exists');
        return;
      }

      // Save new user data
      await AsyncStorage.setItem(username, JSON.stringify({ password, email }));
      Alert.alert('Success', 'Account created successfully');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error registering:', error);
      Alert.alert('Error', 'An error occurred while registering');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topImageContainer}>
        <Image source={require("../assets/topVector.png")} style={styles.topImage}></Image>
      </View>

      <View style={styles.CreateContainer}>
        <Text style={styles.signInText}>Create Account</Text>
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name={"user"} size={24} color={"#9A9A9A"} style={styles.inputIcon} />
        <TextInput style={styles.textInput} placeholder=' Username' value={username}
          onChangeText={text => setUsername(text)} />
      </View>

      <View style={styles.inputContainer}>
        <FontAwesome name={"lock"} size={24} color={"#9A9A9A"} style={styles.inputIcon} />
        <TextInput style={styles.textInput} placeholder='Password' secureTextEntry value={password}
          onChangeText={text => setPassword(text)} />
      </View>

      <View style={styles.inputContainer}>
        <Antdesign name={"mail"} size={24} color={"#9A9A9A"} style={styles.inputIcon} />
        <TextInput style={styles.textInput} placeholder='Email' value={email}
          onChangeText={text => setEmail(text)} />
      </View>

      <View style={styles.signInButtonContainer}>
        <Text style={styles.signIn}>Create</Text>
        <TouchableOpacity style={styles.signInButton} onPress={handleRegister}>
          <Antdesign name={"arrowright"} size={36} color={"white"} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Antdesign name={"fastbackward"} size={36} color={"#9A9A9A"} style={styles.inputIcon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  topImage: {
    width: "100%",
    height: 130,
  },
  CreateContainer: {},
  signInText: {
    textAlign: 'center',
    fontSize: 40,
    marginBottom: 30,
    fontWeight: 'bold'
  },
  inputContainer: {
    backgroundColor: "white",
    flexDirection: 'row',
    borderRadius: 20,
    marginHorizontal: 40,
    elevation: 10,
    marginVertical: 20,
    alignItems: 'center',
    height: 50,
  },
  inputIcon: {
    marginLeft: 15,
  },
  textInput: {
    flex: 1,
    marginLeft: 5,
  },
  signInButtonContainer: {
    flexDirection: 'row',
    marginTop: 100,
    width: "90%",
    justifyContent: "flex-end",
  },
  signIn: {
    fontSize: 25,
    color: "black",
    fontWeight: 'bold'
  },
  signInButton: {
    marginLeft: 10,
    borderWidth: 2, // sınır genişliği
    borderColor: "#F97799",
    borderRadius: 15, // sınır köşe yarıçapı
    width: 75,
    height: 45,
    alignItems: 'center',
    backgroundColor: "#F97799"
  },
  footerText: {
    textAlign: 'center',
    color: "black",
    fontSize: 18,
    marginTop: 120,
  }
});

export default SignUpScreen;
