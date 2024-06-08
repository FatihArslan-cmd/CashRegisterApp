import React from 'react';
import {Input, Box, NativeBaseProvider,Icon} from 'native-base';
import Antdesign from 'react-native-vector-icons/AntDesign';
const SearchBar = () => {
  return (
    <NativeBaseProvider>
      <Box>
        <Input variant="rounded" mx="3" placeholder="Input" w="75%" h={10} InputLeftElement={<Icon as={<Antdesign name="search1" />} size={5} ml="2" color="muted.400" />}  />
      </Box>
    </NativeBaseProvider>
  );
};

export default SearchBar;
