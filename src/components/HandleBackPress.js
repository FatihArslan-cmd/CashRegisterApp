import React, { useEffect } from 'react';
import { BackHandler, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';

const BackPressHandle = () => {
  const { t } = useTranslation();
  const backHandlerSubscription = React.useRef(null); // Ref to store the subscription
  

  useEffect(() => {
    backHandlerSubscription.current = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    return () => {
      // Remove the event listener when the component unmounts to avoid memory leaks
      backHandlerSubscription.current && backHandlerSubscription.current.remove();
    };
  }, []);

  const handleBackPress = () => {
    Alert.alert(
      t('Exit App?'),                
     
      t('Are you sure you want to leave your account?'),
      [
        { 
          text: t('Yes'),
          onPress: () => navigation.navigate('Menu'),
          
        },
        {
          text: t('No'),
          onPress: () => console.log('Staying in the app'),
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
    // Returning true prevents the default back button behavior
    return true;
  };

  return (
    // Your component JSX
    <></>
  );
};

export default BackPressHandle;