import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { NavLink, useParams } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { postUpdateCustomerToApi } from '../../redux/forms/customerReducer';
/* eslint-disable */
import { getOneCustomerFromApi } from '../../redux/forms/OneCustomerReducer';
/* eslint-enable */
import '../addCostumer/AddCostumer.css';
import ImageUpload from '../images/imageUpload';

const EditCustomer = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const { id } = param;
  const aCustomers = useSelector((state) => state.oneCustomer);

  useEffect(() => {
    dispatch(getOneCustomerFromApi(id));
  }, []);

  const customerId = aCustomers.data.id;
  const [name, setName] = useState(aCustomers.data.name);
  const [email, setEmail] = useState(aCustomers.data.email);
  const [phone, setPhone] = useState(aCustomers.data.phone);
  const [address, setAddress] = useState(aCustomers.data.address);
  const [dailyContribution, setDailyContribution] = useState(
    aCustomers.data.daily_contribution
  );
  const picture = localStorage.getItem('image_str');
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    const { id } = user.user;
    const customer = {
      id: customerId,
      user_id: id,
      name,
      email,
      phone,
      address,
      picture,
      dailyContribution,
    };
    setIsPending(true);
    dispatch(postUpdateCustomerToApi(customer));
    setIsPending(false);
  };

  return (
    <div className="form-container">
      <h3 className="title">Add Customer</h3>
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="daily_contribution">
            Daily Contribution *
            <input
              type="text"
              className="form-control"
              id="daily_contribution"
              name="daily_contribution"
              required
              placeholder="daily Contribution"
              value={dailyContribution}
              onChange={(e) => setDailyContribution(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="picture">
            Picture
            {ImageUpload()}
          </label>
        </div>
        <div className="form-group btn1">
          {!isPending && (
            <button
              type="submit"
              className="btn1 btn-secondary1 add-marketer-btn"
            >
              Update Customer
            </button>
          )}
          {isPending && (
            <button type="submit" disabled>
              Updating Customer . . .
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EditCustomer;
