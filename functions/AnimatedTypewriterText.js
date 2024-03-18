import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const AnimatedTypewriterText = ({ sentences, delay, speed, style }) => {
  const [animatedText, setAnimatedText] = useState('');
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (sentences.length !== currentSentenceIndex) startTypingAnimation();
    else setCurrentSentenceIndex(0);
  }, [currentSentenceIndex]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prevState => !prevState);
    }, 500);
    return () => {
      clearInterval(cursorInterval);
    };
  }, []);

  const startTypingAnimation = () => {
    const currentSentence = sentences[currentSentenceIndex];
    let index = 0;

    const typingInterval = setInterval(() => {
      setAnimatedText(prevState => prevState + currentSentence[index]);
      index++;

      if (index === currentSentence.length) {
        clearInterval(typingInterval);
        setTimeout(() => {
          setCurrentSentenceIndex(prevState => prevState + 1);
          setAnimatedText('');
        }, delay);
      }
    }, speed);
  };


  return (
    <View style={style}>
      <Text style={styles.text}>{animatedText}</Text>
      {showCursor && <Text style={styles.cursor}>|</Text>}
    </View>
  );
};

const AnimatedTyping = () => {
  return (
    <View style={styles.container}>
      <AnimatedTypewriterText
        sentences={[
          'Hi, Welcome to the app.',
          'To continue,choose one of the login method.',
          'You can change the language on the setting',
          'Enjoy your day!',
        ]}
        delay={1000}
        speed={70}
        style={styles.textContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  cursor: {
    fontSize: 18,
    marginBottom: 10,
    opacity: 0.6,
    position: 'absolute',
    right: -5
  },
});

export default AnimatedTyping;