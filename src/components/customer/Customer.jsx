/* eslint-disable */
import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'moment';
import './Customer.css';
import { getOneCustomerFromApi } from '../../redux/forms/OneCustomerReducer';
import { getOneUserFromApi } from '../../redux/forms/oneUserManReducer';
import Loader from '../loader/Loader';

const editUrl = (person) => {
  const { id } = person;
  return `/customers/${id}/edit`;
};

const transUrl = (person) => {
  const { id } = person;
  return `/customers/${id}/transactions`;
};

// const transUrlMark = (person) => {
//   const { id } = person;
//   return `/customers/${id}/transactionsmark`;
// };

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
  const regAdmin = useSelector((state) => state.oneUser);
  const adminNo = aCustomers?.data?.user_id;
  const { loading } = regAdmin;
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
  // const allTransMark = transUrlMark(aCustomers.data);

  const comma = (num) => {
    const number = parseInt(num);
    const newText = number.toLocaleString();
    return newText;
  };

  const handleDel = function () {
    console.log(id);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
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
              {/* {regAdmin.data.location_area &&
                `${regAdmin.data.location_area.slice(0, 3).toUpperCase()}${
                  regAdmin.data.id
                }/${aCustomers.data.id}`} */}
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
              {user.role === 'admin' && (
                <NavLink to={redirect} style={{ textDecoration: 'none' }}>
                  <i className="fa fa-edit text-red" />
                </NavLink>
              )}
            </div>
            <div className="allTrans">
              <NavLink to={allTrans} style={{ textDecoration: 'none' }}>
                <div>
                  <button type="button" className="view-trans">
                    View transactions
                  </button>
                </div>
              </NavLink>
            </div>
            <div className="myfood">
              {user.role === 'admin' && (
                <NavLink to={myfood} style={{ textDecoration: 'none' }}>
                  <div>
                    <button type="button" className="view-trans">
                      My food
                    </button>
                  </div>
                </NavLink>
              )}
            </div>
            <div className="myfood">
              {admins && (
                <NavLink to="/customers" style={{ textDecoration: 'none' }}>
                  <div>
                    <button
                      type="button"
                      className="view-trans"
                      onClick={handleDel}
                    >
                      Delete
                    </button>
                  </div>
                </NavLink>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

/* eslint-enable */
export default Customer;
