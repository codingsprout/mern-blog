import Router from 'next/router';
import { useState } from 'react';
import { signin, authenticate } from '../../actions/auth';

export default function SigninComponent() {
  const [values, setValues] = useState({
    email: 'wao@wao.wao', //normally blank but fill in for purpose
    password: '123456', //normally blank but fill in for testing
    error: '',
    loading: false,
    message: '',
    showForm: true,
  });

  const { email, password, error, loading, message, showForm } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    //loading is set to true, then once we get data it is set to false
    setValues({ ...values, loading: true, error: false });
    const user = { email, password };

    signin(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        //save user token to cookie
        //save user info to local storage
        //auth user
        authenticate(data, () => {
          Router.push(`/`);
        });
      }
    });
  };

  const handleChange = (data) => (e) => {
    setValues({ ...values, error: false, [data]: e.target.value });
  };

  const showLoading = () =>
    loading ? <div className='alert alert-info'>Loading...</div> : '';
  const showError = () =>
    error ? <div className='alert alert-danger'>{error}</div> : '';
  const showMessage = () =>
    message ? <div className='alert alert-info'>{message}</div> : '';

  const signinForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            value={email}
            onChange={handleChange('email')}
            type='email'
            className='form-control'
            placeholder='Enter Email'
          />
          <input
            value={password}
            onChange={handleChange('password')}
            type='password'
            className='form-control'
            placeholder='Enter Password'
          />
        </div>

        <div>
          <button className='btn btn-primary'>Log in</button>
        </div>
      </form>
    );
  };
  return (
    <>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signinForm()}
    </>
  );
}
