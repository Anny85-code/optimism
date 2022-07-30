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

const transUrl = (person) => {
  const { id } = person;
  return `/users/${id}/transactions`;
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
    location_area,
    address,
    email,
    created_at,
    avatar,
    updated_at,
  } = user.data;
  const redirect = editUrl(user.data);
  const allTrans = transUrl(user.data);

  return (
    <div className="containa user-container">
      <div className="image-container">
        <img src={avatar} alt={`${name}`} className="cus-image" />
      </div>
      <div className="details-container">
        <h3 className="cus-details">
          <span>Name:</span> {name}
        </h3>
        <p className="cus-details">
          <span>Username:</span> {username}
        </p>
        <p className="cus-details">
          <span>Role:</span> {role}
        </p>
        <p className="cus-details">
          <span>Phone:</span> {phone}
        </p>
        <p className="cus-details">
          <span>Email:</span> {email}
        </p>
        <p className="cus-details">
          <span>Location:</span> {location_area}
        </p>
        <p className="cus-details">
          <span>Address: </span>
          {address}
        </p>
        <p className="cus-details">
          <span>Joined:</span> {Moment(created_at).format('MMMM DD, LT')}
        </p>
        <p className="cus-details">
          <span>Last Updated:</span> {Moment(updated_at).format('MMMM DD, LT')}
        </p>
      </div>
      <div className="btns-container">
        <div className="edit">
          <NavLink to={redirect}>
            <i className="fa fa-edit text-red" />
          </NavLink>
        </div>
        <div className="allTrans">
          <NavLink to={allTrans}>
            <button type="button" className="view-trans">
              View Transactions
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
/* eslint-enable */
export default User;
