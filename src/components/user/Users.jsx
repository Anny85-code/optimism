import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../customer/Customer.module.css';
import { getUsersFromApi } from '../../redux/forms/userManReducer';

const Users = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.userManReducer);

  useEffect(() => {
    dispatch(getUsersFromApi());
  }, []);

  return (
    <div>
      {allUsers.data.map((customer) => (
        <NavLink key={customer.id} to={`/users/${customer.id}`}>
          <div className={styles.containa}>
            <h3>{customer.name}</h3>
            <p>{customer.phone}</p>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default Users;
