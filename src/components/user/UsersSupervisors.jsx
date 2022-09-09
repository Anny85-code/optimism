import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import '../customer/Customer.css';
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
          {user.role === 'admin' && (
            <div className="customer-container">
              <h3>{user.name}</h3>
              <p>{user.phone}</p>
            </div>
          )}
        </NavLink>
      ))}
    </div>
  );
};

export default Users;
