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
  const [select, setSelect] = useState('PLEASE SELECT ...');
  const data = JSON.parse(localStorage.getItem('user'));
  const { user } = data || {};

  const onchange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const picture = localStorage.getItem('image_str');
    const locationArea = state.location_area.toUpperCase();
    const userPostData = {
      ...state,
      avatar: picture,
      role: select.toLocaleLowerCase(),
      location_area: locationArea,
      user_id: user.id,
    };
    dispatch(registerUserToApi(userPostData));
  };

  const handleSelect = (e) => {
    setSelect(e.target.value);
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="form-container form1">
      <div className="form2">
        <div className="column mt-5">
          <div className="d-flex justify-content-center align-items-center flex-column shadow-lg rounded w-50 mx-auto p-5">
            <div className="inner-container">
              <h3 className="title">
                {user.role === 'supervisor'
                  ? 'Register A Marketer'
                  : 'Staff Registration'}
              </h3>
            </div>
            <br />
            {error ? (
              <div>
                {typeof error === 'string' ? (
                  <span>{error}</span>
                ) : (
                  error.map((errorItem) => (
                    <div key={errorItem}>
                      <center style={{ color: 'red' }}>{errorItem}</center>
                    </div>
                  ))
                )}
              </div>
            ) : (
              ''
            )}
            <form className="register-form">
              <div>
                <label htmlFor="name" className="form-label">
                  <span>
                    Name <span style={{ color: 'crimson' }}>*</span>
                  </span>
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
                  <span>
                    username <span style={{ color: 'crimson' }}>*</span>
                  </span>
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
                  <span>
                    Email address <span style={{ color: 'crimson' }}>*</span>
                  </span>
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
                  <span>
                    Password <span style={{ color: 'crimson' }}>*</span>
                  </span>
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
                  <i
                    id="eye"
                    className="fa fa-eye-slash"
                    onClick={togglePassword}
                  />
                </label>
              </div>
              <br />
              <div>
                <label htmlFor="password_confirmation" className="form-label">
                  <span>
                    Password confirmation
                    <span style={{ color: 'crimson' }}>*</span>
                  </span>
                  <input
                    type={passwordShown ? 'text' : 'password'}
                    placeholder="Password Confirmation"
                    onChange={onchange}
                    id="password_confirmation"
                    name="password_confirmation"
                    className="form-control"
                    autoComplete="off"
                    required
                  />
                  <i
                    id="eye"
                    className="fa fa-eye-slash"
                    onClick={togglePassword}
                  />
                </label>
              </div>
              <br />
              <div>
                <label htmlFor="location_area" className="form-label">
                  Location
                  <input
                    type="text"
                    placeholder="Location"
                    onChange={onchange}
                    id="location_area"
                    name="location_area"
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
                    {user.role === 'superadmin' && (
                      <option value="Admin">Admin</option>
                    )}
                    {user.role === 'admin' && (
                      <option value="Supervisor">Supervisor</option>
                    )}
                    {user.role === 'supervisor' && (
                      <option value="Marketer">Marketer</option>
                    )}
                  </select>
                </label>
              </div>
              <br />
              <div>
                <label htmlFor="phone" className="form-label">
                  <span>
                    Phone <span style={{ color: 'crimson' }}>*</span>
                  </span>
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
