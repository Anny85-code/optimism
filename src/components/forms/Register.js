import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserToApi } from '../../redux/forms/userReducer';

const Register = () => {
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

    dispatch(registerUserToApi(state));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="column mt-5">
          <div className="d-flex justify-content-center align-items-center flex-column shadow-lg rounded w-50 mx-auto p-5">
            <h3 className="text-center">Register user</h3>
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
                <label htmlFor="name" className="form-label">
                  Name
                  <input
                    type="text"
                    placeholder="Enter name"
                    onChange={onchange}
                    id="name"
                    name="name"
                    className="form-control"
                  />
                </label>
              </div>
              <br />
              <div>
                <label htmlFor="username" className="form-label">
                  username
                  <input
                    type="text"
                    placeholder="Enter username"
                    onChange={onchange}
                    id="username"
                    name="username"
                    className="form-control"
                  />
                </label>
              </div>
              <br />
              <div>
                <label htmlFor="email" className="form-label">
                  Email address
                  <input
                    type="email"
                    placeholder="Enter email"
                    onChange={onchange}
                    id="email"
                    name="email"
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
                    placeholder="Password"
                    onChange={onchange}
                    id="password"
                    name="password"
                    className="form-control"
                  />
                </label>
              </div>
              <br />
              <div>
                <label htmlFor="password_confirmation" className="form-label">
                  Password confirmation
                  <input
                    type="password"
                    placeholder="Password Confirmation"
                    onChange={onchange}
                    id="password_confirmation"
                    name="password_confirmation"
                    className="form-control"
                  />
                </label>
              </div>
              <br />
              <div>
                <label htmlFor="location" className="form-label">
                  Location
                  <input
                    type="password"
                    placeholder="Location"
                    onChange={onchange}
                    id="location"
                    name="location"
                    className="form-control"
                  />
                </label>
              </div>
              <br />
              <button
                type="submit"
                className="btn btn-secondary"
                onClick={handleSubmit}
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
