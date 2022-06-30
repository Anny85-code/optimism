import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerFromApi } from '../../redux/forms/customerReducer';
import styles from './Customer.module.css';

const Customers = () => {
  const dispatch = useDispatch();
  const allCustomers = useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(getCustomerFromApi());
  }, []);

  return (
    <div>
      {allCustomers.data.map((customer) => (
        <div key={customer.id} className={styles.containa}>
          <h3>{customer.name}</h3>
          <p>{customer.phone}</p>
        </div>
      ))}
    </div>
  );
};

export default Customers;
