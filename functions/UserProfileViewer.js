import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserProfileViewer = () => {
  const [userProfile, setUserProfile] = useState(null); // State to hold user profile
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Function to fetch username from AsyncStorage
    const fetchUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        setUsername(storedUsername);
      } catch (error) {
        console.error('Error fetching username:', error);
        Alert.alert(t('Error'), t('An error occurred while fetching username'));
      }
    };

    fetchUsername(); 
  }, []);

  useEffect(() => {
    // Function to fetch user profile from AsyncStorage
    const fetchUserProfile = async () => {
      try {
        const userProfileJSON = await AsyncStorage.getItem(username);
        const userProfile = JSON.parse(userProfileJSON);
        setUserProfile(userProfile);
        
      } catch (error) {
        console.error('Error fetching user profile:', error);
        Alert.alert(t('Error'), 'An error occurred while fetching user profile');
      }
    };

    if (username) {
      fetchUserProfile(); // Call the function to fetch user profile
    }
  }, [username]);

 


  return (
    <View style={{ flex: 1, padding: 20 }}>
    {userProfile ? (
      <View>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Username: {userProfile.username}</Text>
        <Text style={{ fontSize: 16 }}>Email: {userProfile.email}</Text>
        <Text style={{ fontSize: 16 }}>Password: {userProfile.password}</Text>

        {/* Diğer kullanıcı profil bilgilerini buraya ekleyebilirsiniz */}
      </View>
    ) : (
      <Text>Loading...</Text>
    )}
  </View>
  );
};

export default UserProfileViewer;
