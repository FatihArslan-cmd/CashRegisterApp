import React, { createContext, useState } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [productData, setProductData] = useState([]);
  const [SubTotal, setSubTotal] = useState(0);
  const [allTotal, setAllTotal] = useState(0);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [disableActions, setDisableActions] = useState(false); // State to disable actions
  const [discountApplied, setDiscountApplied] = useState(false); // State to disable actions
  const [change, setChange] = useState(0);
  const [enteredAmount, setEnteredAmount] = useState(0);
  const [paymentType, setPaymentType] = useState('');
  const [inputValue, setInputValue] = useState('');

  const value = {
    productData,
    setProductData,
    SubTotal,
    setSubTotal,
    allTotal,
    setAllTotal,
    paymentSuccess,
    setPaymentSuccess,
    disableActions,
    setDisableActions,
    discountApplied,
    setDiscountApplied,
    change,
    enteredAmount,
    paymentType,
    setPaymentType,
    setEnteredAmount,
    setChange,
    inputValue,
    setInputValue
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};