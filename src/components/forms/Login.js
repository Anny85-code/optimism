import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logUserToApi } from '../../redux/forms/userReducer';
import './Login.css';

const Login = () => {
  const [state, setState] = useState({});
  const { error } = useSelector((state) => state.user);
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
  };

  return (
    <div className="splash-container">
      <div className="row">
        <div className="column mt-5">
          <div className="d-flex justify-content-center align-items-center flex-column shadow-lg rounded w-50 mx-auto p-5">
            <h3 className="text-center">LOG IN</h3>
            <br />
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
            <form>
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
                    className="form-control"
                  />
                </label>
              </div>
              <br />
              <div>
                <label htmlFor="password" className="form-label">
                  Password
                  <input
                    type="password"
                    data-testid="password-input"
                    placeholder="Password"
                    onChange={onchange}
                    id="password"
                    name="password"
                    className="form-control"
                  />
                </label>
              </div>
              <br />
              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-secondary"
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

export default Login;
