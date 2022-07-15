import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItemFromApi } from '../../redux/forms/getItemsReducer';

const AddItemToCustomer = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.item);
  console.log(items);
  useEffect(() => {
    dispatch(getItemFromApi());
  }, []);
  return <div>AddItemToCustomer</div>;
};

export default AddItemToCustomer;
