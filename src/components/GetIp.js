import {useState, useEffect } from 'react';
import axios from 'axios';

//Get IP of the device

const GetIP = () => {
  const [ip, setIP] = useState("");

  const fetchIP = async () => {
    try {
      const response = await axios.get("https://api.ipify.org/?format=json");
      setIP(response.data.ip);
    } catch (error) {
      return 'Not found';
   }
  };

  useEffect(() => {
    fetchIP();
  }, []);

  return ip;
};

export default GetIP;
