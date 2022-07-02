import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// const fs = require('fs');
import { getItemFromApi } from '../../../redux/forms/getItemsReducer';
import topp from '../../../assets/json/data.json';
import './AddItemCustomer.css';

const getFormattedPrice = (price) => `$${price.toFixed(2)}`;

export default function AddItemCustomer() {
  const allItemsCostumer = useSelector((state) => state.item);
  const dispatch = useDispatch();
  const { data } = allItemsCostumer;

  // fs.writeFile(
  //   '../../../assets/json/data.json',
  //   JSON.stringify(data),
  //   (err) => {
  //     if (err) console.log('Error writing file:', err);
  //   }
  // );

  // const input = {
  //   newData: [...data],
  // };

  // for (let i = 0; i < input.newData.length; i++) {
  //   input.newData[i].price = parseFloat(input.newData[i].price);
  // }

  // console.log(topp, data);

  useEffect(() => {
    dispatch(getItemFromApi());
  }, []);

  const [checkedState, setCheckedState] = useState(
    new Array(topp.length).fill(false)
  );

  const [total, setTotal] = useState(0);

  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );

    setCheckedState(updatedCheckedState);

    const totalPrice = updatedCheckedState.reduce(
      (sum, currentState, index) => {
        if (currentState === true) {
          return sum + topp[index].price;
        }
        return sum;
      },
      0
    );

    setTotal(totalPrice);
  };

  console.log(total);

  return (
    <div className="App">
      <h3>Select Toppings</h3>
      <ul className="toppings-list">
        {topp.map(({ name, price }, index) => {
          return (
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
}
