import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getMyFoodFromApi } from '../../redux/forms/myFoodReducer';

/* eslint-disable */
const MyFoods = () => {
  const dispatch = useDispatch();
  const foods = useSelector((state) => state.myFood);
  const { data } = foods;

  useEffect(() => {
    dispatch(getMyFoodFromApi());
  }, []);

  return (
    <div>
      {data.map((food) => (
        <NavLink key={food.id} to={`/season/${food.id}`}>
          <div className="customer-container">
            <h2 className="cus-name">{food.created_at}</h2>
            <p>
              <span>Start Date: {food.updated_at}</span>
            </p>
          </div>
        </NavLink>
      ))}
    </div>
  );
};
/* eslint-enable */

export default MyFoods;
