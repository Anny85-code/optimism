/* eslint-disable */
import React, { useEffect } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'moment';
import './Customer.css';
import './../../utils/Blocker.css';
import {
  delOneCustomerFromApi,
  getOneCustomerFromApi,
} from '../../redux/forms/OneCustomerReducer';
import { getOneUserFromApi } from '../../redux/forms/oneUserManReducer';
import Loader from '../loader/Loader';
import comma from './../../utils/Comma';

const editUrl = (person) => {
  const { id } = person;
  return `/customers/${id}/edit`;
};

const transUrl = (person) => {
  const { id } = person;
  return `/customers/${id}/transactions`;
};

const myFoodUrl = (person) => {
  const { id } = person;
  return `/customers/${id}/myfood`;
};

const data = JSON.parse(localStorage.getItem('user'));
const { user } = data || {};

const Customer = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const { id } = param;
  const aCustomers = useSelector((state) => state.oneCustomer);
  const regMark = useSelector((state) => state.oneUser);
  const adminNo = aCustomers?.data?.user_id;
  const loading = regMark.loading && aCustomers.loading;
  const navigate = useNavigate();
  const admins = user.role === 'admin' || user.role === 'superadmin';

  useEffect(() => {
    dispatch(getOneCustomerFromApi(id));
    dispatch(getOneUserFromApi(adminNo));
  }, []);

  const {
    name,
    phone,
    address,
    email,
    created_at,
    card_number,
    picture,
    updated_at,
    daily_contribution,
  } = aCustomers.data;
  const redirect = editUrl(aCustomers?.data);
  const allTrans = transUrl(aCustomers?.data);
  const myfood = myFoodUrl(aCustomers?.data);
  localStorage.setItem('customer', JSON.stringify(aCustomers?.data));

  const handleConfirm = (e) => {
    if (e.target.id === 'yes') {
      dispatch(delOneCustomerFromApi(id));
      navigate(-1);
    } else if (e.target.id === 'no') {
      const deleteS = document.getElementById('delete');
      deleteS.style.display = 'none';
    }
  };

  const handleDel = () => {
    const deleteS = document.getElementById('delete');
    deleteS.style.display = 'block';
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div id="delete" className="del-style">
            <p>Are you sure you want to delete?</p>
            <button type="button" id="yes" onClick={handleConfirm}>
              Yes
            </button>
            <button type="button" id="no" onClick={handleConfirm}>
              No
            </button>
          </div>

          <div className="containa cus-food-cont">
            <div className="image-container">
              <img className="cus-image" src={picture} alt={`${name}`} />
            </div>
            <div className="details-container">
              <h3 className="cus-details">
                <span>Name:</span> {name}
              </h3>
              <p className="cus-details">
                <span>Phone:</span> {phone}
              </p>
              <p className="cus-details">
                <span>Email:</span> {email}
              </p>
              <p className="cus-details">
                <span>Card No.</span>
                {card_number}
              </p>
              <p className="cus-details">
                <span>Daily Contribution:</span>
                {` NGN ${comma(daily_contribution)}`}
              </p>
              <p className="cus-details">
                <span>Address:</span> {address}
              </p>
              <p className="cus-details">
                <span>Joined:</span>
                {Moment(created_at).format('MMMM DD, LT')}
              </p>
              <p className="cus-details">
                <span>Last Updated:</span>
                {Moment(updated_at).format('MMMM DD, LT')}
              </p>
            </div>

            <div className="image-container">
              <div className="edit">
                {admins && (
                  <NavLink to={redirect} style={{ textDecoration: 'none' }}>
                    <i className="fa fa-edit text-red" />
                  </NavLink>
                )}
              </div>
              <div className="allTrans">
                <NavLink
                  to={allTrans}
                  style={{ textDecoration: 'none' }}
                  target="_blank"
                >
                  <div>
                    <button type="button" className="view-trans">
                      View transactions
                    </button>
                  </div>
                </NavLink>
              </div>
              <div className="myfood">
                <NavLink
                  to={myfood}
                  style={{ textDecoration: 'none' }}
                  target="_blank"
                >
                  <div>
                    <button type="button" className="view-trans">
                      My food
                    </button>
                  </div>
                </NavLink>
              </div>
              <div className="myfood">
                {admins && (
                  <div className="del">
                    <button
                      type="button"
                      className="view-trans"
                      onClick={handleDel}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

/* eslint-enable */
export default Customer;
