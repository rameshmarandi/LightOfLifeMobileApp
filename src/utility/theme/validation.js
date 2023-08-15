import * as Yup from 'yup';

const login = Yup.object().shape({
  // mobile: Yup.string()
  //   .required('The mobile number is required')
  //   .matches(/^[0-9]+$/, 'Must be only digits')
  //   .min(10, 'Must be exactly 10 digits')
  //   .max(10, 'Must be exactly 10 digits'),
  Username: Yup.string().required('Please enter username '),

  Password: Yup.string().required('Please enter a passoword'),
});

const registerUser = Yup.object().shape({
  firstName: Yup.string().required('Enter your first name'),
  lastName: Yup.string().required('Enter your last name'),
  email: Yup.string()
    .required('Email is required!')
    .email('Please enter valid email'),
});
const registerCompny = Yup.object().shape({
  companyName: Yup.string().notRequired('Enter your company name'),
  GST_no: Yup.string().notRequired('Enter your GST Code'),
  mobile: Yup.string()
    .required('The mobile number is required')
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(10, 'Must be exactly 10 digits')
    .max(10, 'Must be exactly 10 digits'),
});
const registerPassword = Yup.object().shape({
  userName: Yup.string().required('Enter your user name'),
  password: Yup.string()
    .required(
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
    )
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[^\w]/, 'Password requires a symbol')
    .min(8, 'Password must be 8 characters long'),
  confirmpassword: Yup.string().oneOf(
    [Yup.ref('password')],
    'Both password need to be the same',
  ),
  // tpolicy: Yup.bool().required('read and select Terms & Conditions'),
});

const forgotPassword = Yup.object().shape({
  email: Yup.string()
    .required('Email is required!')
    .email('Please enter valid email'),
});

const changePassword = Yup.object().shape({
  password: Yup.string()
    .required(
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
    )
    .matches(/[A-Z]/, 'Password requires an uppercase letter')
    .matches(/[a-z]/, 'Password requires a lowercase letter')
    .matches(/[0-9]/, 'Password requires a number')
    .matches(/[^\w]/, 'Password requires a symbol')
    .min(8, 'Password must be 8 characters long'),
  confirmpassword: Yup.string().oneOf(
    [Yup.ref('password')],
    'Both password need to be the same',
  ),
});

const register = Yup.object().shape({
  FirstName: Yup.string().required('Enter your first name'),
  LastName: Yup.string().required('Enter your last name'),
  EmailAddress: Yup.string()
    .required('Email is required!')
    .email('Please enter valid email'),
  CompanyName: Yup.string().required('Enter your company name'),
  GST: Yup.string().required('Enter your GST Code'),
  mobile: Yup.string()
    .required('The mobile number is required')
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(10, 'Must be exactly 10 digits')
    .max(10, 'Must be exactly 10 digits'),
  Username: Yup.string().required('Please enter username '),

  Password: Yup.string()
    .min(
      8,
      'Please enter at least 8 Character, 1 uppercase character and 1 number',
    )
    .matches(
      /[A-Z]+/,
      'Please enter at least 8 Character, 1 uppercase character and 1 number',
    )
    .matches(
      /\d+/,
      'Please enter at least 8 Character, 1 uppercase character and 1 number',
    ),
  ConfirmPassword: Yup.string()
    .min(
      8,
      'Please enter at least 8 Character, 1 uppercase character and 1 number',
    )
    .matches(
      /[A-Z]+/,
      'Please enter at least 8 Character, 1 uppercase character and 1 number',
    )
    .matches(
      /\d+/,
      'Please enter at least 8 Character, 1 uppercase character and 1 number',
    ),
});
// const register1 = Yup.object().shape({
//     CompanyName: Yup.string()
//   .required('Enter your company name'),
//   GST: Yup.string()
//   .required('Enter your GST Code'),
//   mobile: Yup.string()
//   .required('The mobile number is required')
//   .matches(/^[0-9]+$/, 'Must be only digits')
//   .min(10, 'Must be exactly 10 digits')
//   .max(10, 'Must be exactly 10 digits'),

// });
const register2 = Yup.object().shape({
  // Username: Yup.string()
  // .required('Please enter username '),
  // Password: Yup.string()
  // .min(
  //   8,
  //   'Please enter at least 8 Character, 1 uppercase character and 1 number',
  // )
  // .matches(
  //   /[A-Z]+/,
  //   'Please enter at least 8 Character, 1 uppercase character and 1 number',
  // )
  // .matches(
  //   /\d+/,
  //   'Please enter at least 8 Character, 1 uppercase character and 1 number',
  // ),
  // ConfirmPassword: Yup.string()
  // .min(
  //   8,
  //   'Please enter at least 8 Character, 1 uppercase character and 1 number',
  // )
  // .matches(
  //   /[A-Z]+/,
  //   'Please enter at least 8 Character, 1 uppercase character and 1 number',
  // )
  // .matches(
  //   /\d+/,
  //   'Please enter at least 8 Character, 1 uppercase character and 1 number',
  // ),
});
export default validation = {
  login,
  registerUser,
  registerCompny,
  registerPassword,
  forgotPassword,
  changePassword,
  register,
};
