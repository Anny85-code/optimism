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

  const toggle = () => {
    if (select === 'sixty') {
      return percents?.sixty?.map((per) => (
        <NavLink key={per.id} to={`/customers/${per.id}`}>
          <p style={{ color: 'black' }}>{per.name}</p>
        </NavLink>
      ));
    }
    if (select === 'hundred') {
      return percents?.hundred?.map((per) => (
        <NavLink key={per.id} to={`/customers/${per.id}`}>
          <p style={{ color: 'black' }}>{per.name}</p>
        </NavLink>
      ));
    }
  };

  return (
    <div>
      {admins && (
        <div>
          <div>
            <label htmlFor="role" className="form-label">
              Please select
              <select
                name="role"
                id="role"
                value={select}
                onChange={handlePercent}
              >
                <option defaultValue="PLEASE SELECT ...">Select Percent</option>
                <option value="sixty">sixty</option>
                <option value="hundred">hundred</option>
              </select>
            </label>
          </div>
          {toggle()}
        </div>
      )}
      {!admins && <p>Unauthorized to see this page!</p>}
    </div>
  );
};

export default PaidSixty;
/* eslint-enable */
