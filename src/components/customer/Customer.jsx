import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Customer.module.css';
import { getOneCustomerFromApi } from '../../redux/forms/oneCustomerReducer';

const Customer = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const { id } = param;
  const aCustomers = useSelector((state) => state.oneCustomer);
  console.log(id, aCustomers);

  useEffect(() => {
    dispatch(getOneCustomerFromApi(id));
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
