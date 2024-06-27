import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import CountUpAnimation from '../../../components/AnimatedNumber';

const CounterItem = ({ label, value, duration, interval, showDollarSign, backgroundColor, isDarkMode }) => {
  const styles = isDarkMode ? darkStyles : lightStyles;

//CountUpAnimation implementation

  return (
    <View style={[styles.itemContainer,isDarkMode && styles.darkItemContainer, { backgroundColor }]}>
      <Text style={styles.label}>{label}</Text>
      <Animatable.View animation="pulse" iterationCount="infinite" style={styles.textBackground}>
        <CountUpAnimation
          targetNumber={value}
          duration={duration}
          interval={interval}
          style={styles.animation}
          showDollarSign={showDollarSign}
        />
      </Animatable.View>
    </View>
  );
};

const lightStyles = StyleSheet.create({
   itemContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
  label: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
  },
  textBackground: {
    borderRadius: 5,
  },
  animation: {
    marginTop: 5,
  },
});

const darkStyles = StyleSheet.create({
  itemContainer: {
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
  label: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
  },
  textBackground: {
    borderRadius: 5,
  },
  animation: {
    marginTop: 5,
  },
});

export default CounterItem;
