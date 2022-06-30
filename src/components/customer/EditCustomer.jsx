import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { NavLink, useParams } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { postUpdateCustomerToApi } from '../../redux/forms/customerReducer';
import { getOneCustomerFromApi } from '../../redux/forms/oneCustomerReducer';
import '../addCostumer/AddCostumer.css';

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
  const [picture, setPicture] = useState(aCustomers.data.picture);
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
    };
    setIsPending(true);
    dispatch(postUpdateCustomerToApi(customer));
    console.log({ customer });
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
        <div className="form-group btn">
          {!isPending && <button type="submit">Add Customer</button>}
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

export default EditCustomer;
