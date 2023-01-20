import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getMarketerPercentFromApi } from '../../redux/forms/marketerPercentReducer';
import Loader from '../loader/Loader';
import RenderPercent from './RenderPercent';

const MarketerPercent = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const percents = useSelector((state) => state.mPercent);
  const { id } = params;

  useEffect(() => {
    dispatch(getMarketerPercentFromApi(id));
  }, []);

  return (
    <div>
      {percents.loading ? (
        <Loader />
      ) : (
        <RenderPercent percents={percents?.data} />
      )}
    </div>
  );
};

export default MarketerPercent;
