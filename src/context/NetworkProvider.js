import React, { createContext, useState, useEffect } from 'react';
import { View, Text } from 'react-native';

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

