import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import '../customer/Customer.css';
import Moment from 'moment';
import { getOneUserFromApi } from '../../redux/forms/oneUserManReducer';
import './User.css';

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
    <div className="containa user-container">
      <div className="image-container">
        <img src={avatar} alt={`${name}`} className="cus-image" />
      </div>
      <div className="details-container">
        <h3 className="cus-details">Name: {name}</h3>
        <p className="cus-details">Username: {username}</p>
        <p className="cus-details">Role: {role}</p>
        <p className="cus-details">Phone: {phone}</p>
        <p className="cus-details">Email: {email}</p>
        <p className="cus-details">Location: {location}</p>
        <p className="cus-details">Address: {address}</p>
        <p className="cus-details">
          Joined: {Moment(created_at).format('MMMM DD, LT')}
        </p>
        <p className="cus-details">
          Last Updated: {Moment(updated_at).format('MMMM DD, LT')}
        </p>
      </div>
      <div className="edit">
        <NavLink to={redirect}>
          <i className="fa fa-edit" />
        </NavLink>
      </div>
    </div>
  );
};
/* eslint-enable */
export default User;
