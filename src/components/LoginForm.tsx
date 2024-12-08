import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function LoginForm() {
  const [emailStored, setEmailStored] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem('rememberedEmail');
    if (storedEmail) {
      setEmailStored(storedEmail);
    }
  }, []);

  const validate = (values: {
    email: string;
    password: string;
    rememberMe: boolean;
  }) => {
    const errors: Record<string, string> = {};

    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    }

    return errors;
  };

  const handleRememberMe = (remember: boolean, email: string) => {
    if (remember) {
      localStorage.setItem('rememberedEmail', email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }
  };

  return (
    <Formik
      initialValues={{
        email: emailStored || '',
        password: '',
        rememberMe: !!emailStored,
      }}
      validate={validate}
      onSubmit={(values, { resetForm, setSubmitting }) => {
        handleRememberMe(values.rememberMe, values.email);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          resetForm();
          setSubmitting(false);
        }, 3000);
      }}
    >
      {({ values, setFieldValue, isSubmitting }) => (
        <Form className="login-form" aria-labelledby="login-form">
          {success && (
            <div
              role="alert"
              aria-live="polite"
              className="login-success-message"
            >
              Login Successful!
            </div>
          )}

          <div className="login-field-group">
            <label htmlFor="email">Email</label>
            <Field
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              aria-required="true"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="login-error"
              role="alert"
            />
          </div>

          <div className="login-field-group">
            <label htmlFor="password">Password</label>
            <Field
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              aria-required="true"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="login-error"
              role="alert"
            />
          </div>

          <div className="login-check-group">
            <label htmlFor="rememberMe">Remember Me</label>
            <Field
              type="checkbox"
              name="rememberMe"
              aria-checked={values.rememberMe}
            />
          </div>

          <button
            type="submit"
            className="login-button"
            aria-label="Submit Login Form"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Login'}
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;
