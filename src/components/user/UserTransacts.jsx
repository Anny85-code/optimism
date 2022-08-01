import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import Moment from 'moment';
import Loader from '../loader/Loader';
import 'react-datepicker/dist/react-datepicker.css';
import { getOneUserTransFromApi } from '../../redux/forms/oneUserTransactReducer';
import './UserTransaction.css';
/* eslint-disable */
const UserTransacts = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const { id } = param;
  const transactions = useSelector((state) => state.userTransacts);
  const { data } = transactions;
  const { trans, user_name, total } = data || {};
  const [sDate, setSDate] = useState(new Date());
  const [filtaTrans, setFiltaTrans] = useState([]);
  const [filtaTotal, setFiltaTotal] = useState(0);
  const [transNo, setTransNo] = useState(0);

  useEffect(() => {
    dispatch(getOneUserTransFromApi(id));
  }, []);

  const handleFilter = () => {
    const selDate = sDate.toDateString();
    const sameDay = trans.filter(
      (el) => selDate == new Date(el.created_at).toDateString()
    );
    const fTotal = sameDay.reduce((a, b) => a + +b.amount, 0);
    setFiltaTotal(fTotal);
    setFiltaTrans(sameDay);
    setTransNo(sameDay.length);
  };

  const comma = (num) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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
      <div className="transact-customer-container">
        {trans ? (
          <>
            {trans.length <= 0 ? (
              <>
                <p className="no-trans">No transactions yet!</p>
                <button type="button" className="no-trans-btn">
                  <NavLink
                    to="/addtransaction"
                    style={{ textDecoration: 'none' }}
                  >
                    Add New Transaction
                  </NavLink>
                </button>
              </>
            ) : (
              <>
                <div className="custrans-name">
                  <h4 className="columns">
                    <span className="cus-name1">Collected by</span>
                  </h4>
                  <h4 className="columns i">
                    <span className="cus-name1">Date & Time</span>
                  </h4>
                  <h3 className="columns i">
                    <span className="cus-name1">Amount</span>
                  </h3>
                  <h3 className="columns i" d="a">
                    <span className="cus-name1">Total by filtered date</span>
                  </h3>

                  <h3 className="columns i " id="a">
                    <span className="cus-name1">No. of Transactions</span>
                  </h3>

                  <h3 className="columns">
                    <span className="cus-name1">Total amount collected</span>
                  </h3>
                </div>

                <div className="custrans-name">
                  <h4 className="columns" id="col">
                    <p className="custransactname">{user_name}</p>
                  </h4>
                  <h4
                    className="columns i"
                    style={{ borderBottom: '2px solid crimson' }}
                  ></h4>
                  <h3
                    className="columns i"
                    style={{ borderBottom: '2px solid crimson' }}
                  ></h3>
                  <h3 className="columns i" id="col">
                    {` NGN ${comma(filtaTotal)}`}
                  </h3>

                  <h3
                    className="columns i"
                    id="col"
                    style={{
                      borderRight: '2px solid crimson',
                      borderBottom: '2px solid crimson',
                    }}
                  >
                    {transNo}
                  </h3>

                  <h3 className="columns" id="col">
                    {`NGN ${comma(total)}`}
                  </h3>
                </div>
                {filtaTrans.length >= 1 ? (
                  filtaTrans.map((transaction) => (
                    <NavLink
                      key={transaction.id}
                      to={`/transactions/${transaction.id}`}
                    >
                      <ul id="p-child">
                        <li>
                          <div className="custrans-name">
                            <h4 className="columns"></h4>
                            <h4 className="columns i" id="top">
                              {Moment(transaction.created_at).format(
                                'MMMM DD, LT'
                              )}
                            </h4>
                            <h4 className="columns i">{`NGN ${comma(transaction.amount)}`}</h4>
                            <h4 className="columns i"></h4>
                            <h4
                              className="columns i"
                              style={{ borderRight: '2px solid crimson' }}
                            ></h4>
                            <h4 className="columns "></h4>
                          </div>
                        </li>
                      </ul>
                    </NavLink>
                  ))
                ) : (
                  <>
                    <p className="no-transact-p">No transactions to show!</p>
                  </>
                )}
              </>
            )}
          </>
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};
/* eslint-enable */
export default UserTransacts;
