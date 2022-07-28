import React from 'react';
// import { postCustomerToApi } from '../../redux/forms/customerReducer';
// import { postMyFoodToApi } from '../../redux/forms/myFoodReducer';
/* eslint-disable */
const CustomerPreview = () => {
  const handleSubmit = () => {
    // dispatch(postCustomerToApi(userData));
    // dispatch(postMyFoodToApi(total));
  };

  const customer = JSON.parse(localStorage.getItem('updated_customer'));
  const myFood = JSON.parse(localStorage.getItem('myfood'));
  console.log(customer, myFood);
  return (
    <div>
      <h1>CustomerPreview</h1>
    </div>
  );
};
/* eslint-enable */
export default CustomerPreview;
