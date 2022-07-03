import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItemFromApi } from '../../../redux/forms/getItemsReducer';
import './AddItemCustomer.css';

const AddItemCustomer = () => {
  const [checked, setChecked] = useState([]);
  const allItemsCostumer = useSelector((state) => state.item);

  const dispatch = useDispatch();
  const { data } = allItemsCostumer;
  const dataPrices = data.map((la) => la.price);

  useEffect(() => {
    dispatch(getItemFromApi());
  }, []);

  const handleCheck = (event) => {
    let updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  const [quantity, setQuantity] = useState(1);

  const handleItemQty = (e) => {
    if (e.target.value > 0) {
      setQuantity(e.target.value);
    }
  };

  const getFormattedPrice = (price) => new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'NGN',
  }).format(price);

/* eslint-disable */
  const checkedItems = checked.length
    ? checked.reduce((total, item, ind) => {
        return total + +dataPrices[ind];
      }, 0)
    : 0;
    // Return classes based on whether item is checked
    var isChecked = (item) =>
    checked.includes(item) ? 'checked-item' : 'not-checked-item';
    /* eslint-enable */

  return (
    <div className="items-costumer">
      {data.map(({ name, price }, index) => (
        /* eslint-disable */
        <div key={index} className="checkbox-container">
          <h3>
            <label htmlFor={index} className="checkbox-label">
              <input
                className="checkbox-input"
                type="checkbox"
                value={name}
                onChange={handleCheck}
              />
            </label>
          </h3>
          <div className="price-name">
            <h3 className={isChecked(name)} id="item-costumer-name">
              {name}
            </h3>
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
        <div className="right-section">
          {getFormattedPrice(checkedItems)}
        </div>
      </div>
    </div>
  );
};
/* eslint-enable */
export default AddItemCustomer;
