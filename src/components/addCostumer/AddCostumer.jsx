import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getSeasonFromApi } from '../../redux/forms/seasonReducer';
import ImageUpload from '../images/imageUpload';
import './AddCostumer.css';
/* eslint-disable */
const AddCustomer = () => {
  const dispatch = useDispatch();
  const seasons = useSelector((state) => state.seasons);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const picture = localStorage.getItem('image_str');
  const condition = name === '';
  const condition3 = phone.length != 11;
  const condition4 = address === '';
  const genTruth = condition || condition3 || condition4;
  const seasonData = seasons.data;
  const lastSeason = seasonData[seasonData.length - 1];

  useEffect(() => {
    dispatch(getSeasonFromApi());
  }, []);

  const handleAddItem = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const { id } = user.user;
    const customer = {
      user_id: id,
      season_id: lastSeason.id,
      name,
      email,
      phone,
      address,
      picture,
    };
    localStorage.setItem('customer', JSON.stringify(customer));
  };

  return (
    <div className="form-container update-cus-container">
      <div className="inner-container" id="cus-inner">
        <h3 className="title">Add Customer</h3>
      </div>
      <form className="add-customer-form">
        <div className="form-group">
          <label htmlFor="name">
            <span>
              Name <span style={{ color: 'crimson' }}>*</span>
            </span>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="email">
            Email
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="phone">
            <span>
              Phone <span style={{ color: 'crimson' }}>*</span>
            </span>
            <input
              type="number"
              className="form-control"
              id="phone"
              name="phone"
              placeholder="Phone"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="address">
            <span>
              Address <span style={{ color: 'crimson' }}>*</span>
            </span>
            <input
              type="text"
              className="form-control"
              id="address"
              name="address"
              required
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group-upload">
          <label htmlFor="picture">
            <h4 className="p-text">Picture</h4>
            {ImageUpload()}
          </label>
        </div>
        <div className="form-group-btn">
          {!genTruth && (
            <NavLink to="/addproducts" style={{ textDecoration: 'none' }}>
              <button
                type="button"
                className="add-item-btn"
                onClick={handleAddItem}
              >
                Add Items
                <i className="fa fa-arrow-right" id="toggle-btn" />
              </button>
            </NavLink>
          )}
        </div>
      </form>
    </div>
  );
};
/* eslint-enable */
export default AddCustomer;
