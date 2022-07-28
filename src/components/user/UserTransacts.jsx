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
    <div>
      {trans ? (
        <>
          {trans.length <= 0 ? (
            <>
              <div className="user-no-tran">
                <p className="no-trans">No transactions yet!</p>
              </div>
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
              <div>
                <h3>
                  <span className="cus-name">Collected by:</span>
                  {user_name}
                </h3>
                <h3>
                  <span className="cus-name">Total amount collected:</span>
                  {total}
                </h3>
              </div>
              {trans.map((transaction) => (
                <NavLink
                  key={transaction.id}
                  to={`/transactions/${transaction.id}`}
                >
                  <div className="customer-container transactions-container">
                    <h4>
                      <span className="cus-name">Amount:</span>
                      {transaction.amount}
                    </h4>
                    <h4>
                      <span className="cus-phone">Date:</span>
                      {Moment(transaction.created_at).format('MMMM DD, LT')}
                    </h4>
                  </div>
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
