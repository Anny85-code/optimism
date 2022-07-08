import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { postTransactionToApi } from '../../redux/forms/transactionReducer';

const AddTransaction = () => {
  const dispatch = useDispatch();
  const [cardNumber, setCardNumber] = useState('');

  const getInput = (e) => {
    const input = e.target.value;
    const extractCustomerId = input.split('/')[1];
    setCardNumber(extractCustomerId);
  };

  const handdleNext = () => {
    console.log(cardNumber);
  };

  // useEffect(() => {
  //   dispatch();
  // }, []);

  return (
    <div className="form-container">
      <h2 className="title">Collect contribution</h2>
      <form className="add-customer-form">
        <label htmlFor="name">
          Card Number *
          <input
            type="text"
            className="form-control"
            id="card number"
            name="card number"
            placeholder="card number"
            required
            // value={cardNumber}
            onChange={getInput}
          />
        </label>
        <div className="form-group btn1">
          <NavLink to="/ghahja" style={{ textDecoration: 'none' }}>
            <button
              type="submit"
              className="add-customer-btn"
              onClick={handdleNext}
            >
              Next
              <i className="fa fa-arrow-right" id="toggle-btn" />
            </button>
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default AddTransaction;
