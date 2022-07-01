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

  return (
    <div className="form-container-item-list">
      {allItems.data.map((item) => (
        <div key={item.id} className="item-name">
          <h3>{item.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default AddItems;
