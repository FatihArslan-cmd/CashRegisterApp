import { StyleSheet } from 'react-native';

export const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#d9e0e8',
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#ccc',
  },
  getPriceButton: {
    backgroundColor: '#028a3b',
    borderRadius: 10,
    marginLeft: 0,
    marginRight: 1,
  },
  CampaignsButton: {
    backgroundColor: '#3e66ae',
    borderRadius: 10,
  },
  enterButton: {
    padding: 15,
    color: 'white',
    fontWeight: 'bold',
  },
  subTotalContainer: {
    backgroundColor: '#1e445e',
    borderRadius: 10,
    margin: 5,
  },
  productTax: {
    color: 'gray',
    fontSize: 13,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
  },
  productIdInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
    flex: 1,
    backgroundColor: 'white',
  },
  productContainer: {
    padding: 9,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 15,
    marginBottom: 8,
    backgroundColor: 'white',
  },
  productPricesList: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    maxHeight: 260,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  productPrice: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  productId: {
    color: 'gray',
  },
  productName: {
    color: '#1e445e',
    fontWeight: 'bold',
  },
  productPriceValue: {
    color: '#E00012',
  },
  subTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 7,
    color: 'white',
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    borderRadius: 15,
  },
  addMultipleProducts: {
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    borderRadius: 15,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#CA0B00',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    padding: 10,
    borderRadius: 15,
    width: 90,
    height: 60,
  },
  confirmButton: {
    backgroundColor: '#3e66ae',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    padding: 10,
    borderRadius: 15,
    width: 85,
    height: 70,
  },
  cashButton: {
    backgroundColor: '#008b38',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    padding: 10,
    borderRadius: 15,
    width: 90,
    height: 70,
  },
  creditButton: {
    backgroundColor: '#008b38',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    padding: 10,
    borderRadius: 15,
    width: 90,
    height: 70,
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',

  },
  emptyContainer:{
    justifyContent:'center',
    alignItems:'center'
  }
});

export const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212',
    borderWidth: 1,
    borderColor: '#333',
    justifyContent: 'center',
  },
  emptyContainer:{
    justifyContent:'center',
    alignItems:'center'
  },
  separator: {
    height: 1,
    backgroundColor: '#121212',
  },
  getPriceButton: {
    backgroundColor: '#1e88e5',
    borderRadius: 10,
    marginLeft: 0,
    marginRight: 1,
  },
  CampaignsButton: {
    backgroundColor: '#1e88e5',
    borderRadius: 10,
  },
  enterButton: {
    padding: 15,
    color: 'white',
    fontWeight: 'bold',
  },
  subTotalContainer: {
    backgroundColor: '#333',
    borderRadius: 10,
    margin: 5,
  },
  productTax: {
    color: 'gray',
    fontSize: 13,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 15,
  },
  productIdInput: {
    borderColor: '#333',
    borderWidth: 1,
    padding: 10,
    borderRadius: 15,
    flex: 1,
    backgroundColor: '#222',
  },
  productContainer: {
    padding: 9,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 15,
    marginBottom: 8,
    backgroundColor: '#222',
  },
  productPricesList: {
    borderColor: '#333',
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    maxHeight: 260,
    backgroundColor: '#222',
    borderRadius: 15,
  },
  productPrice: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
    color: 'white',
  },
  productId: {
    color: 'gray',
  },
  productName: {
    color: '#bb86fc',
    fontWeight: 'bold',
  },
  productPriceValue: {
    color: '#cf6679',
  },
  subTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 7,
    color: 'white',
    textAlign: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    borderRadius: 15,
  },
  addMultipleProducts: {
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    borderRadius: 15,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor:'#CA0B00',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    padding: 10,
    borderRadius: 15,
    width: 90,
    height: 60,
  },
  confirmButton: {
    backgroundColor: '#1e88e5',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    padding: 10,
    borderRadius: 15,
    width: 85,
    height: 70,
  },
  cashButton: {
    backgroundColor: '#008b38',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    padding: 10,
    borderRadius: 15,
    width: 90,
    height: 70,
  },
  creditButton: {
    backgroundColor: '#008b38',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
    padding: 10,
    borderRadius: 15,
    width: 90,
    height: 70,
  },
  cancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
});
