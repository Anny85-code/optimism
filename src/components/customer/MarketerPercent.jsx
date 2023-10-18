import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getMarketerPercentFromApi } from '../../redux/forms/marketerPercentReducer';
import Loader from '../loader/Loader';
import RenderPercent from './RenderPercent';
import { getSupervisorPercentFromApi } from '../../redux/forms/supervisorPercentReducer';

const MarketerPercent = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const percents = useSelector((state) => state.mPercent);
  const supervisors = useSelector((state) => state.supvPercent);
  const usersRed = useSelector((state) => state.userManReducer);
  const users = usersRed?.data;
  const { id } = params;
  const currentUser = users?.filter((user) => user?.id === +id);
  const role = currentUser?.[0]?.role;
  const sup = role === 'supervisor';
  const loading = !percents?.data || !supervisors?.data;

  useEffect(() => {
    dispatch(getMarketerPercentFromApi(id));
    dispatch(getSupervisorPercentFromApi(id));
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <RenderPercent
          percents={sup ? supervisors?.data : percents?.data}
          owner={sup ? supervisors?.data?.marketer : percents?.data?.marketer}
        />
      )}
    </div>
  );
};

export default MarketerPercent;
