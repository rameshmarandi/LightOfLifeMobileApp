import {createAsyncThunk} from '@reduxjs/toolkit';
import apiNames from '../apiNames';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import {StatusCodeManager} from '../../components/commonHelper';
import {logedInUser} from '../../features/auth';
import {store} from '../../utility/store';
import storage from '@react-native-firebase/storage';
const {btoa, atob} = require('abab');

export const AddProductAPI = createAsyncThunk(
  apiNames.products,
  async (payload, thunkAPI) => {
    try {
      let statusCode;
      let productID = uuid.v4();
      let logedInUser = store.getState().auth.userDetails;
      let ProductImageUrls = [];

      // Uploading the product image on server and generate the image link
      payload.productImages.map(async image => {
        // extracting image name &  image uri
        const reference = storage().ref(`${image.name}`);        
        const imageURL = `${image.uri}`;

        await reference.putFile(imageURL); // Uploading the file
        const url = await storage().ref(`${image.name}`).getDownloadURL(); // get download image url
        ProductImageUrls.push(url);
      });

      payload.productImages = ProductImageUrls;

      //Add Product on server
      let collectionName = firestore().collection(apiNames.products);
      await collectionName
        .doc(productID)
        .set({
          _id: productID,
          userId: logedInUser._id,
          addedBy: logedInUser.firstName,
          ...payload,
        })
        .then(async() => {          
          statusCode = 200;
        })
        .catch(err => {
          console.log(err);
        });
      return statusCode;
    } catch (err) {
      console.log(apiNames.vendors, ' error', err);
    }
    return false;
  },
);
export const GetProductAPI = createAsyncThunk(
  apiNames.products,
  async (payload, thunkAPI) => {
    try {
    let statusCode;
      let productID = uuid.v4();
      let logedInUser = store.getState().auth.userDetails;
      let ProductImageUrls = [];

      //Add Product on server
      let collectionName = firestore().collection(apiNames.products);
      await collectionName
        .where("userId", "==", logedInUser._id).get()
        .then((snapshot) => {
          console.tron.log("get product snapshort",JSON.stringify(snapshot));
          statusCode = 200;
        })
        .catch(err => {
          console.tron.log(err);
        });
      return statusCode;
    } catch (err) {
      console.log(apiNames.vendors, ' error', err);
    }
    return false;
  },
);
