import { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyFoodFromApi } from '../../../redux/forms/myFoodReducer';
import './Itemstat.css';
import RenderItemsStats from './RenderItemsStats';

/* eslint-disable */
const ItemsStats = () => {
  const dispatch = useDispatch();
  const foods = useSelector((state) => state.myFood?.data);

  /* ========================   ====   Bad ID snoop   ====   ============================= */
  /* ========================   ====   Comment this out   ====   ============================= */
  const foodArr = useMemo(() => {
    if (foods?.items) {
      return Object.values(foods.items);
    } else {
      return [];
    }
  }, [foods]);

  /* ========================   ====   Uncomment this   ====   =============================

  console.log(foods);
/*
  foods.map(({ items, id, user_id }) => {
    const foodItems = JSON.parse(items);
    const food = Object.values(foodItems);
    const id2 = id; // Track bad ID
    food.map((order) => {
      const { id, name, qauntity } = order;
      if (id === 33) {
        console.log(order, id2, user_id); // Track bad ID
      }
    });
  });
  */
  /* ========================   ====   Bad ID snoop   ====   =============================*/

  // const allOrderTotal;

  // const sortedFoods = foodArr?.sort((a, b) => b.quantity - a.quantity);
  // console.log(sortedFoods);

  useEffect(() => {
    dispatch(getMyFoodFromApi());
  }, [foodArr.length > 0]);

  return (
    <>
      <RenderItemsStats foods={foods} />
    </>
  );
  /* eslint-enable */
};

export default ItemsStats;
