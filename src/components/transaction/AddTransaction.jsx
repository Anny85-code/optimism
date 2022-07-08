import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { postTransactionToApi } from '../../redux/forms/transactionReducer';

const AddTransaction = () => {
  const dispatch = useDispatch();
  const [cardNumber, setCardNumber] = useState('');
  const error = document.getElementById('error');

  const getInput = (e) => {
    const input = e.target.value;
    const extractCustomerId = input.split('/')[1];
    if (extractCustomerId) {
      if (extractCustomerId.match(/[a-zA-Z]$/)) {
        e.target.setAttribute('disabled', true);
        document.getElementById('resetInput').style.display = 'block';
        error.innerText = 'Wrong Card No.\n Remove letters after /';
        error.style.display = 'block';
        error.style.color = 'blue';
      } else {
        const intId = +extractCustomerId;
        setCardNumber(intId);
      }
    }
  };

  const handleReset = (e) => {
    const inputBox = document.querySelector('#card_number');
    inputBox.disabled = false;
    inputBox.value = '';
    document.getElementById('resetInput').style.display = 'none';
    error.style.display = 'none';
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
      <div id="error" style={{ display: 'none' }}></div>
      <form className="add-customer-form" autoComplete="off">
        <label htmlFor="name">
          Card Number *
          <input
            type="text"
            className="form-control"
            id="card_number"
            name="card number"
            placeholder="card number"
            required
            autoCorrect="off"
            onChange={getInput}
          />
          <span
            id="resetInput"
            style={{ display: 'none', color: 'white', fontSize: '12px' }}
            onClick={handleReset}
          >
            Reset
          </span>
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
