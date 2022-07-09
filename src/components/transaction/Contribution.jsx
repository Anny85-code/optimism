import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneCustomerFromApi } from '../../redux/forms/OneCustomerReducer';
/* eslint-disable */
const Contribution = () => {
  const dispatch = useDispatch();
  const customerDetails = useSelector((state) => state.oneCustomer);
  const [daysNo, setDaysNo] = useState(0);
  const { data } = customerDetails;
  const handleDays = (e) => {
    console.log(+e.target.value);
    setDaysNo(+e.target.value);
  };

  const { cardNumber } = localStorage;
  console.log(cardNumber);

  useEffect(() => {
    dispatch(getOneCustomerFromApi(cardNumber));
  }, []);

  const { name, daily_contribution } = data;
  const amount = daysNo * daily_contribution;

  return (
    <div>
      <h2>Customer Details</h2>
      {/* {data.map((customer) => ( */}
      <div>
        <p>Name: {name}</p>
        <p>Daily Contribution: {daily_contribution}</p>
        <h2>Customer Details</h2>
        <input
          type="number"
          className="form-control"
          id="days_number"
          placeholder="No. of days"
          required
          autoCorrect="off"
          onChange={handleDays}
        />
        <p>Amount: NGN {amount}</p>
        <p>Previous payment date:</p>
        <p>Current payment date:</p>
      </div>
      {/* ))} */}
    </div>
  );
};

/* eslint-enable */
export default Contribution;
