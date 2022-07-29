import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import Moment from 'moment';
import Loader from '../loader/Loader';
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

  useEffect(() => {
    dispatch(getOneUserTransFromApi(id));
  }, []);

  return (
    <div className="transact-customer-container">
      {trans ? (
        <>
          {trans.length <= 0 ? (
            <>
              <p className="no-trans user-no-tran">No transactions yet!</p>

              <button type="button" className="no-trans-btn user-btn">
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
                  <span className="cus-name1">Date</span>
                </h4>
                <h3 className="columns i" id="a">
                  <span className="cus-name1">Amount</span>
                </h3>
                <h3 className="columns">
                  <span className="cus-name1">Total amount collected</span>
                </h3>
              </div>
              <div className="custrans-name">
                <h3 className="columns" id="col">
                  <span className="cus-name1">
                    <p className="custransactname">{user_name}</p>
                  </span>
                </h3>
                <h3
                  className="columns i"
                  style={{ borderBottom: '2px solid crimson' }}
                >
                  <span className="cus-name1"></span>
                </h3>
                <h3
                  className="columns i"
                  style={{ borderBottom: '2px solid crimson' }}
                  id="a"
                >
                  <span className="cus-name1"></span>
                </h3>
                <h3 className="columns" id="col">
                  <span className="cus-name1"> {total}</span>
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
                          <span>
                            {Moment(transaction.created_at).format(
                              'MMMM DD, LT'
                            )}
                          </span>
                        </h4>
                        <h4
                          className="columns i"
                          style={{ borderRight: '2px solid crimson' }}
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
export default UserTransacts;
