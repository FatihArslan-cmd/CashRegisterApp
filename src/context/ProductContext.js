import React, { createContext, useState } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productData, setProductData] = useState([]);
  const [SubTotal, setSubTotal] = useState(0);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const value = {
    productData,
    setProductData,
    setSubTotal,
    SubTotal,
    paymentSuccess,
    setPaymentSuccess
};
  return (
    <ProductContext.Provider value={value} >
      {children}
    </ProductContext.Provider>
  );
};
