import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneCustomerFromApi } from '../../redux/forms/OneCustomerReducer';
// import { getTransactionFromApi } from '../../redux/forms/transactionReducer';
/* eslint-disable */
import {
  getTransactionFromApi,
  postTransactionToApi,
} from '../../redux/forms/transactionReducer';
const Contribution = () => {
  const dispatch = useDispatch();
  const { cardNumber } = localStorage;
  const customerDetails = useSelector((state) => state.oneCustomer);
  const customersTransactions = useSelector((state) => state.transactions);
  const myData = customersTransactions.data;
  let oneCustomerTransactions = [];

  myData.map((trans) => {
    if (trans.customer_id === +cardNumber) {
      oneCustomerTransactions.push(trans);
    }
  });

  const [daysNo, setDaysNo] = useState(0);
  const { data } = customerDetails;
  const lastTransaction = oneCustomerTransactions.slice(-1);
  const lastDate = lastTransaction[0]?.current_contribution_date;
  const date = new Date(lastDate);
  const AddDaysToDate = date.setDate(date.getDate() + daysNo);
  const convertDate = new Date(AddDaysToDate);
  const { name, daily_contribution } = data;
  const amount = daysNo * daily_contribution;
  const { user } = JSON.parse(localStorage.getItem('user'));

  const currentDate =
    convertDate.getFullYear() +
    '-' +
    (convertDate.getMonth() + 1) +
    '-' +
    convertDate.getDate();

  const handleDays = (e) => {
    setDaysNo(+e.target.value);
  };

  const transactionData = {
    user_id: user.id,
    amount,
    customer_id: +cardNumber,
    daysNo,
    previous_contribution_date: lastDate,
    current_contribution_date: currentDate,
  };

  console.log(transactionData);

  useEffect(() => {
    dispatch(getOneCustomerFromApi(cardNumber));
    dispatch(getTransactionFromApi());
    dispatch(postTransactionToApi(transactionData));
  }, []);

  return (
    <div>
      <h2>Customer Details</h2>
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
        <p>Previous payment date: {lastDate}</p>
        <p>Current payment date: {currentDate}</p>
      </div>
      <button type="submit" className="add-customer-btn">
        Add
      </button>
    </div>
  );
};

/* eslint-enable */
export default Contribution;
