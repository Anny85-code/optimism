import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { postCustomerToApi } from '../../redux/forms/customerReducer';
import './AddCostumer.css';

const AddCustomer = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [picture, setPicture] = useState('');
  const [isPending, setIsPending] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    const { id } = user.user;
    const customer = {
      user_id: id,
      name,
      email,
      phone,
      address,
      picture,
    };
    setIsPending(true);
    dispatch(postCustomerToApi(customer));
    setIsPending(false);
    localStorage.removeItem('dailyContibution');
  };

  const dailyContribution = localStorage.getItem('dailyContibution');

  return (
    <div className="form-container">
      <h3 className="title">Add Customer</h3>
      <form onSubmit={handleSubmit} className="add-customer-form">
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
        <div>
          <p>
            Daily contribution:
            {`NGN ${dailyContribution}.00`}
          </p>
        </div>
        <div className="form-group-btn">
          <NavLink to="/additemcustomer" style={{ textDecoration: 'none' }}>
            <button type="submit" className="add-item-btn">
              Add Item
            </button>
          </NavLink>
        </div>
        <div className="form-group btn1">
          {!isPending && (
            <button type="submit" className="add-customer-btn">
              Add Customer
            </button>
          )}
          {isPending && (
            <button type="submit" disabled>
              Adding Customer . . .
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddCustomer;
