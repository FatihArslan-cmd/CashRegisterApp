import React, { useEffect } from 'react';
import { BackHandler, Alert } from 'react-native';

const BackPressHandle = () => {
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
      'Exit App?',
      'Are you sure you want to exit the app?',
      [
        {
          text: 'Yes',
          onPress: () => BackHandler.exitApp(), // Exits the app completely
        },
        {
          text: 'No',
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
