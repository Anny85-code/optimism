import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getMyFoodFromApi } from '../../redux/forms/myFoodReducer';
import { getOneCustomerFromApi } from '../../redux/forms/OneCustomerReducer';
import Loader from '../loader/Loader';
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
    <div>
      {name ? (
        <>
          <div>
            <h1>Name: {name}</h1>
            <p> Contribution: {daily_contribution}</p>
          </div>
          {food.map((food) => {
            const myFoods = Object.values(JSON.parse(food.items));
            return (
              <div key={food.id} className="customer-container">
                <div>
                  {myFoods ? (
                    myFoods.map((myFood) => (
                      <div key={myFood.id}>
                        <h2>Item: {myFood.name}</h2>
                        <p>Price: {myFood.price}</p>
                        <p>Qty: {myFood.qauntity}</p>
                        <p>Sub total NGN {myFood.subTotal}</p>
                      </div>
                    ))
                  ) : (
                    <p>No items to show!</p>
                  )}
                </div>
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
