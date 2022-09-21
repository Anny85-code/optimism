/* eslint-disable */
import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'moment';
import {
  delOneUserFromApi,
  getOneUserFromApi,
} from '../../redux/forms/oneUserManReducer';
import './User.css';
import { getCustomerFromApi } from '../../redux/forms/customerReducer';

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
  const customers = useSelector((state) => state.customer?.data);
  const data = JSON.parse(localStorage.getItem('user'));
  const loggedUser = data.user || {};
  const permitted =
    loggedUser.role === 'superadmin' || loggedUser.role === 'admin';
  const downBtnRight = permitted && user.data.role === 'marketer';

  useEffect(() => {
    dispatch(getOneUserFromApi(id));
    dispatch(getCustomerFromApi());
  }, []);

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

  const handleDel = function () {
    dispatch(delOneUserFromApi(id));
  };

  const handleExp = () => {
    const myCustomers = customers.filter((customer) => {
      return customer.user_id === +id;
      // console.log(customer.user_id, +id);
    });
    console.log(myCustomers);
  };

  const navigation = () => {
    const marketer = user.data.role === 'marketer';
    const admin = user.data.role === 'admin';
    const supervisor = user.data.role === 'supervisor';
    const superadmin = user.data.role === 'superadmin';

    const link = superadmin
      ? '/users'
      : admin
      ? '/userssupervisors'
      : supervisor
      ? '/usersmarketers'
      : '/customers';
    localStorage.setItem('_id', id);
    return (
      <NavLink to={link}>
        <button type="button" className="view-trans">
          {marketer && 'My Customers'}
          {admin && 'Supervisors'}
          {supervisor && 'Marketers'}
          {superadmin && 'Admins'}
        </button>
      </NavLink>
    );
  };

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
        {permitted && (
          <>
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
          </>
        )}
        <div className="allTrans">{navigation()}</div>
        {permitted && (
          <div className="allTrans">
            <NavLink to="/users">
              <button type="button" className="view-trans" onClick={handleDel}>
                Delete
              </button>
            </NavLink>
          </div>
        )}
        {downBtnRight && (
          <div className="allTrans">
            <button type="button" className="view-trans" onClick={handleExp}>
              Export
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
/* eslint-enable */
export default User;
