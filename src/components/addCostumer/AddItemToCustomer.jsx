import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItemFromApi } from '../../redux/forms/getItemsReducer';

const AddItemToCustomer = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.item);
  console.log(items);
  const funcRender = () => {
    if (items.data) {
      const { name, price } = items.data[0];
      return (
        <div>
          <button type="button">Previous</button>
          <div>
            <h1>{name}</h1>
            <h4>{price}</h4>
          </div>
          <button type="button">Previous</button>
        </div>
      );
    }
  };
  useEffect(() => {
    dispatch(getItemFromApi());
  }, []);
  return <div>{items && funcRender()}</div>;
};

export default AddItemToCustomer;
