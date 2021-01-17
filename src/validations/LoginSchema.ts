import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email must be valid')
    .required('Email must not be empty'),
  password: Yup.string().required('Password must not be empty'),
});

export default LoginSchema;
