import React from 'react';
import { View, Modal, FlatList, Text, Image, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useTranslation } from 'react-i18next';
import FavoriteProductItem from './FavoriteProductItem';
import SearchBar from './SearchBar';
import ToastMessage from './ToastMessage';
import LoadingIndicator from '../../../components/LoadingIndicator';

const FavoritesModal = ({
  showFavorites,
  setShowFavorites,
  favorites,
  filteredFavorites,
  onSearch,
  onRefresh,
  refreshing,
  addToFavorites,
  isLoading,
  isDarkMode,
  showToast,
  showToastItem
}) => {
  const { t } = useTranslation();
  const styles = isDarkMode ? darkStyles : lightStyles;

  return (
    <Modal visible={showFavorites} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.favoritesContainer}>
          <Animatable.View animation="fadeInDown" delay={100} useNativeDriver>
            <Text style={styles.sectionTitle}>{t('Favorites')}</Text>
            <SearchBar
              placeholder={t('Search by name')}
              onChangeText={onSearch}
              isDarkMode={isDarkMode}
            />
            {isLoading && <LoadingIndicator />}
          </Animatable.View>
          {filteredFavorites.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Image
                source={{ uri: 'https://bwmachinery.com.au/wp-content/uploads/2019/08/no-product-500x500.png' }}
                style={styles.emptyImage}
              />
            </View>
          ) : (
            <Animatable.View animation="fadeInUp" delay={500} useNativeDriver>
              <Animatable.Text style={styles.tapToAddText} animation="slideInUp" iterationCount={3} direction="alternate">
                {t('Tap to add!')}
              </Animatable.Text>
              <FlatList
                data={filteredFavorites}
                renderItem={({ item }) => (
                  <FavoriteProductItem
                    item={item}
                    onPress={() => addToFavorites(item)}
                    isDarkMode={isDarkMode}
                    isLoading={isLoading}
                  />
                )}
                keyExtractor={(item) => item.id.toString()}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
              />
              {showToast && (
                <ToastMessage
                  message={`${showToastItem.name} ${t('has been added')}`}
                  isDarkMode={isDarkMode}
                />
              )}
            </Animatable.View>
          )}
        </View>
        <TouchableOpacity onPress={() => setShowFavorites(false)} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>{t('Close')}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const lightStyles = StyleSheet.create({
  modalContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  favoritesContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 10,
    textAlign: 'center',
    color: '#000',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImage: {
    width: 150,
    height: 150,
  },
  closeButton: {
    backgroundColor: 'orange',
    marginTop: 10,
    padding: 10,
    borderRadius: 20,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tapToAddText: {
    textAlign: 'center',
    color: '#000',
  },
});

const darkStyles = StyleSheet.create({
  modalContainer: {
    flexGrow: 1,
    backgroundColor: '#121212',
  },
  favoritesContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 10,
    textAlign: 'center',
    color: '#fff',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyImage: {
    width: 150,
    height: 150,
  },
  closeButton: {
    backgroundColor: 'orange',
    marginTop: 10,
    padding: 10,
    borderRadius: 20,
    alignSelf: 'center',
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tapToAddText: {
    textAlign: 'center',
    color: '#fff',
  },
});

export default FavoritesModal;
