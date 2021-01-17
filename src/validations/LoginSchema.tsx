import yup from 'yup';

const LoginSchema = yup.object().shape({
  email: yup.string().required('Email must not be empty'),
  password: yup.string().required('Password must not be empty'),
});

export default LoginSchema;
