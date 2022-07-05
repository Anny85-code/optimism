import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import '../customer/Customer.css';
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
    <div className="containa">
      <div className="details-container">
        <h3>Name: {name}</h3>
        <p>Username: {username}</p>
        <p>Role: {role}</p>
        <p>Phone: {phone}</p>
        <p>Email: {email}</p>
        <p>Location: {location}</p>
        <p>Address: {address}</p>
        <p>Joined: {created_at}</p>
        <p>Last Updated: {updated_at}</p>
      </div>
      <div className="image-container">
        <img src={avatar} alt={`${name}`} style={{ width: '100px' }} />
        <div className="edit">
          <NavLink to={redirect}>Edit</NavLink>
        </div>
      </div>
    </div>
  );
};
/* eslint-enable */
export default User;
