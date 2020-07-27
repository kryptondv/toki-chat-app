import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import emailRegex from '../utils/emailRegex';

const SignUpForm = ({ type, submitFormData, submitErr }) => {
  const signup = type === 'signup';

  const initialFormState = signup
    ? {
        email: '',
        password: '',
        passwordConfirmation: '',
      }
    : {
        email: '',
        password: '',
      };

  const initialErrorState = {
    emailErr: '',
    passwordErr: '',
    passwordConfirmationErr: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState(initialErrorState);

  // validate inputs
  const validateInputs = () => {
    let isValid = true;
    setError(initialErrorState);

    Object.keys(formData).forEach(key => {
      if (!formData[key]) {
        setError(prevState => ({
          ...prevState,
          [`${key}Err`]: 'Field is required',
        }));
        isValid = false;
      }
    });

    if (isValid && !emailRegex.test(formData.email)) {
      setError(prevState => ({
        ...prevState,
        emailErr: 'Please enter valid email adress',
      }));
      isValid = false;
    }

    if (isValid && formData.password.length < 6) {
      setError(prevState => ({
        ...prevState,
        passwordErr: 'Password must be at least 6 characters long',
      }));
      isValid = false;
    }

    if (
      signup &&
      isValid &&
      formData.password !== formData.passwordConfirmation
    ) {
      setError(prevState => ({
        ...prevState,
        passwordConfirmationErr: 'Passwords do not match',
      }));
      isValid = false;
    }
    return isValid;
  };

  // event handlers
  const onInputChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  };

  const onFormSubmit = e => {
    e.preventDefault();
    const isValid = validateInputs();
    if (isValid) {
      submitFormData(formData);
    }
  };

  // JSX for required field message
  const requiredFieldMessage = message => (
    <span className="form__error-msg">{message}</span>
  );

  return (
    <div className="form-container">
      <form onSubmit={onFormSubmit} className="form" noValidate>
        <h1 className="form__heading">{signup ? 'Sign Up' : 'Log In'}</h1>
        <div className="form__form-group">
          <label className="form__form-label" htmlFor="email">
            Email
          </label>
          <input
            className={`form__form-control ${
              error.emailErr ? 'form__form-control--error' : ''
            }`}
            value={formData.email}
            onChange={onInputChange}
            type="email"
            id="email"
            name="email"
          />
          {error.emailErr && requiredFieldMessage(error.emailErr)}
        </div>
        <div className="form__form-group">
          <label className="form__form-label" htmlFor="password">
            Password
          </label>
          <input
            className={`form__form-control ${
              error.passwordErr ? 'form__form-control--error' : ''
            }`}
            value={formData.password}
            onChange={onInputChange}
            type="password"
            id="password"
            name="password"
            placeholder={signup ? 'minimum 6 characters' : ''}
          />
          {error.passwordErr && requiredFieldMessage(error.passwordErr)}
        </div>
        {signup && (
          <div className="form__form-group">
            <label className="form__form-label" htmlFor="password">
              Confirm Password
            </label>
            <input
              className={`form__form-control ${
                error.passwordConfirmationErr ? 'form__form-control--error' : ''
              }`}
              value={formData.passwordConfirmation}
              onChange={onInputChange}
              type="password"
              id="confirm-password"
              name="passwordConfirmation"
            />
            {error.passwordConfirmationErr &&
              requiredFieldMessage(error.passwordConfirmationErr)}
          </div>
        )}
        <div className="form__form-group">
          <input
            className="btn form__btn"
            type="submit"
            value={signup ? 'submit' : 'log in'}
          />
          {submitErr && <span className="form__submit-err">{submitErr}</span>}
        </div>
      </form>
      <div className="form-redirect"></div>
      <h2 className="form-redirect__heading">
        {signup ? 'Already have an account?' : "Don't have an account?"}
      </h2>
      <Link to={signup ? 'login' : 'signup'} className="form-redirect__link">
        {signup ? 'Log In' : 'Sign Up'}
      </Link>
    </div>
  );
};

export default SignUpForm;
