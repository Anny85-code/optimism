import { useState } from 'react';
import { useDispatch } from 'react-redux/es/exports';
import data from '../../../assets/json/data.json';
import { postCustomerToApi } from '../../../redux/forms/customerReducer';
import './AddItemCustomer.css';

const getFormattedPrice = (price) => `NGN${price.toFixed(2)}`;
/* eslint-disable */
const AddItemCustomer = () => {
  const [checkedState, setCheckedState] = useState(
    new Array(data.length).fill(false)
  );

  const dispatch = useDispatch();
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

  const handleContribution = () => {
    if (total > 0) {
      let customer = JSON.parse(localStorage.getItem('customer'));
      const userData = { ...customer, daily_contribution: total };
      dispatch(postCustomerToApi(userData));
    }
  };

  return (
    <div className="items-costumer">
      <h3 className="head-text">Select Product</h3>
        {data.map(({ name, price }, index) => {
          return (
            <div className="checkbox-container">
              <h3>
                <label htmlFor={index} key={index} className="checkbox-label">
                  <input
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    name={name}
                    value={name}
                    className="checkbox-input"
                    checked={checkedState[index]}
                    onChange={() => handleOnChange(index)}
                  />
                </label>
              </h3>
              <div className="price-name">
                <h3>
                  <label
                    htmlFor={`custom-checkbox-${index}`}
                    id="item-costumer-name"
                  >
                    {name}
                  </label>
                </h3>
                <h3 className="right-section"> &nbsp;-&nbsp;</h3>
                <h3 className="right-section">{getFormattedPrice(price)}</h3>
              </div>
            </div>
          );
        })}
          <div className="toppings-list-item">
            <div className="left-section">Total:</div>
            <div className="right-section">{getFormattedPrice(total)}</div>
          </div>
      <div className="form-group btn1">
        <button
          type="submit"
          className="add-customer-btn"
          onClick={handleContribution}
        >
          Add Customer
        </button>
      </div>
    </div>
  );
};
/* eslint-enable */
export default AddItemCustomer;
