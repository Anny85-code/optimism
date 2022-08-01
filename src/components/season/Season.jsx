import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Moment from 'moment';
import { getOneSeasonFromApi } from '../../redux/forms/oneSeasonReducer';
import { getOneUserFromApi } from '../../redux/forms/oneUserManReducer';
import '../customer/Customer.css';
import './Season.css';

/* eslint-disable */
const Season = () => {
  const dispatch = useDispatch();
  // const data = JSON.parse(localStorage.getItem('user'));
  // const { user } = data || {};
  const param = useParams();
  const { id } = param;
  const season = useSelector((state) => state.oneSeason);
  const creator = useSelector((state) => state.oneUser);
  const { created_at } = creator.data;
  const creatorName = creator.data.name;
  const { name, number_of_days, start_date, end_date, user_id } = season.data;

  useEffect(() => {
    dispatch(getOneSeasonFromApi(id));
    dispatch(getOneUserFromApi(user_id));
  }, []);

  return (
    <div className="containa transaction season-cont">
      <div className="details-container">
        <h2>Season Details</h2>
        <h4 className="cus-details">
          <span>Name:</span> {name}
        </h4>
        <p className="cus-details">
          <span>Number of days:</span> {number_of_days}
        </p>
        <p className="cus-details">
          <span>Start date:</span> {start_date}
        </p>
        <p className="cus-details">
          <span>End date: </span>
          {end_date}
        </p>
        <p className="cus-details">
          Created by {creatorName} on {Moment(created_at).format('MMMM DD, LT')}
        </p>
      </div>
    </div>
  );
};
/* eslint-enable */
export default Season;
