import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItemFromApi } from '../../../redux/forms/getItemsReducer';
import './AddItemCustomer.css';

const AddItemCustomer = () => {
  const allItemsCostumer = useSelector((state) => state.item);
  const dispatch = useDispatch();

  // const [checked, setChecked] = useState(false);

  // const handleCheckbox = () => {
  //   setChecked(!checked);
  // };

  useEffect(() => {
    dispatch(getItemFromApi());
  }, []);

  // const onChangeAttribute = (value) => {
  //   console.log(value);
  //   setChecked(value);
  // };
  // const option = allItemsCostumer.data.map((item) => [
  //   {
  //     label: item.name,
  //     value: item.name,
  //   },
  // ]);

  // setIsPending(false);
  return (
    <div className="form-container-items-costumer">
      {allItemsCostumer.data.map((item) => (
        <div key={item.id}>
          <h3 className="item-costumer-name">{item.name}</h3>
          <h3>
            <label htmlFor="item">
              <input
                type="checkbox"
                name="item"
                id={item.name}
                checked={checked}
                onChange={handleCheckbox}
              />
            </label>
          </h3>
        </div>
      ))}
    </div>
  );
};

export default AddItemCustomer;
