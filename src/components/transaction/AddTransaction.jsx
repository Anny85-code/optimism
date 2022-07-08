import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postTransactionToApi } from '../../redux/forms/transactionReducer';

const AddTransaction = () => {
  const dispatch = useDispatch();
  const [cardNumber, setCardNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    const { id } = user.user;
    const transaction = {
      user_id: id,
      card_number: cardNumber,
    };

    dispatch(postTransactionToApi(transaction));
  };
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
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </label>
        <div className="form-group btn1">
          <button type="submit" className="add-customer-btn">
            Next
            <i className="fa fa-arrow-right" id="toggle-btn" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTransaction;
