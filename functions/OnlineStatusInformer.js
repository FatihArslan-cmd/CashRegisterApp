import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import CustomText from '../functions/CustomText';
import OnlineStatusContext from '../context/OnlineStatusContext';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useTranslation } from 'react-i18next';

const OnlineStatusInformer = () => {
    const { isOnline } = useContext(OnlineStatusContext);
    const { t } = useTranslation();
   
    return (
        <View style={styles.container}>
            <View>
            <CustomText style={{ color: isOnline ? 'green' : 'red', }}>
            {t('store')} {isOnline ? 'Online' : 'Offline'}
            </CustomText>
            </View>
            {isOnline ? (
                <AntDesign name={"checkcircle"} size={24} color={"green"} />
            ) : (
                <AntDesign name={"closecircle"} size={24} color={"red"} />
            )}
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexDirection: 'row',
        justifyContent:'center'
    },
});

export default OnlineStatusInformer;
