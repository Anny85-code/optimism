import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import DatePicker from 'react-datepicker';

const AddSeason = () => {
  const [name, setName] = useState('');
  const [days, setDays] = useState(0);
  const [startDate, setStartDate] = useState(new Date());

  // const { data } = customerDetails;
  // const lastTransaction = oneCustomerTransactions.slice(-1);
  // let lastDate;
  // lastDate === null || lastDate === undefined
  //   ? (lastDate = '2022-08-12') // Add start date of season here
  //   : (lastDate = lastTransaction[0]?.current_contribution_date);
  const date = new Date(startDate);
  const AddDaysToDate = date.setDate(date.getDate() + days);
  const convertDate = new Date(AddDaysToDate);
  console.log(convertDate);
  // const { name, daily_contribution } = data;
  // const amount = daysNo * daily_contribution;
  // const { user } = JSON.parse(localStorage.getItem('user'));

  // const currentDate =
  //   convertDate.getFullYear() +
  //   '-' +
  //   (convertDate.getMonth() + 1) +
  //   '-' +
  //   convertDate.getDate();

  // const handleDays = (e) => {
  //   setDaysNo(+e.target.value);
  // };

  const getName = (e) => {
    setName(e.target.value);
  };

  const getDays = (e) => {
    setDays(e.target.value);
  };

  const handdleNext = () => {
    localStorage.setItem('cardNumber', cardNumber);
  };

  /* eslint-disable */

  return (
    <div className="form-container">
      <h2 className="title">Collect contribution</h2>
      <div id="error" style={{ display: 'none' }}></div>
      <form className="add-customer-form" autoComplete="off">
        <label htmlFor="name">
          Name *
          <input
            type="text"
            className="form-control"
            id="season_name"
            name="Season name"
            placeholder="Season Name"
            required
            autoCorrect="off"
            value={name}
            onChange={getName}
          />
        </label>
        <label htmlFor="number_of_days">
          Number of Days *
          <input
            type="number"
            className="form-control"
            id="number_of_days"
            name="Season name"
            placeholder="Number of days"
            required
            autoCorrect="off"
            value={days}
            onChange={getDays}
          />
        </label>
        <label htmlFor="start_date">
          Start Date *
          <DatePicker
            dateFormat="yyyy/MM/dd"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </label>
        <div className="form-group btn1">
          <NavLink to="/contribution" style={{ textDecoration: 'none' }}>
            <button
              type="submit"
              className="add-trans-btn"
              onClick={handdleNext}
            >
              Create Season
            </button>
          </NavLink>
        </div>
      </form>
    </div>
  );
};
/* eslint-enable */
export default AddSeason;
