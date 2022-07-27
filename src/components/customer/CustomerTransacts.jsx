import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import Moment from 'moment';
import { getOneCustomerTransFromApi } from '../../redux/forms/OneCustomerReducer';

const CustomerTransacts = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const { id } = param;
  const transactions = useSelector((state) => state.oneCustomer);
  const { data } = transactions;
  console.log(data);

  // const { name } = data;
  useEffect(() => {
    dispatch(getOneCustomerTransFromApi(id));
  }, []);

  return (
    <div>
      <h1>Hi</h1>
      {data.map((el) => (
        <div key={el.id}>
          <p>{el.amount}</p>
        </div>
      ))}
    </div>
    /*
    <div>
      {data.map((transaction) => (
        <NavLink key={transaction.id} to={`/transactions/${transaction.id}`}>
          <div className="customer-container transactions-container">
             <h3>
              <span className="cus-name">Customer's Name:</span>
              {aCustomer.name}
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
      ))}
    </div>
      */
  );
};

export default CustomerTransacts;
