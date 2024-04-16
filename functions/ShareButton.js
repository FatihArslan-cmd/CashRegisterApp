import React from 'react';
import { Share, TouchableOpacity, View, Text, StyleSheet } from 'react-native';

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
                <Text style={styles.shareText}>Share</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    shareButton: {
        backgroundColor: 'gray',
        paddingVertical: 30,
        paddingHorizontal: 30,
        borderRadius: 30, // Adjust the spacing between buttons
    },
    shareText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ShareEg;
