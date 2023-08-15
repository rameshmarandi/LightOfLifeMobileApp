import axios from 'axios';
import {BASEURL} from '../../config/constants';
import {asyncKeys} from '../../config/constants';

export const Repository = axios.create({
  baseURL: BASEURL,
});

export const SecureRepository = axios.create({
  baseURL: BASEURL,
  headers: {
    Authorization: '',
  },
});

SecureRepository.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem(asyncKeys.token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete SecureRepository.defaults.headers.common.Authorization;
    }
    return config;
  },

  error => Promise.reject(error),
);
