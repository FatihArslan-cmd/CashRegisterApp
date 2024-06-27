import React, { createContext, useState, useEffect } from 'react';


//this function basiclly check if there is internet or not

// NetworkContext oluştur
export const NetworkContext = createContext();

// NetworkProvider bileşeni oluştur
export const NetworkProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    // İnternet bağlantısını dinle
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected);
    });

    // Temizleme
    return () => unsubscribe();
  }, []);

  return (
    <NetworkContext.Provider value={{ isOnline }}>
      {children}
    </NetworkContext.Provider>
  );
};

