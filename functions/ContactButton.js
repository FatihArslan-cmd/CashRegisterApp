import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View, TouchableOpacity, Image, Linking } from "react-native";
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ContactMe = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const handlePressLinkedin = () => {
        Linking.openURL('https://www.linkedin.com/in/fatih-arslan-4582231b1/');
    };
    
    const handlePressGmail = () => {
        Linking.openURL('mailto:fatih.arslan12@ogr.sakarya.edu.tr');
    };
    
    const handlePressGithub = () => {
        Linking.openURL('https://github.com/FatihArslan-cmd');
    };

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={styles.iconRow}>
                            <TouchableOpacity onPress={handlePressLinkedin}>
                                <AntDesign name={"linkedin-square"} size={48} color={"#0A78B5"}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handlePressGmail}>
                                <Image source={require('../assets/new.png')} style={styles.contactIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handlePressGithub}>
                                <AntDesign name={"github"} size={42} color={"black"} marginLeft={10}/>
                            </TouchableOpacity>
                        </View>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
           
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}
            >
                <View style={styles.contactContainer}>
                 <MaterialIcons name={"contact-page"} size={32} color={"white"}/>
                 <Text style={styles.textStyle}>Contact Me</Text>
                </View>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    contactContainer:{
      flexDirection:'row'
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 15,
        padding: 15,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#ffbf00",
    },
    buttonClose: {
        backgroundColor: "#00668b",
        padding: 8
    },
    textStyle: {
        marginTop:5,
        color: "white",
        fontWeight: "bold",
        fontSize:16
    },
    contactIcon: {
        width: 50,
        height: 50,
        marginLeft: 10,
    },
    iconRow: {
        flexDirection: 'row',
        margin: 10
    },
});

export default ContactMe;
