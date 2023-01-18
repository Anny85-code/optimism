/* eslint-disable */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPercentageFromApi } from '../../redux/forms/percentagesReducer';
import Loader from '../loader/Loader';
import RenderPercent from './RenderPercent';

const PaidSixty = () => {
  const dispatch = useDispatch();
  const percents = useSelector((state) => state.percent?.data);

  useEffect(() => {
    dispatch(getPercentageFromApi());
  }, []);

  return <div>{RenderPercent(percents)}</div>;
};

export default PaidSixty;
/* eslint-enable */
