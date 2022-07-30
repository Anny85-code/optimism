import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import Moment from 'moment';
import { getOneCustomerTransFromApi } from '../../redux/forms/oneCustomerTransactReducer';
import Loader from '../loader/Loader';
import './CustomerTransaction.css';
/* eslint-disable */
const CustomerTransacts = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const { id } = param;
  const transactions = useSelector((state) => state.customerTransactions);
  const { data } = transactions;
  const { trans, user_name, total, total_days } = data || {};

  useEffect(() => {
    dispatch(getOneCustomerTransFromApi(id));
  }, []);

  return (
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
                  <span className="cus-name1">Customer's Name</span>
                </h4>
                <h4 className="columns i">Date</h4>
                <h4 className="columns i">Amount</h4>
                <h4 className="columns i" id="a">
                  Total days paid
                </h4>
                <h4 className="columns">
                  <span className="cus-name1 ">Total amount contributed</span>
                </h4>
              </div>

              <div className="custrans-name">
                <h3 className="columns" id="col">
                  <p className="custransactname">{user_name}</p>
                </h3>
                <h6
                  className="columns i"
                  style={{ borderBottom: '2px solid crimson' }}
                ></h6>
                <h6
                  className="columns i"
                  style={{ borderBottom: '2px solid crimson' }}
                ></h6>
                <h3
                  className="columns i"
                  id="col"
                  style={{
                    borderRight: '2px solid crimson',
                    borderBottom: '2px solid crimson',
                  }}
                >
                  {total_days}
                </h3>
                <h3 className="columns" id="col">
                  {` NGN ${total}` }
                </h3>
              </div>
              {trans.map((transaction) => (
                <NavLink
                  key={transaction.id}
                  to={`/transactions/${transaction.id}`}
                >
                  <ul>
                    <li>
                      <div className="custrans-name">
                        <h4 className="columns"></h4>
                        <h4 className="columns i" id="top">
                          {Moment(transaction.created_at).format('MMMM DD, LT')}
                        </h4>
                        <h4 className="columns i">{` NGN ${transaction.amount}` }</h4>
                        <h4
                          className="columns i"
                          style={{ borderRight: '2px solid crimson' }}
                        ></h4>
                        <h4 className="columns "></h4>
                      </div>
                    </li>
                  </ul>
                </NavLink>
              ))}
            </>
          )}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};
/* eslint-enable */
export default CustomerTransacts;
