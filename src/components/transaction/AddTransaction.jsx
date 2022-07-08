import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { postTransactionToApi } from '../../redux/forms/transactionReducer';

const AddTransaction = () => {
  const dispatch = useDispatch();
  const [cardNumber, setCardNumber] = useState('');

  const getInput = (e) => {
    e.preventDefault();
    setCardNumber(e.target.value);
  };

  const handdleNext = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const { id } = user.user;
    const transaction = {
      user_id: id,
      card_number: cardNumber,
    };

    dispatch(postTransactionToApi(transaction));
    console.log(1 + 1);
  };

  useEffect(() => {
    dispatch();
  }, []);

  return (
    <div className="form-container">
      <h2 className="title">Collect contribution</h2>
      <form onSubmit={handleSubmit} className="add-customer-form">
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
