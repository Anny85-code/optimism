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

  useEffect(() => {
    dispatch(getOneCustomerFromApi(id));
  }, []);

  console.log(aCustomers.data);
  return (
    <div>
      {/* {aCustomers.data.map((customer) => (
        <NavLink key={customer.id} to={`/customers/${customer.id}`}>
          <div className={styles.containa}>
            <h3>Name: {customer.name}</h3>
            <p>Phone: {customer.phone}</p>
            <p>Email: {customer.email}</p>
            <p>Address: {customer.address}</p>
            <p>Joined: {customer.created_at}</p>
            <p>Last Updated: {customer.updated_at}</p>
            <img src={customer.picture} alt={`${customer.name} photo`} />
          </div>
        </NavLink>
      ))} */}
      aCustomer
    </div>
  );
};

export default Customer;
