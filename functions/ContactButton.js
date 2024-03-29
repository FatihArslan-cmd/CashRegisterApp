import React, { useState } from "react";
import { Alert, Modal, Pressable, StyleSheet, Text, View,TouchableOpacity,Image,Linking } from "react-native";

const ContactMe = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const handlePressLinkedin = () => {
        Linking.openURL('https://www.linkedin.com/in/fatih-arslan-4582231b1/');
      };
    
      const handlePressGmail = () => {
        Linking.openURL('mailto:fatih.arslan12@ogr.sakarya.edu.tr');
      };
    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>You can contact me via</Text>
                        <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity onPress={handlePressLinkedin}>
          <Image source={require('../assets/icons8-linkedin-48.png')} style={styles.contactIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePressGmail}>
          <Image source={require('../assets/new.png')} style={styles.contactIcon} />
        </TouchableOpacity>
        </View>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Hide</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}
            >
            <Text style={styles.textStyle}>Contact Me</Text>
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
       
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "black",
    },
    buttonClose: {
        backgroundColor: "black",
        padding:18
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    contactIcon: {
        width: 60,
        height: 60,
        marginLeft: 10,
      },
});

export default ContactMe;