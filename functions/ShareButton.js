import React from 'react';
import { Share, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';

const ShareEg = () => {
    const onShare = async () => {
        try {
            const result = await Share.share({
                message: 'I want to share an app that I discovered lately',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <View style={styles.container}>
         
           <TouchableOpacity style={styles.shareButton} onPress={onShare}>
           <View style={styles.shareContainer}>
            <Fontisto name={"share"} size={24} color={"white"} style={styles.inputIcon} />
            <Text style={styles.shareText}>Share</Text>
            </View>
           </TouchableOpacity>
          
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    inputIcon:{
       marginRight:5
    },
    shareContainer:{
       flexDirection:'row'
    },
    shareButton: {
        backgroundColor: '#00668b',  
        borderRadius: 20,
        padding:13
    },
    shareText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ShareEg;
