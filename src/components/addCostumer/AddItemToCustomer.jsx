import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postCustomerToApi } from '../../redux/forms/customerReducer';
import { getItemFromApi } from '../../redux/forms/getItemsReducer';
import { getOneItemFromApi } from '../../redux/forms/oneItemReducer';
import './AddItemToCustomer.css';
/* eslint-disable */
const AddItemToCustomer = () => {
  const dispatch = useDispatch();
  const item = useSelector((state) => state.oneItem);
  const items = useSelector((state) => state.item);
  const lastItem = items.data.length;
  const [current, setCurrent] = useState(1);
  const [qauntity, setQuantity] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState([]);
  const { name, price, description, picture } = item.data;
  const grandTotal = total.reduce((a, b) => b.subTotal + a, 0);

  const handlePrevious = () => {
    if (current > 1) {
      setCurrent(current - 1);
    }
  };

const getFormattedPrice = (price) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'NGN',
    }).format(price);

  const handleNext = () => {
    if (current < lastItem) {
      setCurrent(current + 1);
    }
    const eachItem = {
      id: current,
      name,
      price,
      qauntity,
      subTotal,
    };
    setTotal([...total, eachItem]);
    setQuantity(0);
    setSubTotal(0);
  };

  const handleQuantity = (e) => {
    setQuantity(+e.target.value);
  };

  const handleSub = () => {
    setSubTotal(qauntity * +price);
  };

  const handleContribution = () => {
    if (grandTotal > 0) {
      let customer = JSON.parse(localStorage.getItem('customer'));
      const userData = { ...customer, daily_contribution: grandTotal };
      dispatch(postCustomerToApi(userData));
      localStorage.removeItem('customer');
      localStorage.removeItem('image_str');
    }
  };

  useEffect(() => {
    dispatch(getItemFromApi());
    dispatch(getOneItemFromApi(current));
  }, [current]);

  return (
    <div className="items-to-costumer">
      <div className="quantity-pic-container">
        <ul className="pic-previous">
          <li>
            <i
              className="fa fa-arrow-left"
              id="toggle-btn"
              onClick={handlePrevious}
            />
          </li>
          <li>
            <img src={picture} alt={name} className="quantity-pic" />
          </li>
          <li>
            <i
              className="fa fa-arrow-right"
              id="toggle-btn"
              onClick={handleNext}
            />
          </li>
        </ul>
      </div>
      <div className="products-container">
        <div className="product-name-container">
          <ul className="product-name-price">
            <li>
              <h4 className="qty-i-name">{name}</h4>
            </li>
            <li className="qunatity-price">
              <h4>{getFormattedPrice(price)}</h4>
            </li>
          </ul>
          <h4 className="qty-desc">{description}</h4>
          <ul className="input-add">
            <li>
              <input
                type="number"
                onChange={handleQuantity}
                value={qauntity.toString()}
                className="quantity-input"
              />
            </li>
            <li>
              <button
                type="button"
                onClick={handleSub}
                className="sum-item-btn"
              >
                Sum Item
              </button>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="qty-sub-total">Sub total:&nbsp;{subTotal}</h3>
          <h1 className="qty-p-total">Grand total: &nbsp;{grandTotal}</h1>
        </div>
        <button
          type="button"
          onClick={handleContribution}
          className="finish-btn"
        >
          Add Customer
        </button>
      </div>
    </div>
  );
};
/* eslint-enable */
export default AddItemToCustomer;
