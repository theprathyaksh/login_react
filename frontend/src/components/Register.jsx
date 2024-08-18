import React from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from '../styles/Username.module.css';
import logo from '../assets/Logo.png';
import axios from 'axios';

function Register() {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(2, 'Name must be at least 2 characters')
        .required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Required'),
    }),
    onSubmit: async (values) => {
        try {
          await axios.post('http://localhost:8080/reg', values);
          // Handle successful registration (e.g., redirect to login page or show success message)
          console.log('User registered successfully');
        } catch (error) {
          // Handle registration error (e.g., show error message)
          console.error('Error registering user:', error);
        }
      },
  });

  return (
    <div className='container mx-auto'>
      <div className='flex justify-center items-center min-h-screen'>
        <div className={`${styles.glass} shadow-lg flex flex-col items-center py-8 px-4`}>
          <div className="title flex flex-col items-center">
            <img src={logo} alt="Logo" className='w-18 h-22 mb-4' />
            <span className='py-4 text-sm italic w-2/3 text-center text-gray-600'>
              Register to access the GenAI based Pharma marketing & Sales Toolkit
            </span>
          </div>
          <form className='py-1 w-full' onSubmit={formik.handleSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                className={styles.textbox}
                type="text"
                name="name"
                placeholder='Name'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className='text-red-500'>{formik.errors.name}</div>
              ) : null}
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
                Sign Up
              </button>
            </div>
            <div className="text-center py-4">
              <span className='text-gray-500'>
                Already a Member? <Link className='text-red-500' to='/register'>Login</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
