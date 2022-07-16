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
      <div className="products-container">
        <div>
          <ul className="product-name-price">
            <li>
              <h2>{name}</h2>
            </li>
            <li>
              <h4>{getFormattedPrice(price)}</h4>
            </li>
          </ul>
          <div>
            <ul>
              <li>
                <button type="button" onClick={handlePrevious}>
                  Previous
                </button>
              </li>
              <li>
                <img src={picture} alt={name} style={{ width: '120px' }} />
              </li>
              <li>
                <button type="button" onClick={handleNext}>
                  Next
                </button>
              </li>
            </ul>
          </div>
          <h4>{description}</h4>
          <div>
            <input
              type="number"
              onChange={handleQuantity}
              value={qauntity.toString()}
            />
            <button type="button" onClick={handleSub}>
              Sum
            </button>
          </div>

          <h3>Sub total:&nbsp;{subTotal}</h3>
          <h1>Grand total: &nbsp;{grandTotal}</h1>
        </div>
      </div>
      <button type="button" onClick={handleContribution}>
        Finish
      </button>
    </div>
  );
};
/* eslint-enable */
export default AddItemToCustomer;
