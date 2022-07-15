import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postCustomerToApi } from '../../redux/forms/customerReducer';
import { getItemFromApi } from '../../redux/forms/getItemsReducer';
import { getOneItemFromApi } from '../../redux/forms/oneItemReducer';
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
      console.log(userData);
      localStorage.removeItem('customer');
      localStorage.removeItem('image_str');
    }
  };

  useEffect(() => {
    dispatch(getItemFromApi());
    dispatch(getOneItemFromApi(current));
  }, [current]);

  return (
    <div>
      <div>
        <button type="button" onClick={handlePrevious}>
          Previous
        </button>
        <div>
          <h1>{name}</h1>
          <h4>{price}</h4>
          <h4>{description}</h4>
          <img src={picture} alt={name} style={{ width: '120px' }} />
          <input
            type="number"
            onChange={handleQuantity}
            value={qauntity.toString()}
          />
          <button type="button" onClick={handleSub}>
            Sum
          </button>
          <h3>{subTotal}</h3>
          <h1>{grandTotal}</h1>
        </div>
        <button type="button" onClick={handleNext}>
          Next
        </button>
      </div>
      <button type="button" onClick={handleContribution}>
        Finish
      </button>
    </div>
  );
};
/* eslint-enable */
export default AddItemToCustomer;
