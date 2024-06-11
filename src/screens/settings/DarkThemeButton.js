
import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';

const DarkThemeButton = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, isDarkMode ? styles.dayMode : styles.nightMode]} onPress={toggleTheme}>
        <View style={[styles.iconContainer, isDarkMode ? styles.dayIconContainer : styles.nightIconContainer]}>
          {isDarkMode ? (
            <Text style={styles.icon}>☀️</Text> // Day mode icon (Sun)
          ) : (
            <Text style={styles.icon}>🌙</Text> // Night mode icon (Moon)
          )}
        </View>
        <Text style={[styles.text, isDarkMode ? styles.dayText : styles.nightText]}>
          {isDarkMode ? 'DAY MODE' : 'NIGHT MODE'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  dayMode: {
    backgroundColor: '#e0e0e0', // Light gray background for day mode
  },
  nightMode: {
    backgroundColor: '#000', // Black background for night mode
  },
  iconContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  dayIconContainer: {
    backgroundColor: '#fff', // White background for day icon container
  },
  nightIconContainer: {
    backgroundColor: '#fff', // White background for night icon container
  },
  icon: {
    fontSize: 20,
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  dayText: {
    color: '#000', // Black text for day mode
  },
  nightText: {
    color: '#fff', // White text for night mode
  },
});

export default DarkThemeButton;
