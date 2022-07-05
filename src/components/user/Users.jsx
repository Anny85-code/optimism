import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import styles from '../customer/Customer.module.css';
import { getUsersFromApi } from '../../redux/forms/userManReducer';

const Users = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.userManReducer);

  useEffect(() => {
    dispatch(getUsersFromApi());
  }, []);

  return (
    <div>
      {allUsers.data.map((user) => (
        <NavLink key={user.id} to={`/users/${user.id}`}>
          <div className={styles.containa}>
            <h3>{user.name}</h3>
            <p>{user.phone}</p>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default Users;
