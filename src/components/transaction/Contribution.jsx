import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneCustomerFromApi } from '../../redux/forms/OneCustomerReducer';
import { getTransactionFromApi } from '../../redux/forms/transactionReducer';
/* eslint-disable */
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
  // const day = new Date().getDate();
  // const month = new Date().getMonth();
  // const year = new Date().getFullYear();
  // const date = day + daysNo;
  // const presentDate = `${date}/${month}/${year}`;

  const handleDays = (e) => {
    setDaysNo(+e.target.value);
  };

  useEffect(() => {
    dispatch(getOneCustomerFromApi(cardNumber));
    dispatch(getTransactionFromApi());
  }, []);

  console.log(presentDate);

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
        <p>Previous payment date: {lastDate}</p>
        <p>Current payment date: {console.log('aja')}</p>
      </div>
      {/* ))} */}
    </div>
  );
};

/* eslint-enable */
export default Contribution;
