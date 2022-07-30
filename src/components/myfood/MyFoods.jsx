import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getMyFoodFromApi } from '../../redux/forms/myFoodReducer';
import { getOneCustomerFromApi } from '../../redux/forms/OneCustomerReducer';
import Loader from '../loader/Loader';
import './Myfood.css';
/* eslint-disable */
const MyFoods = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const foods = useSelector((state) => state.myFood);
  const customer = useSelector((state) => state.oneCustomer);
  const customerData = customer.data;
  const { data } = foods || {};
  const food = data.filter((food) => food.customer_id == param.id);
  const { name, daily_contribution } = customerData;

  useEffect(() => {
    dispatch(getMyFoodFromApi());
    dispatch(getOneCustomerFromApi(param.id));
  }, []);

  return (
    <div className="transact-customer-container">
      {name ? (
        <>
          <div className="custrans-name">
            <h4 className="columns">
                    <span className="cus-name1">Name</span>
                  </h4>
             <h4 className="columns i">
                    <span className="cus-name1">Contribution</span>
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
                  >{` NGN ${daily_contribution}` }</h4>
             <h3
                    className="columns i"
                    style={{ borderBottom: '2px solid crimson' }}
                  ></h3>
            <h3 className="columns i" id="col">
                    
                  </h3>
           <h3
                    className="columns i"
                    id="col"
                    style={{
                      borderRight: '2px solid crimson',
                      borderBottom: '2px solid crimson',
                    }}
                  >
                    
                  </h3>
            <h3 className="columns" id="col">
                   
                  </h3>
          </div>
          {food.map((food) => {
            const myFoods = Object.values(JSON.parse(food.items));
            return (
              <div key={food.id}>
                {myFoods ? (
                  myFoods.map((myFood) => (
                    <ul className="n-child">
                      <li>
                        <div key={myFood.id} className="custrans-name">
                          <h4 className="columns"></h4>
                          <h4 className="columns i" id="top"></h4>
                          <h4 className="columns i">{myFood.name}</h4>
                          <h4 className="columns i">{` NGN ${myFood.price}` }</h4>
                          <h4
                            className="columns i"
                            style={{ borderRight: '2px solid crimson' }}
                          >
                            {myFood.qauntity}
                          </h4>
                          <h4 className="columns ">{` NGN ${myFood.subTotal}` }</h4>
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
/* eslint-enable */
export default MyFoods;
