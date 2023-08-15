import {createSlice} from '@reduxjs/toolkit';

const authState = {
  userDetails: null,
  isDarkMode:false
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState: authState,
  reducers: {
    resetAuth: state => {
      state.userDetails = {};
    },
    isDarkMode:( state, {payload}) => {
      state.isDarkMode = payload
    },
    logedInUser: (state, {payload}) => {
      state.userDetails = payload;
    },
    
  },
});

export const {resetAuth,isDarkMode, logedInUser,tabActive} = AuthSlice.actions;

export default AuthSlice.reducer;
