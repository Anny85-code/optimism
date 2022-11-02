import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPercentageFromApi } from '../../redux/forms/percentagesReducer';

const PaidSixty = () => {
  const dispatch = useDispatch();
  const percents = useSelector((state) => state.percent?.data);
  const data = JSON.parse(localStorage.getItem('user'));
  const { user } = data || {};
  const admins = user.role === 'admin' || user.role === 'superadmin';

  console.log(percents);

  useEffect(() => {
    dispatch(getPercentageFromApi());
  }, []);

  return (
    <div>
      {admins && <p>Paid60</p>}
      {!admins && <p>Unauthorized to see this page!</p>}
    </div>
  );
};

export default PaidSixty;
