import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserToApi } from '../../redux/forms/userReducer';
import ImageUpload from '../images/imageUpload';
import './Register.css';
/* eslint-disable */
const Register = () => {
  const [state, setState] = useState({});
  const [passwordShown, setPasswordShown] = useState(false);
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
    const picture = localStorage.getItem('image_str');
    const userPostData = { ...state, avatar: picture };
    dispatch(registerUserToApi(userPostData));
  };

  const [select, setSelect] = useState('PLEASE SELECT ...');

  const handleSelect = (e) => {
    setSelect(e.target.value);
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="form-container form1">
      <div className="form-group form2">
        <div className="column mt-5">
          <div className="d-flex justify-content-center align-items-center flex-column shadow-lg rounded w-50 mx-auto p-5">
            <h3 className="title">Register A Marketer</h3>
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
            <form className="register-form">
              <div>
                <label htmlFor="name" className="form-label">
                  Name *
                  <input
                    type="text"
                    placeholder="Name"
                    onChange={onchange}
                    id="name"
                    name="name"
                    className="form-control"
                    autoComplete="off"
                    required
                  />
                </label>
              </div>
              <br />
              <div>
                <label htmlFor="username" className="form-label">
                  username *
                  <input
                    type="text"
                    placeholder="Username"
                    onChange={onchange}
                    id="username"
                    name="username"
                    className="form-control"
                    autoComplete="off"
                    required
                  />
                </label>
              </div>
              <br />
              <div>
                <label htmlFor="email" className="form-label">
                  Email address *
                  <input
                    type="email"
                    placeholder="Email"
                    onChange={onchange}
                    id="email"
                    name="email"
                    className="form-control"
                    autoComplete="off"
                    required
                  />
                </label>
              </div>
              <br />
              <div>
                <label htmlFor="password" className="form-label">
                  Password *
                  <input
                    type={passwordShown ? 'text' : 'password'}
                    placeholder="Password"
                    onChange={onchange}
                    id="password"
                    name="password"
                    className="form-control"
                    autoComplete="off"
                    required
                  />
                  <i id="eye" className="fa fa-eye-slash" onClick={togglePassword}/>
                </label>
              </div>
              <br />
              <div>
                <label htmlFor="password_confirmation" className="form-label">
                  Password confirmation *
                  <input
                    type="password"
                    placeholder="Password Confirmation"
                    onChange={onchange}
                    id="password_confirmation"
                    name="password_confirmation"
                    className="form-control"
                    autoComplete="off"
                    required
                  />
                </label>
              </div>
              <br />
              <div>
                <label htmlFor="location" className="form-label">
                  Location
                  <input
                    type="text"
                    placeholder="Location"
                    onChange={onchange}
                    id="location"
                    name="location"
                    className="form-control"
                    autoComplete="off"
                  />
                </label>
              </div>
              <br />
              <div>
                <label htmlFor="role" className="form-label">
                  Position
                  <select
                    name="role"
                    id="role"
                    value={select}
                    onChange={handleSelect}
                  >
                    <option defaultValue="PLEASE SELECT ...">
                      PLEASE SELECT ...
                    </option>
                    <option value="Admin">Admin</option>
                    <option value="Marketer">Marketer</option>
                  </select>
                </label>
              </div>
              <br />
              <div>
                <label htmlFor="phone" className="form-label">
                  Phone *
                  <input
                    type="number"
                    placeholder="Phone"
                    onChange={onchange}
                    id="phone"
                    name="phone"
                    className="form-control"
                    autoComplete="off"
                    required
                  />
                </label>
              </div>
              <br />
              <div>
                <label htmlFor="address" className="form-label">
                  Address
                  <input
                    type="text"
                    placeholder="Address"
                    onChange={onchange}
                    id="address"
                    name="address"
                    className="form-control"
                    autoComplete="off"
                  />
                </label>
              </div>
              <br />
              <div>
                <label htmlFor="picture" className="form-label">
                  <h4 className="p-text">Picture</h4>
                  {ImageUpload()}
                </label>
              </div>
              <br />
              <div className="form-group btn1">
                <button
                  type="submit"
                  className="btn1 btn-secondary1 add-marketer-btn mark-btn"
                  onClick={handleSubmit}
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
/* eslint-disable */
export default Register;
