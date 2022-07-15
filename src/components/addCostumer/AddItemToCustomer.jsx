import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItemFromApi } from '../../redux/forms/getItemsReducer';
import { getOneItemFromApi } from '../../redux/forms/oneItemReducer';

const AddItemToCustomer = () => {
  const dispatch = useDispatch();
  const item = useSelector((state) => state.oneItem);
  const items = useSelector((state) => state.item);
  const lastItem = items.data.length;
  const [current, setCurrent] = useState(1);

  const handlePrevious = () => {
    if (current > 1) {
      setCurrent(current - 1);
    }
  };

  const handleNext = () => {
    if (current < lastItem) {
      setCurrent(current + 1);
    }
  };

  console.log(current, lastItem);

  const { name, price, description, picture } = item.data;
  useEffect(() => {
    dispatch(getItemFromApi());
    dispatch(getOneItemFromApi(current));
  }, [current]);
  return (
    <div>
      <div>
        <button type="button" onClick={handlePrevious}>
          Previous
        </button>
        <div>
          <h1>{name}</h1>
          <h4>{price}</h4>
          <h4>{description}</h4>
          <img src={picture} alt={name} style={{ width: '120px' }} />
          <input type="number" onClick={handleQuantity} />
        </div>
        <button type="button" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default AddItemToCustomer;
