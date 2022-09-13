import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyFoodFromApi } from '../../../redux/forms/myFoodReducer';

/* eslint-disable */
export const ItemsStats = () => {
  const dispatch = useDispatch();
  const foods = useSelector((state) => state.myFood?.data);
  const iii = foods.map((customer) => {
    const myFoods = Object.values(JSON.parse(customer.items));
    return myFoods.map((food) => {
      return [food.name, food.qauntity];
    });
  });

  console.log(iii);

  useEffect(() => {
    dispatch(getMyFoodFromApi());
  }, []);

  return (
    <div>
      {foods.map((eachCustomer) => {
        // if key exists?
        // value += current value
        // else
        // create a new key with the current value
        const myFoods = Object.values(JSON.parse(eachCustomer.items));
        // myFoods.map((food) => {
        //   if (summary[food.name]) {
        //     summary[food.name] += food.qauntity;
        //   } else {
        //     summary[food.name] = food.qauntity;
        //   }
        // });
        return (
          <div key={eachCustomer.id}>
            <p>{eachCustomer.id}</p>
            {myFoods.map((food) => (
              <div key={food.id}>
                <p>
                  {food.name} **** {food.qauntity}{' '}
                </p>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
  /* eslint-enable */
};
