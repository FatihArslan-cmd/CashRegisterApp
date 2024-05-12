import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, TextInput, Alert, Vibration, ActivityIndicator } from 'react-native'; // Import ActivityIndicator
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Antdesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginMethodsButtons from '../functions/LoginMethodsButtons';
import App from './Menu/SalesScreen';
import LoadingIndicator from '../functions/LoadingIndicator';
import CustomText from '../functions/CustomText';
import { useTranslation } from 'react-i18next';

const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const { t } = useTranslation();

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

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const savedUser = JSON.parse(await AsyncStorage.getItem(username));

      if (savedUser && savedUser.password === password) {
        navigation.navigate('MainDrawer');
        if (rememberMe) {
          try {
            await AsyncStorage.setItem('username', username);
            await AsyncStorage.setItem('password', password);
          } catch (error) {
            console.error('Error storing credentials:', error);
          }
        } else {
          await AsyncStorage.removeItem('username');
          await AsyncStorage.removeItem('password');
        }
      } else {
        Alert.alert(t('Error'), t('Invalid username or password'));
        Vibration.vibrate(500);
      }t('Error')
    } catch (error) {
      console.error('Error:', error);
      Alert.alert(t('Error'), 'An error occurred');
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  };
  

  return (
    <>
    <View style={styles.container}>
     <View style={styles.topImageContainer}>
      <Image source={require("../assets/topVector.png")} style={styles.topImage}></Image>
     </View>   

      <View style={styles.helloContainer}>
       <CustomText style={styles.helloText}>{t('Hello')}</CustomText>
      </View>

      <View style={styles.helloContainer}>
       <CustomText style={styles.signInText}>{t('Sign in to your account')}</CustomText>
      </View>

      <View style={styles.inputContainer}>
       <FontAwesome name={"user"} size={24} color={"#9A9A9A"} style={styles.inputIcon}/>
       <TextInput style={styles.textInput} placeholder={t('Username')}  value={username}
        onChangeText={text => setUsername(text)}/>
      </View>
      
      <View style={styles.inputContainer}>
       <FontAwesome name={"lock"} size={24} color={"#9A9A9A"} style={styles.inputIcon}/>
       <TextInput style={styles.textInput} placeholder={t('Password')} secureTextEntry value={password}
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
      {/* Display ActivityIndicator if isLoading is true */}
      
        <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
          <Antdesign name={"arrowright"} size={36} color={"white"} />
        </TouchableOpacity>
      
     </View>
     )}
     <Text style={styles.footerText}>{t('Dont have an account ?')} <TouchableOpacity  onPress={() => navigation.navigate('SignUp')}>
      <Text style={{textDecorationLine:"underline",fontSize:18}}> {t('Create')} </Text></TouchableOpacity> </Text>     
     <LoginMethodsButtons/>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    flex:1,
  },
  topImage: {
    width:"100%",
    height:130,
   },
   helloContainer: {
   },
   helloText: {
    textAlign:'center',
    fontSize:65,
   },
   signInText:{
    textAlign:'center',
    fontSize:18,
    marginBottom:30
   },
   inputContainer:{
    backgroundColor:"white",
    flexDirection:'row',
    borderRadius:20,
    marginHorizontal:40,
    elevation:10,
    marginVertical:20,
    alignItems:'center',
    height:50,
   },
   inputIcon:{
    marginLeft:15,
   },
   textInput:{
    flex:1,
    marginLeft:5,
   },
   signInButtonContainer:{
    flexDirection:'row',
    marginTop:65,
    width: "90%",
    justifyContent:"flex-end",
   },
   signIn:{
   fontSize:25,
   color:"black",
   fontWeight:'bold'
   },
   signInButton: {
    marginLeft:10,
    borderWidth: 2, // sınır genişliği
    borderColor:"#F97799",
    borderRadius: 15, // sınır köşe yarıçapı
    width: 75, 
    height: 45, 
    alignItems:'center',
    backgroundColor:"#F97799"
  },
  footerText:{
    textAlign:'center',
    color:"black",
    fontSize:18,
    marginTop:40,
  },
  rememberMeContainer:{
    flexDirection:'row',
    marginTop:10,
    width: "90%",
    justifyContent:"flex-end",
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
  },
  checkedCheckbox: {
    width: 10,
    height: 10,
    backgroundColor: 'purple',
    borderRadius: 5,
  },
  rememberMeText:{
    fontWeight:'bold',
    marginRight:5,
  }
});

export default HomeScreen;
