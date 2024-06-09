import React, { useContext } from 'react';
import { View, FlatList, Text, TouchableOpacity, Modal, Image } from 'react-native';
import { NativeBaseProvider, Box, Menu, Pressable, HamburgerIcon, Heading } from 'native-base';
import { useTranslation } from 'react-i18next';
import { ThemeContext } from '../../../context/ThemeContext';
import ProductItem from './ProductItem';

const FavoritesModal = ({ showFavorites, setShowFavorites, favorites, assignAllFavorites, unFavoriteAll, toggleFavorite, memoizedIsFavorite }) => {
  const { t } = useTranslation();
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <Modal visible={showFavorites} animationType="slide">
      <View style={isDarkMode ? darkStyles.favoritesContainer : lightStyles.favoritesContainer}>
        <View style={{ flexDirection: 'row' }}>
          <NativeBaseProvider>
            <Box justifyContent={'center'} alignItems={'center'}>
              <Heading style={{ color: isDarkMode ? 'white' : 'black' }}>{t('Favorites')}</Heading>
              <Menu
                w="190"
                trigger={triggerProps => {
                  return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
                    <HamburgerIcon />
                  </Pressable>;
                }}
              >
                <Menu.Item onPress={assignAllFavorites}>{t('Favorite All Products')}</Menu.Item>
                <Menu.Item onPress={unFavoriteAll}>{t('Unfavorite All Products')}</Menu.Item>
              </Menu>
            </Box>
          </NativeBaseProvider>
        </View>

        {favorites.length === 0 ? (
          <View style={isDarkMode ? darkStyles.emptyContainer : lightStyles.emptyContainer}>
            <Image
              source={{ uri: 'https://bwmachinery.com.au/wp-content/uploads/2019/08/no-product-500x500.png' }}
              style={{ width: 200, height: 200, alignSelf: 'center', alignItems: 'center' }}
            />
          </View>
        ) : (
          <FlatList
            data={favorites}
            renderItem={({ item }) => (
              <ProductItem
                item={item}
                isFavorite={memoizedIsFavorite(item.id)}
                toggleFavorite={toggleFavorite}
              />
            )}
            keyExtractor={item => item.id.toString()}
          />
        )}

        <TouchableOpacity
          onPress={() => setShowFavorites(false)}
          style={{ backgroundColor: isDarkMode ? 'white' : 'black', marginTop: 'auto', borderRadius: 15 }}
        >
          <Text style={{ color: isDarkMode ? 'black' : 'white', padding: 10, textAlign: 'center', fontWeight: 'bold' }}>{t('Close')}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default FavoritesModal;

const commonStyles = {
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoritesContainer: {
    flex: 1,
    padding: 20,
  },
};

const lightStyles = {
  ...commonStyles,
};

const darkStyles = {
  ...commonStyles,
  favoritesContainer: {
    ...commonStyles.favoritesContainer,
    backgroundColor: '#1E1E1E',
  },
};
