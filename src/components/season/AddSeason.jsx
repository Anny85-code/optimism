import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { postSeasonToApi } from '../../redux/forms/seasonReducer';

/* eslint-disable */
const AddSeason = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [days, setDays] = useState(0);
  const [startDate, setStartDate] = useState(new Date());
  const { user } = JSON.parse(localStorage.getItem('user'));
  const startDateStr =
    startDate.getFullYear() +
    '-' +
    (startDate.getMonth() + 1) +
    '-' +
    startDate.getDate();
  const date = new Date(startDateStr);
  const AddDaysToDate = date.setDate(date.getDate() + +days);
  const convertDate = new Date(AddDaysToDate);

  const getName = (e) => {
    setName(e.target.value);
  };

  const getDays = (e) => {
    const days = e.target.value;
    setDays(days);
  };

  const endDateStr =
    convertDate.getFullYear() +
    '-' +
    (convertDate.getMonth() + 1) +
    '-' +
    convertDate.getDate();

  const seasonData = {
    name,
    user_id: user.id,
    start_date: startDate,
    number_of_days: +days,
    end_date: convertDate,
  };

  const handdleCreate = () => {
    dispatch(postSeasonToApi(seasonData));
  };

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
        <div>
          <p>{endDateStr}</p>
        </div>
        <div className="form-group btn1">
          <NavLink to="/seasons" style={{ textDecoration: 'none' }}>
            <button
              type="submit"
              className="add-trans-btn"
              onClick={handdleCreate}
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