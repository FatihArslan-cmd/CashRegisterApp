import React, { createContext, useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo'; // Import for internet connectivity check
const OnlineStatusContext = createContext({ isOnline: false, toggleOnlineStatus: () => {} });

export const OnlineStatusProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(false);

  // Function to update online status based on internet connectivity
  const updateOnlineStatus = (isConnected) => {
    setIsOnline(isConnected);
  };

  // Effect hook to handle initial check and network connectivity changes
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      updateOnlineStatus(state.isConnected !== undefined ? state.isConnected : false); // Handle potential undefined state
    });

    // Cleanup function to remove listener on component unmount
    return () => unsubscribe();
  }, []);

  const toggleOnlineStatus = () => {
    // Simulate toggling online/offline state for testing purposes
    // (Remove this in production)
    setIsOnline(prevState => !prevState);
  };

  return (
    <OnlineStatusContext.Provider value={{ isOnline, toggleOnlineStatus }}>
      {children}
    </OnlineStatusContext.Provider>
  );
};

export default OnlineStatusContext;
