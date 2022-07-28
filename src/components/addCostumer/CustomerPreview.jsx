import React from 'react';
// import { postCustomerToApi } from '../../redux/forms/customerReducer';
// import { postMyFoodToApi } from '../../redux/forms/myFoodReducer';
/* eslint-disable */
const CustomerPreview = () => {
  const customer = JSON.parse(localStorage.getItem('updated_customer'));
  const myFood = JSON.parse(localStorage.getItem('myfood'));
  const grandTotal = myFood.reduce((a, b) => b.subTotal + a, 0);
  const handleSubmit = () => {
    // dispatch(postCustomerToApi(userData));
    // dispatch(postMyFoodToApi(total));
  };

  const { address, daily_contribution, email, name, phone, picture } = customer;

  console.log(customer, myFood);
  return (
    <div>
      <div>
        <h1>Customer Info</h1>
        <div>
          <img src={picture} alt={`${name}`} style={{ width: '70px' }} />
        </div>
        <div>
          <h3>Name: {name}</h3>
          <p>Phone: {phone}</p>
          <p>Email: {email}</p>
          <p>Daily Contribution: NGN {daily_contribution}</p>
          <p>Address: {address}</p>
        </div>
      </div>
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
    </div>
  );
};
/* eslint-enable */
export default CustomerPreview;
