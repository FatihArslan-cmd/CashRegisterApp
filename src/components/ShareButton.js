import React, { useState, useContext } from 'react';
import { Share, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import { useTranslation } from 'react-i18next';
import { NativeBaseProvider, Box, Icon, Text } from 'native-base';
import { ThemeContext } from '../context/ThemeContext';

const ShareEg = () => {
    const { isDarkMode } = useContext(ThemeContext);
    const { t } = useTranslation();
    const [scaleValue] = useState(new Animated.Value(1));

    const startScaleAnimation = () => {
        Animated.sequence([
            Animated.timing(scaleValue, {
                toValue: 0.95,
                duration: 150,
                useNativeDriver: true,
            }),
            Animated.timing(scaleValue, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
            }),
        ]).start();
    };

    const onShare = async () => {
        try {
            const result = await Share.share({
                message: t('I want to share an app that I discovered lately'),
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
        <NativeBaseProvider>
            <Box alignItems="center" style={styles.shareContainer}>
                <TouchableOpacity
                    onPress={() => {
                        startScaleAnimation();
                        onShare();
                    }}
                    activeOpacity={0.8}
                >
                    <Animated.View style={[styles.shareButton, isDarkMode && styles.darkShareButton, { transform: [{ scale: scaleValue }] }]}>
                        <Icon as={Fontisto} name="share" size="xl" color="white" />
                        <Text style={styles.shareText}>{t('Share')}</Text>
                    </Animated.View>
                </TouchableOpacity>
            </Box>
        </NativeBaseProvider>
    );
};

const styles = StyleSheet.create({
    shareContainer: {
        flexDirection: 'row',
    },
    shareButton: {
        backgroundColor: '#00668b',
        borderRadius: 15,
        padding: 13,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    darkShareButton: {
        backgroundColor: '#333',
    },
    shareText: {
        color: 'white',
        fontSize: 21,
        fontWeight: 'bold',
        marginLeft: 5,
    },
});

export default ShareEg;
