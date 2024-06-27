import React from 'react';
import { View, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const InformationRow = ({ label, value, iconName, iconColor, style }) => (

//Custom Button for userProfile

  
  <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>

    {iconName && <AntDesign name={iconName} size={20} color={iconColor} />}
    <Text style={{ marginLeft: iconName ? 10 : 0, fontWeight: 'bold', ...style }}>
      {label}: {value}
      </Text>
  
  </View>

);

export default InformationRow;
