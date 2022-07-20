import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logUserToApi } from '../../redux/forms/userReducer';
import './Login.css';
/* eslint-disable */
const Login = () => {
  const [state, setState] = useState({});
  const [passwordShown, setPasswordShown] = useState(false);
  const { error } = useSelector((state) => state.errors);

  const dispatch = useDispatch();

  const onchange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logUserToApi(state));
    window.history.pushState({}, '', '/');
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };


  return (
    <div className="splash-container login-container">
      <div className="row">
        <div className="column mt-5">
          <div className="d-flex justify-content-center align-items-center flex-column shadow-lg rounded w-50 mx-auto p-5">
            <h3 className="text-center">LOG IN</h3>
            <br />
            <center style={{ color: 'red' }}>
              {error ? (
                <div>
                  {typeof error === 'string' ? (
                    <span>{error}</span>
                  ) : (
                    error.map((errorItem) => (
                      <span key={errorItem}>{errorItem}</span>
                    ))
                  )}
                </div>
              ) : (
                ''
              )}
            </center>
            <form className="login-form">
              <div>
                <label htmlFor="username" className="form-label">
                  Username
                  <input
                    type="text"
                    data-testid="username-input"
                    placeholder="Username"
                    onChange={onchange}
                    id="username"
                    name="username"
                    className="form-control-login"
                  />
                </label>
              </div>
              <br />
              <div>
                <label htmlFor="password" className="form-label">
                  Password
                  <input
                    type={passwordShown ? 'text' : 'password'}
                    data-testid="password-input"
                    placeholder="Password"
                    onChange={onchange}
                    id="password"
                    name="password"
                    className="form-control-login"
                  />
                  <i
                    className="fa fa-eye-slash"
                    onClick={togglePassword}
                    id="login-eye"
                  />
                </label>
              </div>
              <br />
              <div className="form-group login-btn">
                <button
                  type="submit"
                  className="btn-login btn-secondary1"
                  onClick={handleSubmit}
                >
                  Log in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
/* eslint-enable */
export default Login;
