import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Moment from 'moment';
import { getTransactionFromApi } from '../../redux/forms/transactionReducer';
// import { getCustomerFromApi } from '../../redux/forms/customerReducer';
import './Transactions.css';
// import Loader from '../loader/Loader';
/* eslint-disable */

const Transactions = () => {
  const dispatch = useDispatch();
  const transactions = useSelector(
    (state) => state.transactions?.data?.transactions
  );
  // const { customer_id } = transactions;
  // console.log(transactions);
  const customers = useSelector((state) => state.customer);
  const data = JSON.parse(localStorage.getItem('user'));
  const { user } = data || {};
  const admins = user.role === 'admin' || user.role === 'superadmin';
  const [sDate, setSDate] = useState(new Date());
  const [filtaTrans, setFiltaTrans] = useState([]);
  const [filtaTotal, setFiltaTotal] = useState(0);
  const [transNo, setTransNo] = useState(0);

  useEffect(() => {
    dispatch(getTransactionFromApi());
    // dispatch(getCustomerFromApi(customer_id));
  }, []);

  const handleFilter = () => {
    const selDate = sDate.toDateString();
    const sameDay = transactions.filter(
      (el) => selDate == new Date(el.created_at).toDateString()
    );
    const fTotal = sameDay.reduce((a, b) => a + +b.amount, 0);
    setFiltaTotal(fTotal);
    setFiltaTrans(sameDay);
    setTransNo(sameDay.length);
  };

  const comma = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  return (
    <div className="cust-tansact-container1">
      <div className="start-date-container">
        <h3 className="details start-d">Marketer Transaction details</h3>
        <p
          style={{ textAlign: 'center', color: 'crimson', marginLeft: '60px' }}
        >
          Please select a date
        </p>
        <div className="date-picker-container">
          <label htmlFor="start_date" className="start-date">
            <DatePicker
              // portalId="root-portal"
              dateFormat="yyyy/MM/dd"
              selected={sDate}
              // showMonthDropdown
              // showYearDropdown
              dropdownMode="select"
              onChange={(date) => setSDate(date)}
              style={{ margin: 0 }}
              className="start-date-picker"
            />
          </label>
          <button
            type="button"
            onClick={handleFilter}
            className="user-transact-btn"
          >
            Filter
          </button>
        </div>
      </div>
      <div className="transact-customer-container1">
        <div className="custrans-name1">
          <h4 className="columns">
            <span className="cus-name1">Customer's Name</span>
          </h4>
          <h4 className="columns i" id="a">
            Amount
          </h4>
          <h4 className="columns">
            <span className="cus-name2 ">Date</span>
          </h4>
        </div>
        <div className="custrans-name1">
          <h3 className="columns" id="col">
            <p className="custransactname"></p>
          </h3>
          <h3
            className="columns i"
            id="col"
            style={{
              borderRight: '2px solid crimson',
              borderBottom: '2px solid crimson',
            }}
          ></h3>
          <h3 className="columns" id="col" style={{ color: 'crimson' }}></h3>
        </div>
        {transactions &&
          filtaTrans.map((transaction) => {
            const permitted = admins || transaction.user_id === user.id;
            const aCustomer = {};
            customers.data.filter((customer) => {
              if (customer.id === transaction.customer_id) {
                aCustomer.name = customer.name;
              }
            });

            if (permitted) {
              return (
                <NavLink
                  key={transaction.id}
                  to={`/transactions/${transaction.id}`}
                >
                  <ul id="p-child">
                    <li>
                      <div className="custrans-name1">
                        <h4 className="columns" style={{ color: 'crimson' }}>
                          {aCustomer.name}
                        </h4>
                        <h4
                          className="columns i"
                          style={{ borderRight: '2px solid crimson' }}
                        >
                          {` NGN ${comma(transaction.amount)}`}
                        </h4>
                        <h4 className="columns" style={{ color: '#000' }}>
                          {Moment(transaction.created_at).format('MMMM DD, LT')}
                        </h4>
                      </div>
                    </li>
                  </ul>
                </NavLink>
              );
            }
          })}
      </div>
    </div>
  );
};
/* eslint-enable */

export default Transactions;
