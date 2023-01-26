import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import Moment from 'moment';
import { getOneCustomerTransFromApi } from '../../redux/forms/oneCustomerTransactReducer';
import Loader from '../loader/Loader';
import './CustomerTransaction.css';
import comma from '../../utils/Comma';
/* eslint-disable */
const CustomerTransacts = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const { id } = param;
  const transactions = useSelector((state) => state.customerTransactions);
  const { data } = transactions;
  const { trans, user_name, total, total_days } = data || {};
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const { user } = currentUser || {};

  useEffect(() => {
    dispatch(getOneCustomerTransFromApi(id));
  }, []);

  return (
    <>
      {trans ? (
        <div className="transact-customer-container">
          <>
            {trans.length <= 0 ? (
              user.role === 'supervisor' ? (
                <p className="no-trans">No transactions yet!</p>
              ) : (
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
              )
            ) : (
              <>
                <div className="custrans-name">
                  <h4 className="columns">
                    <span className="cus-name1">Customer's Name</span>
                  </h4>
                  <h4 className="columns i">Date & Time</h4>
                  <h4 className="columns i">Amount</h4>
                  <h4 className="columns i" id="a">
                    Total days paid
                  </h4>
                  {user.role === 'admin' && (
                    <h4 className="columns">
                      <span className="cus-name1 ">
                        Total amount contributed
                      </span>
                    </h4>
                  )}
                </div>

                <div className="custrans-name">
                  <h3 className="columns" id="col">
                    <p className="custransactname">{user_name}</p>
                  </h3>
                  <h3
                    className="columns i"
                    style={{ borderBottom: '2px solid crimson' }}
                  ></h3>
                  <h3
                    className="columns i"
                    style={{ borderBottom: '2px solid crimson' }}
                  ></h3>
                  <h3
                    className="columns i"
                    id="col"
                    style={{
                      borderRight: '2px solid crimson',
                      borderBottom: '2px solid crimson',
                      color: 'crimson',
                    }}
                  >
                    {total_days}
                  </h3>
                  {user.role === 'admin' && (
                    <h3
                      className="columns"
                      id="col"
                      style={{ color: 'crimson' }}
                    >
                      {` NGN ${comma(total)}`}
                    </h3>
                  )}
                </div>
                {trans?.map((transaction) => (
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
                          <h4 className="columns i">{` NGN ${comma(
                            transaction.amount
                          )}`}</h4>
                          <h4
                            className="columns i"
                            style={{ borderRight: '2px solid crimson' }}
                          >
                            {transaction.days_paid_for} days
                          </h4>
                          {user.role === 'admin' && (
                            <h4 className="columns"></h4>
                          )}
                        </div>
                      </li>
                    </ul>
                  </NavLink>
                ))}
                <div className="custrans-name">
                  <h4 className="columns">
                    <span className="cus-name1"></span>
                  </h4>
                  <h4 className="columns i"></h4>
                  <h4 className="columns i"></h4>
                  <h4 className="columns i" id="a"></h4>
                  {user.role === 'admin' && (
                    <h4 className="columns">
                      <span className="cus-name1 ">
                        Total amount contributed
                      </span>
                    </h4>
                  )}
                </div>

                <div className="custrans-name">
                  <h3 className="columns" id="col">
                    <p className="custransactname"></p>
                  </h3>
                  <h3
                    className="columns i"
                    style={{ borderBottom: '2px solid crimson' }}
                  ></h3>
                  <h3
                    className="columns i"
                    style={{ borderBottom: '2px solid crimson' }}
                  ></h3>
                  <h3
                    className="columns i"
                    id="col"
                    style={{
                      borderRight: '2px solid crimson',
                      borderBottom: '2px solid crimson',
                      color: 'crimson',
                    }}
                  ></h3>
                  {user.role === 'admin' && (
                    <h3
                      className="columns"
                      id="col"
                      style={{ color: 'crimson' }}
                    >
                      {` NGN ${comma(total)}`}
                    </h3>
                  )}
                </div>
              </>
            )}
          </>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};
/* eslint-enable */
export default CustomerTransacts;
