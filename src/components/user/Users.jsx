import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersFromApi } from '../../redux/forms/userManReducer';
/* eslint-disable */
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
              <p>
                {user.phone} - {user.location_area}
              </p>
            </div>
          )}
        </NavLink>
      ))}
    </div>
  );
};
/* eslint-enable */
export default Users;
