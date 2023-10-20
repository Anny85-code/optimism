import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersFromApi } from '../../redux/forms/userManReducer';

/* eslint-disable */
const UsersMarketers = () => {
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.userManReducer?.data);
  const data = JSON.parse(localStorage.getItem('user'));
  const userr = data.user || {};
  const reId = localStorage.getItem('_id');

  useEffect(() => {
    dispatch(getUsersFromApi());
  }, []);

  return (
    <div>
      {allUsers.map((user) => {
        const permitted =
          ((userr.role === 'admin' || userr.role === 'superadmin') &&
            +reId === user.user_id) ||
          user.user_id === userr.id;
        return (
          permitted && (
            <NavLink key={user.id} to={`/users/${user.id}`}>
              {user.role === 'marketer' && (
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
export default UsersMarketers;
