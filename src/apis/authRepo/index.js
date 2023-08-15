import {createAsyncThunk} from '@reduxjs/toolkit';
import apiNames from '../apiNames';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import {StatusCodeManager} from '../../components/commonHelper';
import { logedInUser } from '../../features/auth';
import auth from '@react-native-firebase/auth';
const { btoa ,atob} = require('abab');

export const RegisterNewUserAPI = createAsyncThunk(
  apiNames.vendors,
  async (payload, thunkAPI) => {
    try {
      let statusCode;
      let userID = uuid.v4();

      let collectionName = firestore().collection(apiNames.vendors);
      await collectionName
        .where('email', '==', payload.email)
        .get()
        .then(async snapShot => {
          //check if user already has exist
          if (snapShot.docs.length !==0) {
            statusCode = StatusCodeManager(409);
          } else {
            //Encryption of the password
              payload.password= btoa(`${payload.password}`)
            //Create New user
            await collectionName.doc(userID).set({...payload, _id: userID});
            statusCode = 200
          }
        });
        return statusCode
    } catch (err) {
      console.log(apiNames.vendors, ' error', err);
    }
    return false;
  },
);
export const LoginAPI = createAsyncThunk(
  apiNames.vendors,
  async (payload, thunkAPI) => {
    try {
      let statusCode;
      let collectionName = firestore().collection(apiNames.vendors);
      await collectionName
        .where('email', '==', payload.email)
        .get()
        .then(snapShot => {
          //Check user not registerd
          if (snapShot.docs.length == 0) {
            statusCode = StatusCodeManager(404);
          }
          //invalid crads check
          else if (
            snapShot.docs !== [] &&
           atob(`${snapShot.docs[0].data().password}`) // decript the password
             !== payload.password
          ) {
            statusCode = StatusCodeManager(401);
          } else {
            delete snapShot.docs[0].data().password //removing password before store in redux
             thunkAPI.dispatch(logedInUser(snapShot.docs[0].data()))            
            return (statusCode = 200);
          }
        });
      return statusCode;
    } catch (err) {
      console.log(apiNames.vendors, ' error', err);
    }
    return false;
  },
);
export const sendOTPViaEmail = async (email, otp) => {
  try {
    // console.tron.log("send otp function invoked",)
    let email = "ramesh.marandi@aiab.in";
    let otp = "555885"
    const res = await auth().createUserWithEmailAndPassword(email, otp);
    // let res =  await auth()._nativeModule.createUserWithEmailAndPassword(email, otp)
    console.tron.log('User registered with temporary password (OTP).',res);
    
  } catch (error) {
    console.log('Error sending OTP via email:', error);
  }
};