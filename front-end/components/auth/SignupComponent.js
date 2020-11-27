import { useState } from 'react';
import { signup } from '../../actions/auth';

export default function SignupComponent() {
  const [values, setValues] = useState({
    name: 'cero', //normally these are blank but fill in just for test purpose
    email: 'wao@wao.wao', //normally blank but fill in for purpose
    password: '123456', //normally blank but fill in for testing
    error: '',
    loading: false,
    message: '',
    showForm: true,
  });

  const { name, email, password, error, loading, message, showForm } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    //loading is set to true, then once we get data it is set to false
    setValues({ ...values, loading: true, error: false });
    const user = { name, email, password };

    signup(user).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          error: '',
          loading: false,
          message: data.message,
          showForm: false,
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

  const signupForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            value={name}
            onChange={handleChange('name')}
            type='text'
            className='form-control'
            placeholder='Enter Name'
          />
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
          <button className='btn btn-primary'>Sign Up</button>
        </div>
      </form>
    );
  };
  return (
    <>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signupForm()}
    </>
  );
}
