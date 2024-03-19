import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const itemWidth = width / 5 * 4;
const itemHeight = height / 3 * 2;
const padding = (width - itemWidth) / 2;
const offset = itemWidth;

const data = [
    { color: 'green', route: 'Login', text: 'Email ' },
    { color: 'red', route: 'Finger', text: 'TouchID ' },
    { color: 'blue', route: 'Face', text: 'FaceID ' },
    { color: 'yellow', route: 'Application', text: 'Barcode ' }
];

const Swiper5 = () => {
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
                <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
        </View>
    );
}

const Item = ({ i, data, scrollX, navigation }) => {
    const scale = scrollX.interpolate({
        inputRange: [-offset + i * offset, i * offset, offset + i * offset],
        outputRange: [0.9, 1, 0.9],
    });
    return (
        <Animated.View style={[styles.item, { transform: [{ scale }] }]}>
            <TouchableOpacity onPress={() => navigation.navigate(data.route)} style={styles.button}>
                <Text >{data.text}</Text>
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
});

export default Swiper5;
