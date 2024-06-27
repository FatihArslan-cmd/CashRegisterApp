import React, { createContext, useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo'; 
const OnlineStatusContext = createContext({ isOnline: false, toggleOnlineStatus: () => {} });

//To control online offline status all over the app

export const OnlineStatusProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(false);

  const updateOnlineStatus = (isConnected) => {
    setIsOnline(isConnected);
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      updateOnlineStatus(state.isConnected !== undefined ? state.isConnected : false);
    });

    return () => unsubscribe();
  }, []);

  const toggleOnlineStatus = () => {
  
    setIsOnline(prevState => !prevState);
  };

  return (
    <OnlineStatusContext.Provider value={{ isOnline, toggleOnlineStatus }}>
      {children}
    </OnlineStatusContext.Provider>
  );
};

export default OnlineStatusContext;
