import React from "react";
import { StyleSheet, View, TouchableOpacity,Text } from "react-native";
import Antdesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

const LoginMethodsButtons = () => {
    const navigation = useNavigation();
    const { t } = useTranslation();

  return (
    <View style={styles.container}>
            <View style={styles.textContainer}>
              <Text style={styles.text}>{t('Havent you tried')}</Text>
              <Text style={styles.text}>{t('Other login methods?')}</Text>
            </View>
            <Antdesign name={"arrowright"} size={48} color={"black"} style={styles.inputIcon}/>
        <View style={styles.buttonContainer}>
    <TouchableOpacity onPress={() => navigation.navigate('LoginMethods')}>
      <View style={styles.row}>
        <Entypo name={"user"} size={24} color={"black"} style={styles.inputIcon}/>
        <Entypo name={"fingerprint"} size={24} color={"black"} style={styles.inputIcon}/>
      </View>
      <View style={styles.row}>
        <Antdesign name={"barcode"} size={24} color={"black"} style={styles.inputIcon}/>
        <MaterialCommunityIcons name={"cellphone-nfc"} size={24} color={"black"} style={styles.inputIcon}/>
      </View>
    </TouchableOpacity>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
       marginTop:20,
       flex:1,
       alignItems:'center',
       flexDirection:'row',
       justifyContent:'center',
    },
    textContainer: {
        marginRight:15,
       flexDirection:'column'
     },
 
   buttonContainer: {
    flexDirection: 'column',
    marginLeft:15,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  inputIcon: {
    marginRight: 5,
  },
  text: {
    fontWeight:'bold',
    fontSize:18
  }
});

export default LoginMethodsButtons;
