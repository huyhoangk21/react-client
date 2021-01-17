import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Email must not be empty'),
  password: Yup.string().required('Password must not be empty'),
});

export default LoginSchema;
