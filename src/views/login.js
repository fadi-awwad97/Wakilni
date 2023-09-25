import React, { useState } from "react";
import "../assets/css/Login.css";
import { Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import userService from "../services/userServices";
import { setTokens } from '../storageProvider';
import { Link,useNavigate } from 'react-router-dom';


// Creating schema
const schema = Yup.object().shape({
  email: Yup.string()
    .required("Email is a required field")
    .email("Invalid email format"),
  password: Yup.string()
    .required("Password is a required field")
    .min(6, "Password must be at least 6 characters"),
});
 

function Login() {
  const navigate = useNavigate(); // Access the history object
  const [error, setError] = useState(null);
  const { mutate: logintheUser } = useMutation(userService.login, {
    onSuccess: (responseData) => {
      setTokens(responseData.data)
      navigate('/');
    },
    onError: (error) => {
      console.log(error.response.data.error);
      setError(error.response.data.error)
    },
  });

  return (
    <>
      <Formik
        validationSchema={schema}
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => {
          logintheUser(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <div className="login">
            <div className="form">
              <form noValidate onSubmit={handleSubmit}>
                <span>{error !=null ? error : "Login" }</span>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Enter email"
                  className="form-control inp_text"
                  id="email"
                />
                <p className="error">
                  {errors.email && touched.email && errors.email }
                </p>
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Enter password"
                  className="form-control"
                />
                <p className="error">
                  {errors.password && touched.password && errors.password}
                </p>
                <button type="submit">Login</button>
              </form>
              <p>
                Don't have an account? <Link to="/signup">Sign Up</Link>
              </p>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
}

export default Login;
