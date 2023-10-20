import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersFromApi } from '../../redux/forms/userManReducer';
/* eslint-disable */
const UsersSupervisors = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.userManReducer);
  const { user } = JSON.parse(localStorage.getItem('user'));
  const loggedInUser = user;

  useEffect(() => {
    dispatch(getUsersFromApi());
  }, []);

  return (
    <div>
      {allUsers.data.map((user) => {
        const permitted =
          loggedInUser?.id === user.user_id ||
          loggedInUser?.role === 'superadmin';
        return (
          permitted && (
            <NavLink key={user.id} to={`/users/${user.id}`}>
              {user.role === 'supervisor' && (
                <div className="customer-container">
                  <h3>{user.name}</h3>
                  <p>
                    {user.phone} - {user.location_area}
                  </p>
                </div>
              )}
            </NavLink>
          )
        );
      })}
    </div>
  );
};
/* eslint-enable */
export default UsersSupervisors;
