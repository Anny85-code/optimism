import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItemFromApi } from '../../../redux/forms/getItemsReducer';
import './AddItemCustomer.css';

const AddItemCustomer = () => {
  const allItemsCostumer = useSelector((state) => state.item);
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const [checkedState, setCheckedState] = useState(
    new Array(allItemsCostumer.length).fill(false)
  );

  const handleItemQty = (e) => {
    // quantity should never be less than 1
    // pick the new quantity
    if (e.target.value > 0) {
      setQuantity(e.target.value);
    }
  };

  console.log(quantity);

  const getFormattedPrice = (price) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'NGN',
    }).format(price);

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
          return sum + allItemsCostumer.data[index].price;
        }
        return sum;
      },
      0
    );

    setTotal(totalPrice);
  };

  useEffect(() => {
    dispatch(getItemFromApi());
  }, []);

  return (
    <div className="items-costumer">
      {allItemsCostumer.data.map(({ name, price }, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={index} className="checkbox-container">
          <h3>
            <label htmlFor={index} className="checkbox-label">
              <input
                className="checkbox-input"
                type="checkbox"
                name={name}
                value={name}
                id={index}
                checked={checkedState[index]}
                onChange={() => handleOnChange(index)}
              />
            </label>
          </h3>
          <div className="price-name">
            <h3 className="item-costumer-name">{name}</h3>
            <h3> &nbsp;-&nbsp;</h3>
            <h3 className="right-section">{getFormattedPrice(price)}</h3>
          </div>
          <div className="qty">
            <h2>QTY</h2>
            <h3>
              <label htmlFor={index} className="checkbox-label">
                <input
                  className="quantity-input"
                  type="number"
                  // name={name}
                  value={quantity}
                  id="qauntity-input"
                  onChange={handleItemQty}
                />
              </label>
            </h3>
          </div>
        </div>
      ))}
      <div className="toppings-list-item">
        <div className="left-section">Total:</div>
        <div className="right-section">{getFormattedPrice(total)}</div>
      </div>
    </div>
  );
};

export default AddItemCustomer;
