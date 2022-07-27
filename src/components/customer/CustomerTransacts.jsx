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
  const { trans, user_name, total } = data || {};

  useEffect(() => {
    dispatch(getOneCustomerTransFromApi(id));
  }, []);

  return (
    <div className="transact-customer-container">
      {trans ? (
        <>
          {trans.length <= 0 ? (
            <>
              <p>No transactions yet!</p>
              <button type="button">
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
                <h4 className="columns i" id="a">
                  Amount
                </h4>
                <h4 className="columns">
                  <span className="cus-name1 ">Total amount contributed</span>
                </h4>
              </div>

              <div className="custrans-name">
                <h3 className="columns" id="col">
                  {user_name}
                </h3>
                <h6
                  className="columns i"
                  style={{ borderBottom: '2px solid #705050' }}
                ></h6>
                <h6
                  className="columns i"
                  id="a"
                  style={{ borderBottom: '2px solid #705050' }}
                ></h6>
                <h3 className="columns" id="col">
                  {total}
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
                        <h4
                          className="columns i"
                          id="top"
                          style={{ borderRight: '2px solid #705050' }}
                        >
                          {transaction.amount}
                        </h4>
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
