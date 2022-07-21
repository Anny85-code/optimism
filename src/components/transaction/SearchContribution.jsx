import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './AddTransaction.css';
import './SearchContribution.css';

/* eslint-disable */

const SearchContribution = () => {
  const [contNumber, setContNumber] = useState('');
  const error = document.getElementById('error');
  const [status, setStatus] = useState(false);

  const getInput = (e) => {
    const input = e.target.value;
    if (input.length > 5) {
      setStatus(true);
    } else {
      setStatus(false);
    }
    const extractContributionId = input.split('/')[1];
    if (extractContributionId) {
      if (extractContributionId.match(/[a-zA-Z]$/)) {
        e.target.setAttribute('disabled', true);
        document.getElementById('resetInput').style.display = 'block';
        error.innerText = 'Wrong No.\n Remove letters after /';
        error.style.display = 'block';
        error.style.color = 'white';
      } else {
        const intId = +extractContributionId;
        setContNumber(intId);
      }
    }
  };

  const handleReset = () => {
    const inputBox = document.querySelector('#contribution_number');
    inputBox.disabled = false;
    inputBox.value = '';
    document.getElementById('resetInput').style.display = 'none';
    error.style.display = 'none';
  };

  const handdleNext = () => {
    localStorage.setItem('contNumber', contNumber);
  };

  return (
    <div className="Search-contr-container trans-form">
      <div className="inner-container">
        <h2 className="title">Search Contribution</h2>
      </div>
      <div id="error" style={{ display: 'none' }}></div>
      <form className="add-customer-form" autoComplete="off">
        <label htmlFor="contribution_number">
          Contribution Number *
          <input
            type="text"
            className="form-control"
            id="contribution_number"
            name="contribution_number"
            placeholder="Contribution Number"
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
          {status && (
            <NavLink
              to={`/transactions/${contNumber}`}
              style={{ textDecoration: 'none' }}
            >
              <button
                type="submit"
                className="add-trans-btn"
                onClick={handdleNext}
              >
                Next
                <i className="fa fa-arrow-right" id="toggle-btn" />
              </button>
            </NavLink>
          )}
        </div>
      </form>
    </div>
  );
};
/* eslint-enable */
export default SearchContribution;
