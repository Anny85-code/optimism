import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSeasonFromApi } from '../../redux/forms/seasonReducer';

const Seasons = () => {
  const dispatch = useDispatch();
  const seasons = useSelector((state) => state.seasons);
  useEffect(() => {
    dispatch(getSeasonFromApi());
  }, []);
  return (
    <div>
      <h1>Seasons</h1>
    </div>
  );
};

export default Seasons;
