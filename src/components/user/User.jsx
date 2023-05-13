/* eslint-disable */
import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { utils, writeFileXLSX } from 'xlsx';
import Moment from 'moment';
import {
  delOneUserFromApi,
  getOneUserFromApi,
} from '../../redux/forms/oneUserManReducer';
import './User.css';
import { getCustomerFromApi } from '../../redux/forms/customerReducer';
import Loader from '../loader/Loader';
import { getOneUserTransFromApi } from '../../redux/forms/oneUserTransactReducer';
import { delOneTransFromApi } from '../../redux/forms/OneTransactionReducer';
import { delOneCustomerFromApi } from '../../redux/forms/OneCustomerReducer';

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
  const customers = useSelector((state) => state.customer?.data?.customers);
  const transactions = useSelector((state) => state.userTransacts);
  const data = JSON.parse(localStorage.getItem('user'));
  const loggedUser = data.user || {};
  const permitted =
    loggedUser.role === 'superadmin' || loggedUser.role === 'admin';
  const downBtnRight = permitted && user.data.role === 'marketer';
  const seeMarketersDaily =
    (permitted || loggedUser.role === 'supervisor') &&
    user.data.role === 'marketer';
  const superadmin = loggedUser.role === 'superadmin';
  const dev = user.data.role === 'marketer' && loggedUser.username === 'admin';

  useEffect(() => {
    dispatch(getOneUserFromApi(id));
    dispatch(getCustomerFromApi());
    dispatch(getOneUserTransFromApi(id));
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

  const handleExp = () => {
    const myCustomers = customers.filter(
      (customer) => customer.user_id === +id
    );
    const exportData = myCustomers.map((cus) => {
      return {
        id: cus.id,
        name: cus.name,
        phone: cus.phone,
      };
    });

    const ws = utils.json_to_sheet(exportData.sort((a, b) => a.id - b.id));
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Data');
    writeFileXLSX(
      wb,
      `Customer_${user.data.location_area.replace(' ', '_')}.xlsx`
    );
  };
  
  const handleConfirm = (e) => {
 
    if (e.target.id === 'yes') {
      dispatch(delOneUserFromApi(id));
    } else if (e.target.id === 'no') {
      const deleteS = document.getElementById('delete');
      deleteS.style.display = 'none';
    }
  
  };

  const handleConfirm4Trans = (e) => {
    if (e.target.id === 'yes-trans') {
      const allTrans = transactions?.data?.trans;
      allTrans?.forEach((trans) => {
        dispatch(delOneTransFromApi(trans.id));
      });
    } else if (e.target.id === 'no-trans') {
      const deleteS = document.getElementById('delete4trans');
      deleteS.style.display = 'none';
    }

    if (allTrans?.length < 0) {
      const deleteS = document.getElementById('delete4trans');
      deleteS.style.display = 'none';
    }
  };
  
  const handleConfirm4Cus = (e) => {
    const removePopUp = () => {
      const deleteS = document.getElementById('delete4cus');
      deleteS.style.display = 'none';
    }
    if (e.target.id === 'yes-cus') {
      const myCust = customers.filter((cus) => cus.user_id === +id)
      myCust.forEach((cus) => {
        dispatch(delOneCustomerFromApi(cus.id))
      })
      if (!myCust.length) {
        removePopUp();
      }
    } else if (e.target.id === 'no-cus') {
      removePopUp();
    }

    if (allTrans?.length < 0) {
      const deleteS = document.getElementById('delete4trans');
      deleteS.style.display = 'none';
    }
  };

  const handleDel = () => {
    const deleteS = document.getElementById('delete');
    deleteS.style.display = 'block';
    
  };

  const handleDelTrans = () => {
    const deleteS = document.getElementById('delete4trans');
    deleteS.style.display = 'block';
  };

  const handleDelCus = () => {
    const deleteS = document.getElementById('delete4cus');
    deleteS.style.display = 'block';
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
      <NavLink to={link} target="_blank">
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
    <>
      {user.loading ? (
        <Loader />
      ) : (
        <>
          <div id="delete" className="del-style">
            {/* <div className="overlay1"></div> */}
            <p>Are you sure you want to delete?</p>

            <button type="button" id="yes" onClick={handleConfirm}>
              Yes
            </button>
            <button type="button" id="no" onClick={handleConfirm}>
              No
            </button>
          </div>

          <div id="delete4trans" className="del-style">
            <p>Are you sure you want to delete all transactions?</p>
            <button type="button" id="yes-trans" onClick={handleConfirm4Trans}>
              Yes
            </button>
            <button type="button" id="no-trans" onClick={handleConfirm4Trans}>
              No
            </button>
          </div>

          <div id="delete4cus" className="del-style">
            <p>Are you sure you want to delete all transactions?</p>
            <button type="button" id="yes-cus" onClick={handleConfirm4Cus}>
              Yes
            </button>
            <button type="button" id="no-cus" onClick={handleConfirm4Cus}>
              No
            </button>
          </div>

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
                <span>Last Updated:</span>{' '}
                {Moment(updated_at).format('MMMM DD, LT')}
              </p>
            </div>
            <div className="btns-container">
              {permitted && (
                <div className="edit">
                  <NavLink to={redirect}>
                    <i className="fa fa-edit text-red" />
                  </NavLink>
                </div>
              )}
              <div className="allTrans">{navigation()}</div>
              {seeMarketersDaily && (
                <div className="allTrans">
                  <NavLink to={allTrans} target="_blank">
                    <button type="button" className="view-trans">
                      View Transactions
                    </button>
                  </NavLink>
                </div>
              )}
              {downBtnRight && (
                <div className="allTrans">
                  <button
                    type="button"
                    className="view-trans"
                    onClick={handleExp}
                  >
                    Export
                  </button>
                </div>
              )}
              {downBtnRight && (
                <div className="allTrans">
                  <NavLink to="marketeritems" target="_blank">
                    <button type="button" className="view-trans">
                      All Items
                    </button>
                  </NavLink>
                </div>
              )}
              {downBtnRight && (
                <div className="allTrans">
                  <NavLink to="percent" target="_blank">
                    <button type="button" className="view-trans">
                      Pay Percent
                    </button>
                  </NavLink>
                </div>
              )}
              {permitted && (
                <div className="allTrans">
                  <button
                    type="button"
                    className="view-trans"
                    onClick={handleDel}
                  >
                    Delete
                  </button>
                </div>
              )}
              {dev && (
                <div className="allTrans">
                  <button
                    type="button"
                    className="view-trans"
                    onClick={handleDelTrans}
                  >
                    Delete All Trans
                  </button>
                </div>
              )}
              {dev && (
                <div className="allTrans">
                  <button
                    type="button"
                    className="view-trans"
                    onClick={handleDelCus}
                  >
                    Delete All Cus
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};
/* eslint-enable */
export default User;
