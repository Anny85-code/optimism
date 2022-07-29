import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getMyFoodFromApi } from '../../redux/forms/myFoodReducer';
import Loader from '../loader/Loader';

/* eslint-disable */
const MyFoods = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const foods = useSelector((state) => state.myFood);
  const { data } = foods || {};
  const food = data.filter((food) => food.customer_id == param.id);
  console.log(food);

  useEffect(() => {
    dispatch(getMyFoodFromApi());
  }, []);

  return (
    <div>
      {food ? (
        food.map((food) => {
          console.log(JSON.parse(food.items));
          const myFood = JSON.parse(food.items);
          return (
            <div key={food.id} className="customer-container">
              <h1>Items are coming!😎</h1>
              <p>{}</p>
            </div>
          );
        })
      ) : (
        <Loader />
      )}
    </div>
  );
};
/* eslint-enable */

export default MyFoods;
