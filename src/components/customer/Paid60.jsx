/* eslint-disable */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPercentageFromApi } from '../../redux/forms/percentagesReducer';
import RenderPercent from './RenderPercent';
/*
=========== This is the original percentage component ===============
*/
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
