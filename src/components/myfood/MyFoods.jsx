import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { getMyFoodFromApi } from '../../redux/forms/myFoodReducer';

/* eslint-disable */
const MyFoods = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const foods = useSelector((state) => state.myFood);
  const { data } = foods || {};
  const food = data.filter((food) => food.customer_id == param.id);
  console.log(food, data, param);

  useEffect(() => {
    dispatch(getMyFoodFromApi());
  }, []);

  return (
    <div>
      {food.map((food) => {
        return (
          <NavLink key={food.id} to={`/season/${food.id}`}>
            <div className="customer-container">
              <h2 className="cus-name">{food.customer_id}</h2>
              <p className="cus-name">{food.created_at}</p>
              <p>
                <span>Start Date: {'items'}</span>
              </p>
            </div>
          </NavLink>
        );
      })}
    </div>
  );
};
/* eslint-enable */

export default MyFoods;
