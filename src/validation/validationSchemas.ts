import * as yup from 'yup';

// Regular expression to validate:
// - Must contain only letters (a-z, A-Z) and numbers (0-9)
// - Must include at least 2 letters
const usernameRegex = /^(?=(.*[a-zA-Z]){2,})[a-zA-Z0-9]+$/;

// Validation schema for the Sign-In form
export const signInSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required') // Field is required
    .min(3, 'Username must be at least 3 characters') // Minimum length of 3 characters
    .matches(
      usernameRegex,
      'Username must contain only letters and numbers, with at least 2 letters'
    ), // Custom validation for allowed characters
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters') // Minimum length of 6 characters
    .required('Password is required'), // Field is required
});

// Validation schema for the Sign-Up form
export const signUpSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email') // Ensures a valid email format
    .required('Email is required'), // Field is required
  username: yup
    .string()
    .required('Username is required') // Field is required
    .min(3, 'Username must be at least 3 characters') // Minimum length of 3 characters
    .matches(
      usernameRegex,
      'Username must contain only letters and numbers, with at least 2 letters'
    ), // Custom validation for allowed characters
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters') // Minimum length of 6 characters
    .required('Password is required'), // Field is required
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match') // Must match the password field
    .required('Confirm password is required'), // Field is required
});
