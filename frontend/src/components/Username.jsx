import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import styles from '../styles/Username.module.css';
import logo from '../assets/Logo.png';
import { useAuth } from './AuthRouter';

function Username() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Required'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post('http://localhost:8080/login', values);
        const { token, user } = response.data.data[0]; // Adjusted to match your data structure
        login(token, user); // Update the authentication context
        navigate('/dashboard'); // Redirect to the dashboard
      } catch (error) {
        console.error('Error logging in:', error);
      }
    },
  });

  return (
    <div className='container mx-auto'>
      <div className='flex justify-center items-center min-h-screen'>
        <div className={`${styles.glass} shadow-lg flex flex-col items-center py-8 px-4`}>
          <div className="title flex flex-col items-center">
            <img src={logo} alt="Logo" className='w-18 h-22 mb-2' />
            <span className='py-2 text-sm italic w-2/3 text-center text-gray-600'>
              GenAI based Pharma marketing & Sales Toolkit
            </span>
          </div>
          <form className='py-1 w-full' onSubmit={formik.handleSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                className={styles.textbox}
                type="text"
                name="email"
                placeholder='Email Address'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className='text-red-500'>{formik.errors.email}</div>
              ) : null}
              <input
                className={styles.textbox}
                type="password"
                name="password"
                placeholder='Password'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className='text-red-500'>{formik.errors.password}</div>
              ) : null}
              <button className={styles.btn} type='submit'>
                Login
              </button>
            </div>
            <div className="text-center py-4">
              <span className='text-gray-500'>
                Not a Member? <Link className='text-red-500' to='/register'>Sign Up</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Username;
