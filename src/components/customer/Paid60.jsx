/* eslint-disable */
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getPercentageFromApi } from '../../redux/forms/percentagesReducer';
import Loader from '../loader/Loader';
import './Paid60.css';

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

  const comma = (num) => {
    const number = parseInt(num);
    const newText = number.toLocaleString();
    return newText;
  };

  const renderData = (per) => (
    <NavLink
      style={{ color: 'black' }}
      key={per.id}
      to={`/customers/${per.id}`}
    >
      <div>
        <ul id="p-child">
          <li>
            <div className="custrans-name">
              <h4 className="columns">{per.name}</h4>
              <h4 className="columns i" id="top">
                {per.total_days}
              </h4>
              <h4
                className="columns i"
                style={{ borderRight: '2px solid crimson' }}
              >
                {comma(per.daily)}
              </h4>
              <h4 className="columns">NGN {comma(per.total)}</h4>
            </div>
          </li>
        </ul>
      </div>
    </NavLink>
  );

  const toggle = () => {
    switch (select) {
      case 'fourty':
        return percents?.fourty?.map((per) => renderData(per));
      case 'sixty':
        return percents?.sixty?.map((per) => renderData(per));
      case 'hundred':
        return percents?.hundred?.map((per) => renderData(per));
      default:
        <Loader />;
        break;
    }
  };

  return (
    <div className="main-percent-conrainer">
      <div className="percent-input">
        <label htmlFor="role" className="form-label">
          <center>Please Select Percentage</center>
          <select
            value={select}
            onChange={handlePercent}
            className="select-percent"
            id="opt-id"
          >
            <option defaultValue="PLEASE SELECT ...">Select Percent</option>
            <option value="fourty">40%</option>
            <option value="sixty">60%</option>
            <option value="hundred">100%</option>
          </select>
        </label>
      </div>

      <div className="transact-customer-container">
        {admins && (
          <div>
            <div id="col">
              <h2 className="total-orders">
                Total: {select === 'sixty' ? percents._60 : percents._100}
              </h2>
            </div>
            <div className="custrans-name">
              <h4 className="columns">
                <span className="cus-name1">Customer Name</span>
              </h4>
              <h4 className="columns i">Days Paid For</h4>
              <h4 className="columns i" id="a">
                Daily Contribution
              </h4>
              <h4 className="columns">
                <span className="cus-name1 ">Total Amount</span>
              </h4>
            </div>

            <div className="custrans-name">
              <h3 className="columns" id="col">
                <p className="custransactname"></p>
              </h3>
              <h6
                className="columns i"
                style={{ borderBottom: '2px solid crimson' }}
              ></h6>
              <h3
                className="columns i"
                id="col"
                style={{
                  borderRight: '2px solid crimson',
                  borderBottom: '2px solid crimson',
                  color: 'crimson',
                }}
              ></h3>
              <h3
                className="columns"
                id="col"
                style={{ color: 'crimson' }}
              ></h3>
            </div>
            {toggle()}
          </div>
        )}
        {!admins && <p>Unauthorized to see this page!</p>}
      </div>
    </div>
  );
};

export default PaidSixty;
/* eslint-enable */
