import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import Moment from 'moment';
import { getOneCustomerTransFromApi } from '../../redux/forms/oneCustomerTransactReducer';
import Loader from '../loader/Loader';

const CustomerTransacts = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const { id } = param;
  const transactions = useSelector((state) => state.customerTransactions);
  const { data } = transactions;
  const { trans, user_name } = data || {};
  console.log(trans, user_name);

  useEffect(() => {
    dispatch(getOneCustomerTransFromApi(id));
  }, []);

  return (
    <div>
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
            trans.map((transaction) => (
              <NavLink
                key={transaction.id}
                to={`/transactions/${transaction.id}`}
              >
                <div className="customer-container transactions-container">
                  <h3>
                    <span className="cus-name">Customer's Name:</span>
                    {user_name}
                  </h3>
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
            ))
          )}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default CustomerTransacts;
