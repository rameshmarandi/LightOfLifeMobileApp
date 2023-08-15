
import uuid from 'react-native-uuid';
import { store } from '../utility/store';
import theme from '../utility/theme';

export const asyncKeys = {
  loginSession: '@IsLogdIn',
  token: '@Token',
};
export let userID = uuid.v4()


