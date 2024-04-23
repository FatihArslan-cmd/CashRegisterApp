import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Heading, NativeBaseProvider, VStack, Center, Button, Modal } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';
import { useNavigation, useRoute } from '@react-navigation/native';

const FavoriteModal = ({ SubTotal }) => {
    const [showModal, setShowModal] = useState(false);
    const [discountApplied, setDiscountApplied] = useState(false);
    const navigation = useNavigation();
   
    const applyDiscount = (SubTotal) => {
        if (!discountApplied) {
            const discountedTotal = (SubTotal * 0.8).toFixed(2);
           
            setDiscountApplied(true);
            navigation.navigate('Application', { campaignAlltotal: discountedTotal });
        } else {
            Alert.alert(
                "Discount Already Applied",
                "The discount has already been applied to the order.",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
        }
        
    };

    return (
        <NativeBaseProvider>
            <Animatable.View
                animation="fadeInUp"
                delay={500}
                useNativeDriver
            >
                <Center>
                    <TouchableOpacity style={styles.CampaignsButton} onPress={() => setShowModal(true)}>
                        <Text style={styles.enterButton}>Campaigns</Text>
                    </TouchableOpacity>
                    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                        <Modal.Content maxWidth="400px">
                            <Modal.CloseButton />
                            <Modal.Body>
                                <VStack style={styles.modalContainer} space={1} alignItems="center">
                                    <Heading>Campaigns</Heading>
                                    <Heading size="sm">Choose the one that you want to use</Heading>
                                    <TouchableOpacity onPress={() => applyDiscount()}>
                                        <MaterialIcons name={"discount"} size={24} color={"red"} style={styles.inputIcon} />
                                        <Text>Buy 3, Pay 2</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => applyDiscount()}>
                                        <MaterialIcons name={"discount"} size={24} color={"red"} style={styles.inputIcon} />
                                        <Text>20% discount for all products</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => applyDiscount()}>
                                        <MaterialIcons name={"auto-fix-normal"} size={24} color={"gray"} style={styles.inputIcon} />
                                        <Text>Set Default</Text>
                                    </TouchableOpacity>
                                </VStack>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button.Group space={2}>
                                    <Button variant="ghost" colorScheme="blueGray" onPress={() => { setShowModal(false); }}>
                                        Cancel
                                    </Button>
                                </Button.Group>
                            </Modal.Footer>
                        </Modal.Content>
                    </Modal>
                </Center>
            </Animatable.View>
        </NativeBaseProvider>
    );
};

const CampaignScreen = () => {
    const [favorites, setFavorites] = useState([]);
    const [showFavorites, setShowFavorites] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [total, setTotal] = useState(0);
    const route = useRoute();
    const { SubTotal, setAllTotal } = route.params || {};
    const onRefresh = async () => {
        setRefreshing(true);
        try {
            const storedFavorites = await AsyncStorage.getItem('favorites');
            if (storedFavorites !== null) {
                setFavorites(JSON.parse(storedFavorites));
            }
        } catch (error) {
            console.error('Error loading favorites:', error);
        }
        setRefreshing(false);
    };

    return (
        <View style={styles.container}>
            <FavoriteModal   SubTotal={SubTotal}  />
        </View>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flexGrow: 1,
        backgroundColor: '#fff',
        height: 200,
    },
    CampaignsButton: {
        backgroundColor: '#3e66ae',
        borderRadius: 10,
    },
    enterButton: {
        padding: 15,
        color: 'white',
        fontWeight: 'bold',
    },
    closeButton: {
        backgroundColor: '#3e66ae',
        marginTop: 10,
        padding: 10,
        borderRadius: 20,
    },
    closeButtonText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default CampaignScreen;
