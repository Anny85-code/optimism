import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../loader/Loader';
import { postMyFoodToApi } from '../../redux/forms/myFoodReducer';
import './CustomerPreview.css';
/* eslint-disable */
const CustomerPreview = () => {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customer);
  const fone = JSON.parse(localStorage.getItem('customer')).phone;
  const customer = customers.data.filter((cust) => cust.phone === fone);
  const myFood = JSON.parse(localStorage.getItem('myfood'));
  const grandTotal = myFood.reduce((a, b) => b.subTotal + a, 0);

  const handleSubmit = () => {
    const myFoodObj = {};
    myFood.map((fooda) => (myFoodObj[fooda.id] = fooda));

    const data = {
      customer_id: customer[0].id,
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

  // const handleEdit = () => {
  //   window.history.pushState({}, '', '/');
  //   window.location.reload();
  // };

  return (
    <div>
      {customer.length ? (
        <>
          {customer.map((cust) => (
            <div key={cust.id} className="containa cus-preview-container">
              <h1>Customer Info</h1>
              <div className="cus-details-container">
                <div className="image-container">
                  <img
                    src={cust.picture}
                    alt={`${cust.name}`}
                    className="cus-p-image"
                  />
                </div>
                <div className="details-container">
                  <h3 className="cus-details">Name: {cust.name}</h3>
                  <p className="cus-details">Phone: {cust.phone}</p>
                  <p className="cus-details">Email: {cust.email}</p>
                  <p className="cus-details">
                    Daily Contribution: NGN {cust.daily_contribution}
                  </p>
                  <p className="cus-details">Address: {cust.address}</p>
                </div>
              </div>
            </div>
          ))}
          <div>
            <h1>Customer Food Items</h1>
            {myFood.map((item) => (
              <div key={item.id}>
                <h3>Item: {item.name}</h3>
                <p>Price: {item.price}</p>
                <p>Qty: {item.qauntity}</p>
                <p>Sub total NGN {item.subTotal}</p>
              </div>
            ))}
            <p>Grand total NGN {grandTotal}</p>
          </div>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
          <button type="button" onClick={handleSubmit}>
            Add Customer
          </button>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};
/* eslint-enable */
export default CustomerPreview;
