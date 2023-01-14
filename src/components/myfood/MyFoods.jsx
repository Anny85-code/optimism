/* eslint-disable */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getMarketerItemsFromApi } from '../../redux/forms/marketerItemsReducer';
import { getOneCustomerFromApi } from '../../redux/forms/OneCustomerReducer';
import Loader from '../loader/Loader';
import './Myfood.css';

const MyFoods = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const customer = useSelector((state) => state.oneCustomer);
  const myFoods = useSelector(
    (state) => state.marketerItemsReducer?.data?.items
  );
  const customerData = customer.data;
  const food = myFoods?.filter((food) => food.v2_customer_id == param.id);
  const { name, daily_contribution } = customerData;
  const UserData = JSON.parse(localStorage.getItem('user'));
  const { user } = UserData || {};

  useEffect(() => {
    dispatch(getMarketerItemsFromApi(user.id));
    dispatch(getOneCustomerFromApi(param.id));
  }, []);

  const comma = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div className="transact-customer-container">
      {name ? (
        <>
          <div className="custrans-name">
            <h4 className="columns">
              <span className="cus-name-name">Name</span>
            </h4>
            <h4 className="columns i">
              <span className="cus-name2">Contribution</span>
            </h4>
            <h3 className="columns i">
              <span className="cus-name1">Items</span>
            </h3>
            <h3 className="columns i" d="a">
              <span className="cus-name1">Price</span>
            </h3>
            <h3 className="columns i " id="a">
              <span className="cus-name1">Quantity</span>
            </h3>
            <h3 className="columns">
              <span className="cus-name1">Sub total</span>
            </h3>
          </div>
          <div className="custrans-name">
            <h4 className="columns" id="col">
              <p className="custransactname">{name}</p>
            </h4>
            <h4
              className="columns i"
              style={{ borderBottom: '2px solid crimson' }}
            >{` NGN ${comma(daily_contribution)}`}</h4>
            <h3
              className="columns i"
              style={{ borderBottom: '2px solid crimson' }}
            ></h3>
            <h3 className="columns i" id="col"></h3>
            <h3
              className="columns i"
              id="col"
              style={{
                borderRight: '2px solid crimson',
                borderBottom: '2px solid crimson',
              }}
            ></h3>
            <h3 className="columns" id="col"></h3>
          </div>
          {food?.map((food) => {
            const myFoods = Object.values(JSON.parse(food.items));
            return (
              <div key={food.id}>
                {myFoods ? (
                  myFoods?.map((myFood) => (
                    <ul className="n-child">
                      <li>
                        <div key={myFood.id} className="custrans-name">
                          <h4 className="columns"></h4>
                          <h4 className="columns i" id="top"></h4>
                          <h4 className="columns i">{myFood.name}</h4>
                          <h4 className="columns i">{` NGN ${comma(
                            myFood.price
                          )}`}</h4>
                          <h4
                            className="columns i"
                            style={{ borderRight: '2px solid crimson' }}
                          >
                            {myFood.qauntity}
                          </h4>
                          <h4 className="columns ">{` NGN ${comma(
                            myFood.subTotal
                          )}`}</h4>
                        </div>
                      </li>
                    </ul>
                  ))
                ) : (
                  <>
                    <p className="no-transact-p">No items to show!</p>
                  </>
                )}
              </div>
            );
          })}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default MyFoods;
/* eslint-enable */
