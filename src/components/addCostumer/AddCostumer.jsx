import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import { postCustomerToApi } from '../../redux/forms/customerReducer';
import './AddCostumer.css';

const AddCustomer = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [picture, setPicture] = useState('');
  // const [isPending, setIsPending] = useState(false);
  // const dispatch = useDispatch();
  // const dailyContribution = localStorage.getItem('dailyContibution');
  // dailyContribution = Number(dailyContribution);

  const handleSubmit = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const { id } = user.user;
    const customer = {
      user_id: id,
      name,
      email,
      phone,
      address,
      picture,
      // daily_contribution: dailyContribution,
    };
    localStorage.setItem('customer', JSON.stringify(customer));
    // setIsPending(true);
    // dispatch(postCustomerToApi(customer));

    // setIsPending(false);
    // localStorage.removeItem('dailyContibution');
  };

  return (
    <div className="form-container">
      <h3 className="title">Add Customer</h3>
      <form className="add-customer-form">
        <div className="form-group">
          <label htmlFor="name">
            Name *
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
            Phone *
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
            Address *
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
        <div className="form-group">
          <label htmlFor="picture">
            Picture
            <input
              type="text"
              className="form-control"
              id="picture"
              name="picture"
              placeholder="picture"
              value={picture}
              onChange={(e) => setPicture(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group-btn">
          <NavLink to="/additemcustomer" style={{ textDecoration: 'none' }}>
            <button
              type="button"
              className="add-item-btn"
              onClick={handleSubmit}
            >
              Add Items
            </button>
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default AddCustomer;
