import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import {
  getSeasonFromApi,
  postSeasonToApi,
} from '../../redux/forms/seasonReducer';
import './AddSeason.css';
import { getOneSeasonFromApi } from '../../redux/forms/oneSeasonReducer';

/* eslint-disable */
const AddSeason = () => {
  const seasons = useSelector((state) => state.seasons);
  const season = useSelector((state) => state.oneSeason);
  const { end_date } = season.data;
  const endDate = new Date(end_date);
  const today = new Date();
  const allSeasonsSize = seasons.data.length;
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
  const condition = name === '';
  const condition2 = days < 50;
  const condition3 = startDate < today;
  const allConditions = condition || condition2 || condition3;

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
    if (!season.data || today > endDate) {
      dispatch(postSeasonToApi(seasonData));
    } else {
      alert(
        `${
          season.data.name.slice(0, 1).toUpperCase() + season.data.name.slice(1)
        } is still on!!`
      );
    }
  };

  useEffect(() => {
    dispatch(getSeasonFromApi());
    dispatch(getOneSeasonFromApi(allSeasonsSize));
  }, []);

  return (
    <div className="form-container">
      <h2 className="title">Create new season</h2>
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
          <p className="end-date">End date: {endDateStr}</p>
        </div>
        <div className="form-group btn1">
          {!allConditions && (
            <NavLink to="/seasons" style={{ textDecoration: 'none' }}>
              <button
                type="submit"
                className="add-customer-btn season-btn"
                onClick={handdleCreate}
              >
                Create Season
              </button>
            </NavLink>
          )}
        </div>
      </form>
    </div>
  );
};
/* eslint-enable */
export default AddSeason;
