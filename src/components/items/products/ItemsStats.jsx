import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyFoodFromApi } from '../../../redux/forms/myFoodReducer';

export const ItemsStats = () => {
  const dispatch = useDispatch();
  const foods = useSelector((state) => state.myFood?.data);
  console.log(foods);

  useEffect(() => {
    dispatch(getMyFoodFromApi());
  }, []);

  return (
    <div>
      {foods.map((each_customer) => (
        <div key={each_customer.id}>
          <p>{each_customer.id}</p>
        </div>
      ))}
    </div>
  );
};
