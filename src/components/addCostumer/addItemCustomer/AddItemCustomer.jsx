import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import data from '../../../assets/json/data.json';
import './AddItemCustomer.css';

const getFormattedPrice = (price) => `NGN${price.toFixed(2)}`;
/* eslint-disable */
const AddItemCustomer = () => {
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
          return sum + data[index].price;
        }
        return sum;
      },
      0
    );

    setTotal(totalPrice);
  };

  const handleContribtution = () => {
    localStorage.setItem('dailyContibution', total);
    window.history.pushState({}, '', '/addcustomer');
    <Navigate to="/addcustomer" />;
    window.location.reload();
  };

  return (
    <div className="App">
      <h3>Select Product</h3>
      <div className="form-group btn1">
        <button
          type="submit"
          className="add-customer-btn"
          onClick={handleContribtution}
        >
          Add Customer
        </button>
      </div>
      <ul className="toppings-list">
        {data.map(({ name, price }, index) => {
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
};
/* eslint-enable */
export default AddItemCustomer;
