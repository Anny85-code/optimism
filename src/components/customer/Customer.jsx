import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerFromApi } from '../../redux/forms/customerReducer';
import styles from './Customer.module.css';

const Customer = () => {
  const dispatch = useDispatch();
  const aCustomers = useSelector((state) => state.oneCustomer);

  useEffect(() => {
    dispatch(getOneCustomerFromApi());
  }, []);

  return (
    <div>
      {aCustomers.data.map((customer) => (
        <NavLink key={customer.id} to={`/customers/${customer.id}`}>
          <div className={styles.containa}>
            <h3>{customer.name}</h3>
            <p>{customer.phone}</p>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default Customer;
