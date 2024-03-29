/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { getOneCustomerFromApi } from '../../redux/forms/OneCustomerReducer';
import '../addCostumer/AddCostumer.css';
import ImageUpload from '../images/imageUpload';
import Loader from '../loader/Loader';
import { postUpdateCustomerToApi } from '../../redux/forms/customerReducer';
import './EditCustomer.css';

const EditCustomer = () => {
  const param = useParams();
  const dispatch = useDispatch();
  const { id } = param;
  const aCustomers = useSelector((state) => state.oneCustomer);
  const customer = aCustomers?.data;

  useEffect(() => {
    dispatch(getOneCustomerFromApi(id));
  }, []);

  const customerId = aCustomers.data.id;
  const [name, setName] = useState(customer?.name);
  const [email, setEmail] = useState(customer?.email);
  const [phone, setPhone] = useState(customer?.phone);
  const [address, setAddress] = useState(customer?.address);
  const [dailyContribution, setDailyContribution] = useState(
    customer?.daily_contribution
  );
  const [picture, setPicture] = useState(customer?.picture);

  const handleEditPic = () => {
    document.getElementById('img-editor').style.display = 'none';
    document.getElementById('new-img-editor').style.display = 'block';
  };

  const getCustomer = () => {
    // const user = JSON.parse(localStorage.getItem('user'));
    // const { id } = user.user;
    const customer = {
      id: customerId,
      // user_id: id,
      name,
      email,
      phone,
      address,
      picture,
      dailyContribution,
    };
    return customer;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPicture(localStorage.getItem('image_str'));
    const customer = getCustomer();
    localStorage.setItem('customer', JSON.stringify(customer));
  };

  const handleSave = () => {
    const customer = getCustomer();
    dispatch(postUpdateCustomerToApi(customer));
  };

  return (
    <div className="form-container edit-cus-cont">
      {aCustomers.data.name ? (
        <>
          <div className="inner-container">
            <h3 className="title">Update Customer</h3>
          </div>
          <form onSubmit={handleSubmit}>
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
            <div className="form-group">
              <label htmlFor="daily_contribution">
                <span>
                  Daily Contribution <span style={{ color: 'crimson' }}>*</span>
                </span>
                <input
                  disabled
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
            <br />
            <div id="img-editor">
              <label htmlFor="picture" className="form-label reg-edit">
                Picture
                <div className="image-container">
                  <img src={picture} alt={`${name}`} className="cus-image" />
                </div>
                <span onClick={handleEditPic} className="edit-cus-icon">
                  Edit
                </span>
              </label>
            </div>
            <div id="new-img-editor" style={{ display: 'none' }}>
              <label htmlFor="picture" className="form-label">
                <h4 className="p-text">Picture</h4>
                {ImageUpload}
              </label>
            </div>
            <div className="btn1 edit-cs-btn">
              <NavLink to="/addproducts" style={{ textDecoration: 'none' }}>
                <Tippy content="Select new items to change this customer's Daily contribution.">
                  <button
                    type="submit"
                    className="btn1 btn-secondary1 edit-cus-btn1 update-cus-button"
                  >
                    Update Customer Items
                  </button>
                </Tippy>
              </NavLink>
              <Tippy content="Complete the changes.">
                <button
                  onClick={handleSave}
                  type="submit"
                  className="btn1 btn-secondary1 edit-cus-btn1 update-cus-button"
                >
                  Save
                </button>
              </Tippy>
            </div>
          </form>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};
/* eslint-enable */
export default EditCustomer;
