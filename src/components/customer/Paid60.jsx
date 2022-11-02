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
  const [select, setSelect] = useState('PLEASE SELECT ...');

  useEffect(() => {
    dispatch(getPercentageFromApi());
  }, []);

  return (
    <div>
      {admins && (
        <div>
          <p>Please select</p>
          <div>
            <label htmlFor="role" className="form-label">
              Position
              <select
                name="role"
                id="role"
                value={select}
                onChange={(e) => setSelect(e.target.value)}
              >
                <option defaultValue="PLEASE SELECT ...">
                  PLEASE SELECT ...
                </option>
                <option value="Admin">sixty</option>
                <option value="Supervisor">hundred</option>
              </select>
            </label>
          </div>
          {percents?.hundred?.map((per) => (
            <NavLink key={per.id} to={`/customers/${per.id}`}>
              <p style={{ color: 'black' }}>{per.name}</p>
            </NavLink>
          ))}
        </div>
      )}
      {!admins && <p>Unauthorized to see this page!</p>}
    </div>
  );
};

export default PaidSixty;
/* eslint-enable */
