import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyFoodFromApi } from '../../../redux/forms/myFoodReducer';

/* eslint-disable */
export const ItemsStats = () => {
  const dispatch = useDispatch();
  const foods = useSelector((state) => state.myFood?.data);
  const array = [];

  foods.map(({ items }) => {
    const itema = JSON.parse(items);
    const ab = Object.values(itema);
    ab.map((el) => {
      const { id, name, qauntity } = el;
      array.push({ id, name, qauntity });
    });
  });

  const ans = Object.values(
    array.reduce((obj, item) => {
      obj[item.id]
        ? (obj[item.id].qauntity += item.qauntity)
        : (obj[item.id] = item);
      return obj;
    }, {})
  );

  useEffect(() => {
    dispatch(getMyFoodFromApi());
  }, []);

  return (
    <div>
      {ans.map((food, i) => (
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
