import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItemFromApi } from '../../../redux/forms/getItemsReducer';
// import topp from '../../../assets/json/data.json';
import './AddItemCustomer.css';

const getFormattedPrice = (price) => `$${price.toFixed(2)}`;

export default function AddItemCustomer() {
  const allItemsCostumer = useSelector((state) => state.item);
  const dispatch = useDispatch();
  const { data } = allItemsCostumer;
  const dataCopy = allItemsCostumer.data;

  const input = {
    newData: [...data],
  };

  for (let i = 0; i < input.newData.length; i++) {
    input.newData[i].price = +input.newData[i].price;
  }

  // const { temp } = input;
  const newData = JSON.stringify(dataCopy);

  console.log(data, dataCopy, newData);

  useEffect(() => {
    dispatch(getItemFromApi());
  }, []);

  const [checkedState, setCheckedState] = useState(
    new Array(data.length).fill(false)
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
          console.log(sum, newData[index].price);
          return sum + JSON.parse(newData)[index].price;
        }
        return sum;
      },
      0
    );

    setTotal(totalPrice);
  };

  return (
    <div className="App">
      <h3>Select Toppings</h3>
      <ul className="toppings-list">
        {JSON.parse(newData).map(({ name, price }, index) => {
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
