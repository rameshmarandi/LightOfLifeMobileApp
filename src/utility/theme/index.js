import {StyleSheet} from 'react-native';
// import {CardStyleInterpolators} from 'react-navigation-stack';

import assets from './assets';
import {getFontSize, getResHeight, hp, wp} from '../responsive';
import listData from './listData.json';
import validation from './validation';
const navigationOptions = {
  cardOptions: {
    headerShown: false,
    // cardShadowEnabled: true,
    // detachPreviousScreen: true,
    gestureResponseDistance: hp('50%'),
    gestureDirection: 'vertical',
  },
};

const regex = {
  percentage: /^(\d*\.{0,1}\d{0,2}$)/,
  email: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  instagram:
    /(?:(?:http|https):\/\/)?(?:www.)?(?:instagram.com|instagr.am)\/([A-Za-z0-9-_]+)/im,
  facebook: /^(https?:\/\/)?((w{3}\.)?)facebook.com\/.*/i,
  twitter: /^(https?:\/\/)?((w{3}\.)?)twitter\.com\/(#!\/)?[a-z0-9_]+$/i,
  linkedin:
    'http[s]?://www.linkedin.com/(in|pub|public-profile/in|public-profile/pub)/([w]{6}-[w]{1,}-[w]+)$',
  youtube:
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/,
};
const color = {
  primary:
    '#2F3B75', // ok //F99D27
  darkTheme:"#000f0b",
  secondary: '#E66EA7',
  iconCircleBg: '#343434',
  seletedBtn: '#303254',
  disabledBtn: 'rgba(48,50,84,0.8)',
  dimBlack: '#353535',
  dimGray: '#828282',
  lableColor: '#666666',
  white: '#FFFFFF',
  iceWhite:"#f9f9f9",
  dimWhite:"#f1f1f1",
  outlineColor: '#999999',
  placeholder: '#C0C0C0',
  error: '#FF0000',
  black: '#000000',
};

const font = {
  regular: 'Poppins Regular 400',
  semiBold: 'Poppins SemiBold 600',
  medium:"Poppins Medium 500",
  bold: 'Poppins Bold 700',
  boldItalic : 'Poppins Bold Italic 700',
  light :"Poppins Light 300",
  lightItalic :"Poppins Light Italic 300",
  thin :"Poppins Thin 250"
};

const fontSizes = {
  extraSmall: 10,
  small: 12,
  regular: 14,
  medium: 16,
  large: 18,
  extraLarge: 25,
  ultraLarge: 45,
};

const Radius = {
  small: 3,
  medium: 5,
  large: 7,
};

const styles = StyleSheet.create({
  inputPlaceholder: {
    color: '#232731B2',
    fontFamily: font.regular,
    fontSize: getFontSize(15),
    fontWeight: '400',
  },
  btnTitleStyle: {
    fontFamily: font.regular,
    fontSize: getFontSize(13),
    fontWeight: '600',
    color: color.accent,
  },
  inputTitle: {
    color: '#232323',
    // opacity: 0.7,
    fontFamily: font.Helvetica,
    fontSize: getFontSize(13),
    fontWeight: '500',
  },
  roundBtnShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: getResHeight(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 15,
  },
  cardEffect: {
    backgroundColor: color.accent,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: getResHeight(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 15,
  },
  profileCard: {
    width: wp('90%'),
    alignSelf: 'center',
    borderRadius: 8,
    backgroundColor: color.accent,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: getResHeight(2),
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 15,
  },
  homeTitle: {
    color: color.black,
    fontFamily: font.regular,
    fontSize: getFontSize(10),
    fontWeight: '400',
    textAlign: 'center',
  },
  homeFContainerStyle: {
    paddingHorizontal: '4.5%',
  },
  homeFStyle: {
    width: '100%',
    // marginTop: '2.5%',
  },
  categoryTitle: {
    color: color.black,
    fontFamily: font.regular,
    fontSize: getFontSize(11.5),
    fontWeight: '700',
    textAlign: 'center',
  },
});

const listDataArray = {
  yesNo: listData.YesNo,
  month: listData.monthList,
  gender: listData.gender,
  identifyProof: listData.identifyProof,
  addresProof: listData.addresProof,
  employmentProof: listData.employmentProof,
  educationProof: listData.educationProof,
  otherProofProof: listData.otherProof,
  summaryQue: listData.summary,
  educationType: listData.educationType,
  respect: listData.respect,
  LGI: listData.LGI,
};
const theme = {
  listDataArray,
  regex,
  color,
  font,
  fontSizes,
  Radius,
  marginHorizontal: 15,
  marginVerticle: 15,
  setPrimaryColor: function (color) {
    this.color.primary = color;
  },
  styles,
  assets,
  navigationOptions,
  validationSchema: validation,
};

export default theme;
