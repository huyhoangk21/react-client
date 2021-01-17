import yup from 'yup';

const SignupSchema = yup.object().shape({
  username: yup
    .string()
    .min(6, 'Username must be between 6-15 characters')
    .max(15, 'Username must be between 6-15 characters')
    .required('Username must not be empty'),
  email: yup
    .string()
    .email('Email must be valid')
    .required('Email must not be empty'),
  password: yup
    .string()
    .min(6, 'Password must be between 6-15 characters')
    .max(15, 'Password must be between 6-15 characters')
    .required('Password must not be empty'),
});

export default SignupSchema;
