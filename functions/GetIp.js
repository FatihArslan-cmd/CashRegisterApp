import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetIP = () => {
  const [ip, setIP] = useState("");

  const fetchIP = async () => {
    try {
      const response = await axios.get("https://api.ipify.org/?format=json");
      setIP(response.data.ip);
    } catch (error) {
      console.error('Error fetching IP address:', error);
    }
  };

  useEffect(() => {
    fetchIP();
  }, []);

  return ip;
};

export default GetIP;
