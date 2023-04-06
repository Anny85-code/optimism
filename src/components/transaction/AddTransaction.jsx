/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getCustomerFromApi } from '../../redux/forms/customerReducer';
import { sendErrors } from '../../redux/forms/errors';
import { getMarketerCustomersFromApi } from '../../redux/forms/marketerCustomersReducer';
import Loader from '../loader/Loader';
import './AddTransaction.css';
import Blocker from '../../utils/Blocker';

const customerEx = (cardNumber, data) => {
  // const ids = [];
  const len = data?.filter((cus) => {
    // ids.push(cus.id);
    return cardNumber === cus.id;
  });
  // const highest = ids.sort().pop();
  return len?.length > 0;
  //  && cardNumber <= highest;
};

const AddTransaction = () => {
  const [cardNumber, setCardNumber] = useState(0);
  const error = document.getElementById('error');
  const [status, setStatus] = useState(false);
  const dispatch = useDispatch();
  const { user } = JSON.parse(localStorage.getItem('user'));
  const mCustomers = useSelector((state) => state.mCustomers);
  const customers = mCustomers?.data;
  const customerExists =
    cardNumber > 0 && customerEx(cardNumber, customers?.customers);

  const getInput = (e) => {
    const input = e.target.value;
    const extractCustomerId = input.split('/')[1];
    if (extractCustomerId) {
      if (extractCustomerId.match(/[a-zA-Z]$/)) {
        e.target.setAttribute('disabled', true);
        document.getElementById('resetInput').style.display = 'block';
        document.getElementById('nextbtn').style.display = 'none';
        error.innerText = 'Wrong Card No.\n Remove letters after /';
        error.style.display = 'block';
        error.style.color = 'white';
      } else {
        const intId = +extractCustomerId;
        setCardNumber(intId);
      }
    }
    input.length > 5 ? setStatus(true) : setStatus(false);
  };

  const handleReset = () => {
    const inputBox = document.querySelector('#card_number');
    inputBox.disabled = false;
    inputBox.value = '';
    document.getElementById('resetInput').style.display = 'none';
    error.style.display = 'none';
  };

  const handdleNext = () => {
    const errorMsg = `There's no customer with CARD NO. ${cardNumber}`;
    customerExists
      ? localStorage.setItem('cardNumber', cardNumber)
      : dispatch(sendErrors({ nilCardNo: errorMsg }));
  };

  useEffect(() => {
    dispatch(getMarketerCustomersFromApi(user.id));
  }, []);

  const message = `Collections are currently on hold \nContact you supervisor`;

  return (
    <>
      {!mCustomers.loading ? (
        <div className="form-container trans-form">
          <div className="inner-container">
            <h2 className="title">Collect contribution</h2>
          </div>
          <span style={{ color: 'crimson' }}>
            Enter Card number to move to the next page
          </span>
          <div id="error" style={{ display: 'none' }}></div>
          <form className="add-customer-form search-form" autoComplete="off">
            <label htmlFor="name" id="contr-num">
              <span>
                Card Number <span style={{ color: 'crimson' }}>*</span>
              </span>
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
            <div className="form-group btn1 trans-btn">
              {customerExists && (
                <>
                  {status && (
                    // ============== ORIGINAL CODE ==================== //
                    // <NavLink
                    //   to="/contribution"
                    //   style={{ textDecoration: 'none' }}
                    // >
                    //   <button
                    //     type="submit"
                    //     className="add-trans-btn"
                    //     id="nextbtn"
                    //     onClick={handdleNext}
                    //   >
                    //     Next
                    //     <i className="fa fa-arrow-right" id="toggle-btn" />
                    //   </button>
                    // </NavLink>
                    // ============== ORIGINAL CODE ==================== //

                    <Blocker trigger="Next" display={message} />
                  )}
                </>
              )}
            </div>
          </form>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
};
/* eslint-enable */
export default AddTransaction;
