import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';
import CustomText from '../components/CustomText'; 

const { width, height } = Dimensions.get('window');
const itemWidth = width / 5 * 4;
const itemHeight = height / 3 * 2;
const padding = (width - itemWidth) / 2;
const offset = itemWidth;



const Swiper5 = () => {
    const { t } = useTranslation();
    const data = [
        { color: 'purple', route: 'Finger', icon: 'fingerprint', text: 'TouchID', description: t('TouchID offers fingerprint-based authentication') },
        { color: 'red', route: 'Face', icon: 'user', text: 'FaceID', description: t('FaceID provides facial recognition authentication') },
        { color: 'orange', route: 'Barcode', icon: 'barcode', text: 'Barcode', description: t('Barcode scanning allows quick retrieval of encoded information using a devices camera') },
        { color: 'yellow', route: 'nfc', icon: 'cellphone-nfc', text: 'NFC', description: t('NFC enables contactless data exchange and transactions between devices.') }
    ];
    const [activeIndex, setActiveIndex] = useState({ current: 0, previous: null })
    const scale = useRef(new Animated.Value(0)).current;
    const scrollX = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        animate();
    }, [])
    useEffect(() => {
        animate();
    }, [activeIndex])
    const animate = () => {
        scale.setValue(0);
        Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 1, bounciness: 1000 }).start();
    }
    const onScroll = (e) => {
        const x = e.nativeEvent.contentOffset.x;
        let newIndex = Math.floor((x / itemWidth) + 0.5)
        if (activeIndex.current != newIndex) {
            setActiveIndex({ current: newIndex, previous: activeIndex.current })
        }
    }
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            {data.map((item, i) => (
                <Animated.View key={item.color} style={[styles.bgColor, {
                    zIndex: i == activeIndex.current ? 0 : (i == activeIndex.previous ? -1 : -2),
                    backgroundColor: item.color,
                    transform: [{ scale: i == activeIndex.current ? scale : 1 }]
                }]} />
            ))}
            <View style={styles.container} />
            <ScrollView
                horizontal
                pagingEnabled
                decelerationRate="fast"
                style={{ flexGrow: 0 }}
                contentContainerStyle={styles.scrollView}
                showsHorizontalScrollIndicator={false}
                snapToInterval={offset}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
                    useNativeDriver: false,
                    listener: onScroll
                })}>
                {data.map((item, i) => (
                    <Item key={item.color} data={item} i={i} scrollX={scrollX} navigation={navigation} />
                ))}
            </ScrollView>
            <View style={styles.indicatorContainer}>
                {data.map((item, i) => (
                    <View key={item.color} style={[styles.indicator, i == activeIndex.current && { backgroundColor: '#fff' }]} />
                ))}
            </View>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.backButtonText}>{t('Back')}</Text>
            </TouchableOpacity>
        </View>
    );
}

const Item = ({ i, data, scrollX, navigation }) => {
    const scale = scrollX.interpolate({
        inputRange: [-offset + i * offset, i * offset, offset + i * offset],
        outputRange: [0.9, 1, 0.9],
    });

    let iconComponent;
    switch (i) {
        case 0:
        case 1:
            iconComponent = <Entypo name={data.icon} size={108} />;
            break;
        case 2:
            iconComponent = <AntDesign name={data.icon} size={108} />;
            break;
        case 3:
            iconComponent = <MaterialCommunityIcons name={data.icon} size={108} />;
            break;
        default:
            iconComponent = null;
    }

    const handlePress = () => {
        if (data.route === 'nfc') {
            Alert.alert('404 NOT FOUND', 'Sorry.NFC is unavailable right now');
        } else {
            navigation.navigate(data.route);
        }
    };

    return (
        <Animated.View style={[styles.item, { transform: [{ scale }] }]}>
            <TouchableOpacity onPress={handlePress} style={styles.button}>
                <CustomText style={styles.iconText}>{data.text}</CustomText>
                {iconComponent}
                <CustomText style={styles.descriptionText}>{data.description}</CustomText>
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollView: {
        paddingHorizontal: padding,
        alignItems: 'center',
        paddingVertical: 10,
        zIndex: 1
    },
    item: {
        height: itemHeight,
        width: itemWidth,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: '#fff',
        elevation: 5,
    },
    bgColor: {
        position: 'absolute',
        height: height * 3 / 2,
        width: height * 3 / 2,
        borderRadius: height,
    },
    indicatorContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    indicator: {
        height: 10,
        width: 10,
        borderRadius: 5,
        marginHorizontal: 3,
        backgroundColor: '#444'
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
    },
    backButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: 'black',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    backButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    iconText: {
        fontSize: 24,
        
        marginBottom: 33,
    },
    descriptionText: {
        textAlign:'center',
        fontSize: 14,
        marginTop: 24,
        color: 'gray'
    }
});

export default Swiper5;
