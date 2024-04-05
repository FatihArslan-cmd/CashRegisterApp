
import React, { createContext, useState } from 'react';

const OnlineStatusContext = createContext();

export const OnlineStatusProvider = ({ children }) => {
  const onlineStatus = true; 
  const [isOnline, setIsOnline] = useState(true);

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
