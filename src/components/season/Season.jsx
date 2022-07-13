import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'moment';
import '../customer/Customer.css';
import { getOneSeasonFromApi } from '../../redux/forms/oneSeasonReducer';
import { getOneUserFromApi } from '../../redux/forms/oneUserManReducer';

const Season = () => {
  const dispatch = useDispatch();
  const data = JSON.parse(localStorage.getItem('user'));
  const { user } = data || {};
  const param = useParams();
  const { id } = param;
  const season = useSelector((state) => state.oneSeason);
  const creator = useSelector((state) => state.oneUser);

  useEffect(() => {
    dispatch(getOneSeasonFromApi(id));
    dispatch(getOneUserFromApi(user_id));
  }, []);

  /* eslint-disable */

  const { created_at } = creator.data;
  const creatorName = creator.data.name;
  const { name, number_of_days, start_date, end_date, user_id } = season.data;

  return (
    <div className="containa transaction">
      <h2>Season Details</h2>
      <div className="details-container">
        <h4 className="cus-details">Name: {name}</h4>
        <p className="cus-details">Number of days: NGN {number_of_days}</p>
        <p className="cus-details">Start date: {start_date}</p>
        <p className="cus-details">End date: {end_date}</p>
        <p className="cus-details">
          Date of transaction:{Moment(created_at).format('MMMM DD, LT')}
        </p>
      </div>
    </div>
  );
};

/* eslint-enable */
export default Season;
