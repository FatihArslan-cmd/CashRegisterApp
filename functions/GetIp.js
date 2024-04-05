import React, { useState, useEffect } from 'react';

export default GetIP = () => {
  const [ip, setIP] = useState("");

  const fetchIP = async () => {
    try {
      const response = await fetch("https://api.ipify.org/?format=json");
      const data = await response.json();
      setIP(data.ip);
    } catch (error) {
      console.error('Error fetching IP address:', error);
    }
  };

  useEffect(() => {
    fetchIP();
  }, []);

  return ip;
};


