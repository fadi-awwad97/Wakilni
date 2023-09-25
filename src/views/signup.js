import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import '../assets/css/SignupForm.css'; 
import { useMutation } from 'react-query';
import userService from '../services/userServices';
import { useNavigate } from 'react-router-dom';
import { setTokens } from '../storageProvider';

const SignupForm = () => {
  const initialValues = {
    username: '',
    email: '',
    password: '',
  };
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    username: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required').min(6, 'Password must be at least 6 characters'),
  });

  const { mutate:createtheUser, isSubmitting } = useMutation(userService.signup, {
    onSuccess: (responseData) => {
      setTokens(responseData.data)
      navigate('/');
    },
  });

  const handleSubmit = (values) => {
    createtheUser(values);
  };

  return (
    <div className="signup-form-container">
      <h2>Signup Form</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
       
          <Form className={`form-container ${isSubmitting ? 'form-container-submitting' : ''}`}>
            <div className="form-field">
              <label htmlFor="name">username</label>
              <Field type="username" id="username" name="username" />
              <ErrorMessage name="username" component="div" className="error" />
            </div>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div className="form-field">
              <label htmlFor="password">Password</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Sign Up'}
            </button>
          </Form>
    
      </Formik>
    </div>
  );
};

export default SignupForm;
