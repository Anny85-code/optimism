import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyFoodFromApi } from '../../../redux/forms/myFoodReducer';

/* eslint-disable */
export const ItemsStats = () => {
  const dispatch = useDispatch();
  const foods = useSelector((state) => state.myFood?.data);
  const foodArray = [];

  foods.map(({ items }) => {
    const foodItems = JSON.parse(items);
    const food = Object.values(foodItems);
    food.map((order) => {
      const { id, name, qauntity } = order;
      foodArray.push({ id, name, qauntity });
    });
  });

  const foodArr = Object.values(
    foodArray.reduce((obj, item) => {
      obj[item.id]
        ? (obj[item.id].qauntity += item.qauntity)
        : (obj[item.id] = item);
      return obj;
    }, {})
  );

  const allOrderTotal = foodArr.reduce((acc, obj) => acc + obj.qauntity, 0);

  useEffect(() => {
    dispatch(getMyFoodFromApi());
    localStorage.setItem('order', allOrderTotal);
  }, []);

  return (
    <div>
      <p>Total Orders: {allOrderTotal}</p>
      <br />
      <br />
      {foodArr.map((food, i) => (
        <div key={food.id}>
          <p>
            {i + 1}***{`${food.name} - ${food.id}`}---{}---{food.qauntity}
          </p>
        </div>
      ))}
    </div>
  );
  /* eslint-enable */
};
