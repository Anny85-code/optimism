import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Loader from '../loader/Loader';
import { postMyFoodToApi } from '../../redux/forms/myFoodReducer';
import './CustomerPreview.css';
/* eslint-disable */
const CustomerPreview = () => {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customer);
  const fone = JSON.parse(localStorage.getItem('customer')).phone;
  const customer = customers?.data?.filter((cust) => cust.phone === fone);
  const myFood = JSON.parse(localStorage.getItem('myfood'));
  const grandTotal = myFood.reduce((a, b) => b.subTotal + a, 0);
  const id = customer[0]?.id;

  const handleSubmit = () => {
    const myFoodObj = {};
    myFood.map((fooda) => (myFoodObj[fooda.id] = fooda));

    const data = {
      customer_id: id,
      items: JSON.stringify(myFoodObj),
    };

    dispatch(postMyFoodToApi(data));
  };

  const handleCancel = () => {
    localStorage.removeItem('updated_customer');
    localStorage.removeItem('myfood');
    window.history.pushState({}, '', '/');
    window.location.reload();
  };

  const comma = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div className="cus-preview-main-container">
      {customer.length ? (
        <>
          {customer.map((cust) => (
            <div key={cust.id} className="cus-preview-container">
              <h1 className="details cus-info">Customer Info</h1>
              <div className="cus-details-container">
                <div className="image-container">
                  <img
                    src={cust.picture}
                    alt={`${cust.name}`}
                    className="cus-p-image"
                  />
                </div>
                <div className="details-container">
                  <h3 className="cus-details">
                    <span>Name:</span> {cust.name}
                  </h3>
                  <p className="cus-details">
                    <span>Phone:</span> {cust.phone}
                  </p>
                  <p className="cus-details">
                    <span>Email:</span> {cust.email}
                  </p>
                  <p className="cus-details">
                    <span>Daily Contribution:</span>
                    {` NGN ${comma(cust.daily_contribution)}`}
                  </p>
                  <p className="cus-details">
                    <span>Address:</span> {cust.address}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div className="food-item-mobile">
            <h1 className="details cus-info food-item">Customer Food Items</h1>
            <div className="transact-customer-container-p">
              <div className="custrans-name">
                <h4 className="columns">
                  <span className="cus-name1">Items</span>
                </h4>
                <h4 className="columns i">Price</h4>
                <h4 className="columns i">Quantity</h4>
                <h4 className="columns i" id="a">
                  Sub total
                </h4>
                <h4 className="columns">
                  <span className="cus-name1 ">Grand total</span>
                </h4>
              </div>
              <div className="custrans-name">
                <h3 className="columns" id="col">
                  <p className="custransactname"></p>
                </h3>
                <h6
                  className="columns i"
                  style={{ borderBottom: '2px solid crimson' }}
                ></h6>
                <h6
                  className="columns i"
                  style={{ borderBottom: '2px solid crimson' }}
                ></h6>
                <h3
                  className="columns i"
                  id="col"
                  style={{
                    borderRight: '2px solid crimson',
                    borderBottom: '2px solid crimson',
                  }}
                ></h3>
                <h3 className="columns" id="col">
                  {`NGN ${comma(grandTotal)}`}
                </h3>
              </div>
              {myFood.map((item) => (
                <ul className="n-child">
                  <li>
                    <div key={item.id} className="custrans-name">
                      <h4 className="columns">{item.name}</h4>
                      <h4 className="columns i" id="top">
                        {`NGN ${comma(item.price)}`}
                      </h4>
                      <h4 className="columns i">{item.qauntity}</h4>
                      <h4
                        className="columns i"
                        style={{ borderRight: '2px solid crimson' }}
                      >
                        {` NGN ${comma(item.subTotal)}`}
                      </h4>
                      <h4 className="columns "></h4>
                    </div>
                  </li>
                </ul>
              ))}
            </div>
          </div>
          <div className="cust-preview-btn">
            <button
              type="button"
              onClick={handleCancel}
              className="view-trans p-btn"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="view-trans p-btn"
            >
              Add Customer
            </button>
            <NavLink
              to={`/customers/${id}/edit`}
              style={{ textDecoration: 'none' }}
            >
              <button type="button" className="view-trans p-btn">
                Edit
              </button>
            </NavLink>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};
/* eslint-enable */
export default CustomerPreview;
