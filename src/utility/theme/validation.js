import * as Yup from 'yup';

//New Validation START
const prayerRequest = Yup.object().shape({
  name: Yup.string().required('Please enter your name'),
  email: Yup.string()
    .email('Please enter valid email')
    .required('Please enter valid email'),
});

//New Validation END
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

// Input filed validation

const OnlyCharacter = text => {
  let enterText = text.trim(); 
  enterText = enterText.replace(/\s+/g, ' '); // Removing all the extra space, it allow only one space between two words
  enterText = enterText.replace(/[^a-zA-Z ]/g, ''); // Remove all special characters

  return enterText;
};
const OnlyNumber = text => {
  let enterText = text.trim(); // Remove leading and trailing spaces
  enterText = enterText.replace(/\s+/g, ' '); // Removing all the extra space, it allow only one space between two words
   enterText = enterText.replace(/[^0-9]/g, ''); // Accept only number, remove the character & spceial letter

  return enterText;
};

const ValidateEmail = email => {
  let trimmedEmail = email.trim(); // Remove leading and trailing spaces
  trimmedEmail = trimmedEmail.replace(/\s+/g, ''); // Removing all spaces

  // Use a regular expression to check if the email contains only allowed characters
  const isValid = /^[A-Za-z0-9@]+$/.test(trimmedEmail);

  return isValid ? trimmedEmail : null; // Return the trimmed email or null if it's not valid
};

export default validation = {
  //New validation START
  prayerRequest,

  // Input field validation

  OnlyCharacter,
  OnlyNumber,
  ValidateEmail,
  //New validation END

  login,
  registerUser,
  registerCompny,
  registerPassword,
  forgotPassword,
  changePassword,
  register,
};
