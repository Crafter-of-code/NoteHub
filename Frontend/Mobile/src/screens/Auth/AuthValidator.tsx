import * as yup from 'yup';
export const initialValueOfSignin = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};
export const initialValueOfLogin = {
  email: '',
  password: '',
};
export const SigninValidator = yup.object({
  name: yup.string().min(3).max(10).required('This is required field'),
  email: yup.string().email().required('please provide email'),
  password: yup.string().required('Please provide the password'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), 'the password have to be same'])
    .required('please write the confirm password'),
});
export const loginValidator = yup.object({
  email: yup.string().email().required('please enter your email'),
  password: yup.string().required('please enter your password'),
});
