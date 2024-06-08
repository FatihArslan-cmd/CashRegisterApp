import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, Alert, FlatList, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const savedProducts = await AsyncStorage.getItem('products');
        if (savedProducts !== null) {
          setProducts(JSON.parse(savedProducts));
        }
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };
    loadProducts();
  }, []);

  // Save products to local storage whenever products state changes
  useEffect(() => {
    AsyncStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const handleSaveProduct = newProduct => {
    setProducts([...products, newProduct]);
  };

  const handleDeleteProduct = productId => {
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
  };

  const AddProductForm = () => {
    const [id, setId] = useState('');
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');

    const handleSave = () => {
      if (!id || !productName || !price) {
        Alert.alert('Error', 'Please fill in all required fields');
        return;
      }

      const newProduct = {
        id: id,
        name: productName,
        price: parseFloat(price),
        image: image || ''
      };

      setProducts([...products, newProduct]);

      setId('');
      setProductName('');
      setPrice('');
      setImage('');
    };

    return (
      <View style={{ margin: 20 }}>
        <TextInput
          placeholder="ID"
          value={id}
          onChangeText={text => setId(text)}
        />
        <TextInput
          placeholder="Product Name"
          value={productName}
          onChangeText={text => setProductName(text)}
        />
        <TextInput
          placeholder="Price"
          value={price}
          onChangeText={text => setPrice(text)}
          keyboardType="numeric"
        />
        <TextInput
          placeholder="Image URL (Optional)"
          value={image}
          onChangeText={text => setImage(text)}
        />
        <Button title="Save" onPress={handleSave} />
      </View>
    );
  };

  return (
    <View>
      <Text style={{ textAlign: 'center', fontSize: 20, marginVertical: 10 }}>Product List</Text>
      <Button title="Show All Products" onPress={() => setModalVisible(true)} />
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ margin: 20 }}>
          <Text style={{ textAlign: 'center', fontSize: 20, marginVertical: 10 }}>All Products</Text>
          <FlatList
            data={products}
            renderItem={({ item }) => (
              <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                <View style={{ flex: 1 }}>
                  <Text>ID: {item.id}</Text>
                  <Text>Name: {item.name}</Text>
                  <Text>Price: {item.price}</Text>
                  {item.image ? <Text>Image: {item.image}</Text> : null}
                </View>
                <View>
                  <Button title="Delete" onPress={() => handleDeleteProduct(item.id)} />
                </View>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
          <Button title="Close" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
      <AddProductForm />
    </View>
  );
};

export default App;
