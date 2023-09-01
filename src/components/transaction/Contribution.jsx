/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getOneCustomerFromApi } from '../../redux/forms/OneCustomerReducer';
import { getOneCustomerTransFromApi } from '../../redux/forms/oneCustomerTransactReducer';
import { getSeasonFromApi } from '../../redux/forms/seasonReducer';
import { postTransactionToApi } from '../../redux/forms/transactionReducer';
import Notice from '../../utils/Notice';
import Loader from '../loader/Loader';
import './Contribution.css';
import { getItemFromApi } from '../../redux/forms/getItemsReducer';

const Contribution = () => {
  const { user } = JSON.parse(localStorage.getItem('user'));
  const { cardNumber } = localStorage;

  const customer = useSelector((state) => state.oneCustomer?.data);
  const transactions = useSelector((state) => state.customerTransactions);
  const seasons = useSelector((state) => state.seasons?.data);
  const products = useSelector((state) => state.item?.data);

  const lastSeason = seasons?.sort((a, x) => a.id - x.id)?.slice(-1);
  const isReady =
    customer.loading && transactions.loading && lastSeason.loading;
  const [lSea] = lastSeason;
  const [go, setGo] = useState(false);
  const [daysNo, setDaysNo] = useState(0);
  const [trDate, setTrDate] = useState(new Date().toLocaleDateString());
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  let validDate;
  let validAmount;

  const leastPrice = products.reduce((minPrice, currProduct) => {
    if (minPrice > +currProduct?.price) {
      const { price } = currProduct;
      return +price;
    }
    return minPrice;
  }, +products[0]?.price);

  useEffect(() => {
    dispatch(getOneCustomerFromApi(+cardNumber));
    dispatch(getOneCustomerTransFromApi(+cardNumber));
    dispatch(getSeasonFromApi());
    dispatch(getItemFromApi());
  }, []);

  const startDate = lSea?.start_date;
  const endDate = lSea?.end_date;
  const lastTransaction = transactions?.data?.trans
    ?.sort((a, b) => a.id - b.id)
    ?.slice(-1);
  const lastDate = lastTransaction?.[0]?.current_contribution_date ?? startDate;

  const date = new Date(lastDate);
  const AddDaysToDate = date.setDate(date.getDate() + daysNo);
  const convertDate = new Date(AddDaysToDate);
  const { name, daily_contribution } = customer;

  const handleDays = (e) => {
    // Total days customer has paid
    const input = +e.target.value;
    const daysPaid = transactions?.data?.total_days;
    const totalDays = input + daysPaid;

    // The number of days in the season
    const totalDaysInSeason =
      (new Date(endDate) - new Date(startDate)) / 86_400_000;
    if (input < 0 || totalDays > totalDaysInSeason) {
      setError('Invalid customer collection!');
    } else {
      setDaysNo(input);
      setGo(input >= 1);
    }
  };

  const amount = daysNo * daily_contribution;

  const currentDate =
    convertDate.getFullYear() +
    '-' +
    (convertDate.getMonth() + 1) +
    '-' +
    convertDate.getDate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const transactionData = {
      user_id: user.id,
      amount,
      v2_customer_id: +cardNumber,
      days_paid_for: daysNo,
      previous_contribution_date: lastDate,
      current_contribution_date: currentDate,
      transaction_date: trDate,
    };

    const tAmount = transactionData.amount;
    /* ===============  This assumes that there's an item in the season whose unit amount is 40  ===========*/
    validAmount = tAmount !== null && tAmount >= leastPrice;

    validDate =
      transactionData.current_contribution_date !== null &&
      transactionData.currentDate !== null &&
      transactionData.transaction_date !== null;

    if (validDate && validAmount) {
      dispatch(postTransactionToApi(transactionData));
    } else if (!validAmount) {
      setError(`Amount isn't valid`);
    } else {
      setError('Dates are not valid');
    }
  };

  return (
    <>
      {!isReady ? (
        <div className="contribution-form">
          <>
            <div className="inner-container">
              <h2 className="title1">Contribution details</h2>
            </div>
            <center style={{ color: 'crimson' }}>
              Enter no. of days to continue!
            </center>
            <h3 className="details">Customer details</h3>
            <form onSubmit={handleSubmit} className="add-customer-form">
              <div className="contribution-container">
                <p>Name: {name}</p>
                <p>Daily Contribution: {daily_contribution}</p>
                <h3 className="details t-details">Transaction Details</h3>
                <Notice message={error} role="error_msg" />
                <input
                  type="number"
                  className="form-control days-input"
                  id="days_number"
                  placeholder="No. of days"
                  required
                  autoCorrect="off"
                  onChange={handleDays}
                />
                <input
                  type="date"
                  className="form-control days-input"
                  name=""
                  max={endDate}
                  min={startDate}
                  onChange={(e) => setTrDate(e.target.value)}
                />
                <p>Amount: NGN {amount}</p>
                {seasons && (
                  <>
                    <p>Previous payment date: {lastDate}</p>
                    <p>Current payment date: {currentDate}</p>
                  </>
                )}
              </div>
              {go && (
                <NavLink
                  to={validDate ? '/transactions' : '/contribution'}
                  style={{ textDecoration: 'none' }}
                >
                  <button
                    type="button"
                    className="add-customer-btn cont-btn"
                    onClick={handleSubmit}
                  >
                    Add
                  </button>
                </NavLink>
              )}
            </form>
          </>
        </div>
      ) : (
        <>
          <Loader />
        </>
      )}
    </>
  );
};

/* eslint-enable */
export default Contribution;
