// import { useState } from 'react';
// import { toppings } from './utils/toppings';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItemFromApi } from '../../../redux/forms/getItemsReducer';
import './AddItemCustomer.css';
// import './styles.css';

const AddItemCustomer = () => {
  let allItemsCostumer = useSelector((state) => state.item);
  allItemsCostumer = allItemsCostumer.data;
  const dispatch = useDispatch();
  const getFormattedPrice = (value) => `$${value}`;
  const [checkedState, setCheckedState] = useState(
    new Array(allItemsCostumer.length).fill(false),
  );
  const [total, setTotal] = useState(0);

  const handleOnChange = (position) => {
    /*eslint-disable*/
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
      );
      /* eslint-enable */

    setCheckedState(updatedCheckedState);

    const totalPrice = updatedCheckedState.reduce(
      (sum, currentState, index) => {
        if (currentState === true) {
          // eslint-disable-next-line no-multi-assign
          return sum + allItemsCostumer[index].price;
        }
        return sum;
      },
      0,
    );

    setTotal(totalPrice);
    console.log((setTotal(totalPrice)));
  };

  useEffect(() => {
    dispatch(getItemFromApi());
  }, []);

  return (
    <div className="App">
      <h3>Select Toppings</h3>
      <ul className="toppings-list">
        {allItemsCostumer.map(({ name, price }, index) => {
          console.log(1 + 1);
          return (
            /* eslint-disable-next-line react/no-array-index-key */
            <li key={index}>
              <div className="toppings-list-item">
                <div className="left-section">
                  <input
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    name={name}
                    value={name}
                    checked={checkedState[index]}
                    onChange={() => handleOnChange(index)}
                  />
                  <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                </div>
                <div className="right-section">{getFormattedPrice(price)}</div>
              </div>
            </li>
          );
        /* eslint-disable-next-line react/no-array-index-key */
        })}
        <li>
          <div className="toppings-list-item">
            <div className="left-section">Total:</div>
            <div className="right-section">{getFormattedPrice(total)}</div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default AddItemCustomer;
