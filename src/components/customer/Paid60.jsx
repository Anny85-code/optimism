/* eslint-disable */
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getPercentageFromApi } from '../../redux/forms/percentagesReducer';

const PaidSixty = () => {
  const dispatch = useDispatch();
  const percents = useSelector((state) => state.percent?.data);
  const data = JSON.parse(localStorage.getItem('user'));
  const { user } = data || {};
  const admins = user.role === 'admin' || user.role === 'superadmin';
  const [select, setSelect] = useState('sixty');

  useEffect(() => {
    dispatch(getPercentageFromApi());
  }, []);

  const handlePercent = (e) => {
    setSelect(e.target.value);
    toggle();
  };

  const renderData = (per) => (
    <NavLink
      style={{ color: 'black' }}
      key={per.id}
      to={`/customers/${per.id}`}
    >
      <p>{per.name}</p>
      <p>{per.total_days}</p>
      <p>{per.daily}</p>
      <p>{per.total}</p>
    </NavLink>
  );

  const toggle = () => {
    if (select === 'sixty') {
      return percents?.sixty?.map((per) => renderData(per));
    }
    if (select === 'hundred') {
      return percents?.hundred?.map((per) => renderData(per));
    }
  };

  return (
    <div>
      {admins && (
        <div>
          <div>
            <label htmlFor="role" className="form-label">
              Please Select Percentage
              <select value={select} onChange={handlePercent}>
                <option defaultValue="PLEASE SELECT ...">Select Percent</option>
                <option value="sixty">60%</option>
                <option value="hundred">100%</option>
              </select>
            </label>
          </div>
          <p>{select === 'sixty' ? percents._60 : percents._100}</p>
          {toggle()}
        </div>
      )}
      {!admins && <p>Unauthorized to see this page!</p>}
    </div>
  );
};

export default PaidSixty;
/* eslint-enable */
