import React from 'react';
import { useSelector } from 'react-redux';
import Loader from '../loader/Loader';
import { postCustomerToApi } from '../../redux/forms/customerReducer';
import { postMyFoodToApi } from '../../redux/forms/myFoodReducer';
/* eslint-disable */
const CustomerPreview = () => {
  const customers = useSelector((state) => state.customer);
  const fone = JSON.parse(localStorage.getItem('customer')).phone;
  const customer = customers.data.filter((cust) => cust.phone === fone);
  console.log(customers, customer);
  const myFood = JSON.parse(localStorage.getItem('myfood'));
  const grandTotal = myFood.reduce((a, b) => b.subTotal + a, 0);

  const handleSubmit = () => {
    const items = {
      item_id: myFood.id,
      quantity: myFood.qauntity,
      customer_id: myFood.customer_id,
    };
    dispatch(postCustomerToApi(customer));
    dispatch(postMyFoodToApi(items));
    localStorage.removeItem('updated_customer');
    localStorage.removeItem('myfood');
    localStorage.removeItem('customer');
    localStorage.removeItem('image_str');
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
            <div>
              <h1>Customer Info</h1>
              <div>
                <img
                  src={cust.picture}
                  alt={`${cust.name}`}
                  style={{ width: '70px' }}
                />
              </div>
              <div>
                <h3>Name: {cust.name}</h3>
                <p>Phone: {cust.phone}</p>
                <p>Email: {cust.email}</p>
                <p>Daily Contribution: NGN {cust.daily_contribution}</p>
                <p>Address: {cust.address}</p>
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
