import axios from 'axios';

export const getProductPrice = async (productId, productData, setProductData, subTotal, setSubTotal) => {
  try {
    const response = await axios.get('https://fatiharslan-cmd.github.io/mockjson/db.json');
    const data = response.data;

    if (!data.products || !Array.isArray(data.products)) {
      console.error('Product data is not in the expected format');
      throw new Error('Invalid product data format'); // Throw a specific error
    }

    const product = data.products.find(item => item.id === productId);
    if (!product) {
      throw new Error(`Product with ID ${productId} not found`); // Throw a specific error
    }

    const newProductData = [...productData, product];
    setProductData(newProductData);

    const newSubTotal = subTotal + product.price;
    setSubTotal(newSubTotal);
  } catch (error) {
    console.error('Error:', error);
    alert(error.message || 'An error occurred while fetching product data'); // Display user-friendly error message
  }
};
