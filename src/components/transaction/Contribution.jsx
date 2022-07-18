import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getOneCustomerFromApi } from '../../redux/forms/OneCustomerReducer';
import { getSeasonFromApi } from '../../redux/forms/seasonReducer';
/* eslint-disable */
import {
  getTransactionFromApi,
  postTransactionToApi,
} from '../../redux/forms/transactionReducer';
import './Contribution.css';

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
  let lastDate;
  // lastDate === null || lastDate === undefined
  lastTransaction.length
    ? (lastDate = lastTransaction[0]?.current_contribution_date)
    : (lastDate = '2022-08-12'); // Add start date of season here
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const transactionData = {
      user_id: user.id,
      amount,
      customer_id: +cardNumber,
      days_paid_for: daysNo,
      previous_contribution_date: lastDate,
      current_contribution_date: currentDate,
    };
    dispatch(postTransactionToApi(transactionData));
  };

  useEffect(() => {
    dispatch(getOneCustomerFromApi(cardNumber));
    dispatch(getTransactionFromApi());
    dispatch(getSeasonFromApi());
  }, []);

  return (
    <div className="contribution-form">
      <h2 className="title1">Contribution details</h2>
      <h3 className="details">Customer details</h3>
      <form onSubmit={handleSubmit} className="add-customer-form">
        <div className="contribution-container">
          <p>Name: {name}</p>
          <p>Daily Contribution: {daily_contribution}</p>
          <h3>Transaction Details</h3>
          <input
            type="number"
            className="form-control days-input"
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
        <NavLink to="/transactions" style={{ textDecoration: 'none' }}>
          <button
            type="button"
            className="add-customer-btn cont-btn"
            onClick={handleSubmit}
          >
            Add
          </button>
        </NavLink>
        ;
      </form>
    </div>
  );
};

/* eslint-enable */
export default Contribution;
