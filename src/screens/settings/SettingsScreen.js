import React, { useContext, useState } from 'react';
import { View, StyleSheet, Image,Text } from 'react-native';
import LanguageButton from './LanguageButton';
import ShareEg from './ShareButton';
import ContactMe from './ContactButton';
import { NativeBaseProvider } from 'native-base';
import OnlineStatusToggle from './OnlineStatusToggle';
import DarkThemeButton from './DarkThemeButton';
import OnlineStatusInformer from '../../components/OnlineStatusInformer';
import { ThemeContext } from '../../context/ThemeContext';
import * as Animatable from 'react-native-animatable';
import { useFocusEffect } from '@react-navigation/native';

const SettingsScreen = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [animationKey, setAnimationKey] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      setAnimationKey(prevKey => prevKey + 1);
    }, [])
  );

  return (
    <NativeBaseProvider>
      <View style={[styles.container, isDarkMode && styles.darkContainer]}>
        <Animatable.View
          key={`animatable-view-1-${animationKey}`}
          animation="fadeInDownBig"
          delay={250}
          useNativeDriver
        >
          <View style={styles.row}>
            <DarkThemeButton />
            <ContactMe />
          </View>
          <View style={styles.row}>
            <ShareEg />
            <LanguageButton />
          </View>
        </Animatable.View>
        <Animatable.View
          key={`animatable-view-2-${animationKey}`}
          animation="fadeInUpBig"
          delay={250}
          useNativeDriver
          style={styles.ImageContainer}
        >
            <OnlineStatusToggle />
            <OnlineStatusInformer />
          <Image
            style={styles.image}
            source={require("../../../assets/image/ayı.png")}
          />
        <Text>© 2024 Fatih Arslan </Text>

        </Animatable.View>
      </View>
    </NativeBaseProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  darkContainer: {
    backgroundColor: '#1E1E1E',
  },
  ImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 300,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 30,
  },
});

export default SettingsScreen;
