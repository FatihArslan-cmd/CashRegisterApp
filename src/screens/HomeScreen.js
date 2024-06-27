import React, { useContext,useState,useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, TextInput, Alert, Vibration, ActivityIndicator } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Antdesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginMethodsButtons from '../components/LoginMethodsButtons';
import LoadingIndicator from '../components/LoadingIndicator';
import CustomText from '../components/CustomText';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../context/ThemeContext'; 

const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { t } = useTranslation();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  

  useEffect(() => {
    const retrieveCredentials = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        const storedPassword = await AsyncStorage.getItem('password');

        if (storedUsername && storedPassword) {
          setUsername(storedUsername);
          setPassword(storedPassword);
          setRememberMe(true);
        }
      } catch (error) {
        console.error('Error retrieving credentials:', error);
      }
    };

    retrieveCredentials(); 
  }, []);

//here user information of the logged in account is saved into the local storage
//now they can be used inside the application

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const savedUser = JSON.parse(await AsyncStorage.getItem(username));

      if (savedUser && savedUser.password === password) {
        if (rememberMe) {
          try {
            await AsyncStorage.setItem('username', username);
            await AsyncStorage.setItem('password', password);
          } catch (error) {
            console.error('Error storing credentials:', error);
          }
          navigation.navigate('MainDrawer');

        }
         else {
          await AsyncStorage.removeItem('username');
          await AsyncStorage.removeItem('password');
        }
      } else {
        Alert.alert(t('Error'), t('Invalid username or password'));
        Vibration.vibrate(500);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert(t('Error'), 'An error occurred');
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  };

  const styles = getStyles(isDarkMode);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.topImageContainer}>
          <Image source={require("../../assets/image/topVector.png")} style={styles.topImage}></Image>
        </View>   

        <View style={styles.helloContainer}>
          <CustomText style={styles.helloText}>{t('Hello')}</CustomText>
        </View>

        <View style={styles.helloContainer}>
          <CustomText style={styles.signInText}>{t('Sign in to your account')}</CustomText>
        </View>

        <View style={styles.inputContainer}>
          <FontAwesome name={"user"} size={24} color={isDarkMode ? "#ccc" : "#9A9A9A"} style={styles.inputIcon}/>
          <TextInput style={styles.textInput} placeholder={t('Username')} placeholderTextColor={isDarkMode ? "#ccc" : "#9A9A9A"} value={username}
            onChangeText={text => setUsername(text)}/>
        </View>
        
        <View style={styles.inputContainer}>
          <FontAwesome name={"lock"} size={24} color={isDarkMode ? "#ccc" : "#9A9A9A"} style={styles.inputIcon}/>
          <TextInput style={styles.textInput} placeholder={t('Password')} placeholderTextColor={isDarkMode ? "#ccc" : "#9A9A9A"} secureTextEntry value={password}
            onChangeText={text => setPassword(text)} />
        </View>

        <View style={styles.rememberMeContainer}>
          <Text style={styles.rememberMeText}>{t('Remember Me')}</Text>
          <TouchableOpacity style={styles.checkbox} onPress={() => setRememberMe(!rememberMe)}>
            {rememberMe && <View style={styles.checkedCheckbox} />}
          </TouchableOpacity>
        </View>
        
        {isLoading ? (
          <LoadingIndicator/>
        ) : (
          <View style={styles.signInButtonContainer}>
            <CustomText style={styles.signIn}>{t('Sign in')}</CustomText>
            <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
              <Antdesign name={"arrowright"} size={36} color={"white"} />
            </TouchableOpacity>
          </View>
        )}
        
        <Text style={styles.footerText}>{t('Dont have an account ?')} <TouchableOpacity  onPress={() => navigation.navigate('SignUp')}>
          <Text style={{textDecorationLine:"underline",fontSize:18 ,color: isDarkMode ? '#fff' : '#000',}}> {t('Create')} </Text></TouchableOpacity> </Text>     
        <LoginMethodsButtons/>
      </View>
    </>
  );
}

const getStyles = (isDarkMode) => StyleSheet.create({
  container: {
    backgroundColor: isDarkMode ? '#333' : 'white',
    flex: 1,
  },
  topImage: {
    width: "100%",
    height: 130,
  },
  helloContainer: {},
  helloText: {
    textAlign: 'center',
    fontSize: 65,
    color: isDarkMode ? '#fff' : '#000',
  },
  signInText: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 30,
    color: isDarkMode ? '#ccc' : '#000',
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
    marginTop: 65,
    width: "90%",
    justifyContent: "flex-end",
  },
  signIn: {
    fontSize: 25,
    color: isDarkMode ? '#fff' : "black",
    fontWeight: 'bold'
  },
  signInButton: {
    marginLeft: 10,
    borderWidth: 2,
    borderColor: isDarkMode ? '#F97799' : "#F97799",
    borderRadius: 15,
    width: 75,
    height: 45,
    alignItems: 'center',
    backgroundColor: isDarkMode ? '#444' : "#F97799",
  },
  footerText: {
    textAlign: 'center',
    color: isDarkMode ? '#ccc' : "black",
    fontSize: 18,
    marginTop: 40,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    marginTop: 10,
    width: "90%",
    justifyContent: "flex-end",
  },
  checkbox: {
    marginRight: 10,
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: isDarkMode ? '#555' : '#fff',
  },
  checkedCheckbox: {
    width: 10,
    height: 10,
    backgroundColor: 'purple',
    borderRadius: 5,
  },
  rememberMeText: {
    fontWeight: 'bold',
    marginRight: 5,
    color: isDarkMode ? '#ccc' : '#000',
  }
});

export default HomeScreen;
