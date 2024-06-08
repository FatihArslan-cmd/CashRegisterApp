import React, { useRef, useEffect, useState,useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { ThemeContext } from '../context/ThemeContext';
const CountUpAnimation = ({ targetNumber, duration = 3000, interval = 30, style, showDollarSign}) => {
  const animationRef = useRef(null);
  const [currentNumber, setCurrentNumber] = useState(0);
  const step = Math.ceil(targetNumber / (duration / interval)); // Step amount
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    let intervalId;
    if (currentNumber < targetNumber) {
      intervalId = setInterval(() => {
        setCurrentNumber(prevNumber => {
          const newNumber = prevNumber + step;
          return newNumber > targetNumber ? targetNumber : newNumber;
        });
      }, interval);
    }

    return () => clearInterval(intervalId);
  }, [currentNumber, targetNumber]);

  return (
    <View style={[styles.container, style]}>
      <Animatable.Text animation="fadeIn" style={[styles.number, { color: isDarkMode ? 'white' : 'black' }]}>
        {currentNumber} {showDollarSign ? '$' : ''}
      </Animatable.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    fontSize: 48,
    fontWeight: 'bold',
  },
});

export default CountUpAnimation;
