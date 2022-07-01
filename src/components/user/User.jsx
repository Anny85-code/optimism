import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../customer/Customer.module.css';
import { getOneUserFromApi } from '../../redux/forms/oneUserManReducer';

const editUrl = (person) => {
  const { id } = person;
  return `/users/${id}/edit`;
};

const User = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const { id } = param;
  const user = useSelector((state) => state.oneUser);

  useEffect(() => {
    dispatch(getOneUserFromApi(id));
  }, []);

  /* eslint-disable */
  const {
    name,
    username,
    phone,
    role,
    location,
    address,
    email,
    created_at,
    avatar,
    updated_at,
  } = user.data;
  const redirect = editUrl(user.data);

  return (
    <div>
      <div className={styles.containa}>
        <h3>Name: {name}</h3>
        <p>Username: {username}</p>
        <p>Role: {role}</p>
        <p>Phone: {phone}</p>
        <p>Email: {email}</p>
        <p>Location: {location}</p>
        <p>Address: {address}</p>
        <p>Joined: {created_at}</p>
        <p>Last Updated: {updated_at}</p>
        <img src={avatar} alt={`${name}`} style={{ width: '100px' }} />
        <NavLink to={redirect}>Edit</NavLink>
      </div>
    </div>
  );
};
/* eslint-enable */
export default User;
