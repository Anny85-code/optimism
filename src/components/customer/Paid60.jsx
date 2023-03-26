/* eslint-disable */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPercentageFromApi } from '../../redux/forms/percentagesReducer';
import RenderPercent from './RenderPercent';
import Loader from '../loader/Loader';
/*
=========== This is the original percentage component ===============
*/
const PaidSixty = () => {
  const dispatch = useDispatch();
  const percents = useSelector((state) => state.percent);

  useEffect(() => {
    dispatch(getPercentageFromApi());
  }, []);

  return (
    <div>
      {percents?.loading ? (
        <Loader />
      ) : (
        <RenderPercent
          percents={percents?.data}
          owner={percents?.data?.marketer}
        />
      )}
    </div>
  );
};

export default PaidSixty;
/* eslint-enable */
