import React, { useState, useContext } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text, Image, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Antdesign from 'react-native-vector-icons/AntDesign';
import { useTranslation } from 'react-i18next';
import * as Animatable from 'react-native-animatable';
import CustomText from '../components/CustomText';
import { ThemeContext } from '../context/ThemeContext'; // Update the path as necessary
import { getItem,setItem } from '../utils/storage';
const SignUpScreen = ({ navigation }) => {
  const { t } = useTranslation();
  const { isDarkMode } = useContext(ThemeContext); // Use ThemeContext

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleRegister = async () => {
    if (username.trim() === '') {
      Alert.alert(t('Error'), t('Please enter a username'));
      return;
    }
    if (password.trim() === '') {
      Alert.alert(t('Error'), t('Please enter a password'));
      return;
    }
    if (password.length < 6) {
      Alert.alert(t('Error'), t('Password must be at least 6 characters long'));
      return;
    }
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%+*?&])[A-Za-z\d@$!%+*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      Alert.alert(t('Error'), t('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'));
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert(t('Error'), t('Passwords do not match'));
      return;
    }
    if (email.trim() === '') {
      Alert.alert(t('Error'), t('Please enter an email address'));
      return;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert(t('Error'), t('Please enter a valid email address'));
      return;
    }

    try {
      const existingUser = await getItem(username);
      if (existingUser !== null) {
        Alert.alert(t('Error'), t('Username already exists'));
        return;
      }
      const existingEmail = await getItem(email);
      if (existingEmail !== null) {
        Alert.alert(t('Error'), t('Email already exists'));
        return;
      }
      await setItem(username, { password, email, username });
      Alert.alert(t('Success'), t('Account created successfully'));
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error registering:', error);
      Alert.alert(t('Error'), t('An error occurred while registering'));
    }
  };

  const styles = getStyles(isDarkMode);

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInUp" delay={250} useNativeDriver>
        <View style={styles.topImageContainer}>
          <Image source={require("../../assets/image/topVector.png")} style={styles.topImage} />
        </View>

        <View style={styles.CreateContainer}>
          <CustomText style={styles.signInText}>{t('Create an Account')}</CustomText>
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome name={"user"} size={24} color={isDarkMode ? "#ccc" : "#9A9A9A"} style={styles.inputIcon} />
          <TextInput style={styles.textInput} placeholder={t('Username')} placeholderTextColor={isDarkMode ? "#ccc" : "#9A9A9A"} value={username}
            onChangeText={text => setUsername(text)} />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome name={"lock"} size={24} color={isDarkMode ? "#ccc" : "#9A9A9A"} style={styles.inputIcon} />
          <TextInput style={styles.textInput} placeholder={t('Password')} placeholderTextColor={isDarkMode ? "#ccc" : "#9A9A9A"} secureTextEntry value={password}
            onChangeText={text => setPassword(text)} />
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome name={"lock"} size={24} color={isDarkMode ? "#ccc" : "#9A9A9A"} style={styles.inputIcon} />
          <TextInput style={styles.textInput} placeholder={t('Confirm Password')} placeholderTextColor={isDarkMode ? "#ccc" : "#9A9A9A"} secureTextEntry value={confirmPassword}
            onChangeText={text => setConfirmPassword(text)} />
        </View>

        <View style={styles.inputContainer}>
          <Antdesign name={"mail"} size={24} color={isDarkMode ? "#ccc" : "#9A9A9A"} style={styles.inputIcon} />
          <TextInput style={styles.textInput} placeholder='Email' placeholderTextColor={isDarkMode ? "#ccc" : "#9A9A9A"} value={email}
            onChangeText={text => setEmail(text)} />
        </View>

        <TouchableOpacity style={styles.infoButton} onPress={() => Alert.alert(t('Information'), t('Password field cannot be empty\n- Password must be at least 6 characters long\n- Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'))}>
          <Antdesign name={"infocirlceo"} size={28} color={"gray"} />
        </TouchableOpacity>

        <View style={styles.signInButtonContainer}>
          <Text style={styles.signIn}>{t('Submit')}</Text>
          <TouchableOpacity style={styles.signInButton} onPress={handleRegister}>
            <Antdesign name={"arrowright"} size={36} color={"white"} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Antdesign name={"fastbackward"} size={36} color={isDarkMode ? "#ccc" : "#9A9A9A"} style={styles.inputIcon} />
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

const getStyles = (isDarkMode) => StyleSheet.create({
  container: {
    backgroundColor: isDarkMode ? '#333' : 'white',
    flex: 1,
  },
  topImage: {
    width: "100%",
    height: 130,
  },
  CreateContainer: {},
  signInText: {
    textAlign: 'center',
    fontSize: 35,
    marginBottom: 30,
    color: isDarkMode ? '#fff' : '#000',
  },
  inputContainer: {
    backgroundColor: isDarkMode ? '#555' : "white",
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
    color: isDarkMode ? '#fff' : '#000',
  },
  signInButtonContainer: {
    flexDirection: 'row',
    marginTop: 45,
    width: "90%",
    justifyContent: "flex-end",
  },
  signIn: {
    fontSize: 25,
    color: isDarkMode ? '#fff' : 'black',
    fontWeight: 'bold',
  },
  signInButton: {
    marginLeft: 10,
    borderWidth: 2,
    borderColor: "#F97799",
    borderRadius: 15,
    width: 75,
    height: 45,
    alignItems: 'center',
    backgroundColor: "#F97799",
  },
  footerText: {
    textAlign: 'center',
    color: isDarkMode ? '#fff' : 'black',
    fontSize: 18,
    marginTop: 120,
  },
  infoButton: {
    marginLeft: 330,
  },
  button: {
    // Additional button styles here
  }
});

export default SignUpScreen;
