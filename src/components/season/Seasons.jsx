import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getSeasonFromApi } from '../../redux/forms/seasonReducer';

const Seasons = () => {
  const dispatch = useDispatch();
  const seasons = useSelector((state) => state.seasons);
  const { data } = seasons;

  useEffect(() => {
    dispatch(getSeasonFromApi());
  }, []);
  console.log(data);
  return (
    <div>
      {data.map((season) => (
        <NavLink key={season.id} to={`/season/${season.id}`}>
          <div>
            <h2>{season.name}</h2>
            <p>
              <span>Start Date: {season.start_date}</span>
            </p>
          </div>
        </NavLink>
      ))}
    </div>
  );
};

export default Seasons;
