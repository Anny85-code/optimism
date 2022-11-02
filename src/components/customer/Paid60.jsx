import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getPercentageFromApi } from '../../redux/forms/percentagesReducer';

const PaidSixty = () => {
  const dispatch = useDispatch();
  const percents = useSelector((state) => state.percent?.data);
  const data = JSON.parse(localStorage.getItem('user'));
  const { user } = data || {};
  const admins = user.role === 'admin' || user.role === 'superadmin';

  useEffect(() => {
    dispatch(getPercentageFromApi());
  }, []);

  return (
    <div>
      {admins && (
        <>
          {percents.sixty.map((per) => (
            <NavLink key={per.id} to={`/customers/${per.id}`}>
              <p style={{ color: 'black' }}>{per.name}</p>
            </NavLink>
          ))}
        </>
      )}
      {!admins && <p>Unauthorized to see this page!</p>}
    </div>
  );
};

export default PaidSixty;
