import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getItemFromApi } from '../../redux/forms/getItemsReducer';
import data from '../../assets/json/data.json';
import './AddItems.css';

const AddItems = () => {
  // const allItems = useSelector((state) => state.item);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getItemFromApi());
  // }, []);
  // setIsPending(false);

  return (
    <div className="form-container-item-list">
      {/* {allItems.data.map((item) => ( */}
      {data.map((item) => (
        <React.Fragment key={item.id}>
          <div className="item-name">
            <h3>{item.name}</h3>
            <h3>{item.price}</h3>
            <img
              src={item.picture}
              alt={item.picture}
              style={{ width: '50px', height: '50px' }}
            />
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default AddItems;
