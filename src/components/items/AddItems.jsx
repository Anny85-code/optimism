import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItemFromApi } from '../../redux/forms/getItemsReducer';
import './AddItems.css';

const AddItems = () => {
  const allItems = useSelector((state) => state.item);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItemFromApi());
  }, []);
  // setIsPending(false);
  console.log(allItems);
  return (
    <div className="form-container">
      {allItems.data.map((item) => (
        <div key={item.id}>
          <h3>{item.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default AddItems;
