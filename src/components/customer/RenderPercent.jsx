/* eslint-disable */
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Paid60.css';
import './RenderPercent.css';
import comma from '../../utils/Comma';

const RenderPercent = ({ percents }) => {
  const data = JSON.parse(localStorage.getItem('user'));
  const { user } = data || {};
  const superadmin = user.role === 'superadmin';
  const [select, setSelect] = useState('hundred');

  const unpack = (data) => {
    const dataItems = data?.items?.[0]?.items;
    const jsonItems = JSON.parse(dataItems);
    const items = Object.values(jsonItems);
    return items.map((item) => [item?.id, item?.qauntity]).join('-');
    // // const res = {};
    // return items.map((item, i) => {
    //   res[`id_${i}`] = item?.id;
    //   res[`qty_${i}`] = item?.qauntity;
    // });
    // return res;
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
              <p className="columns" id="a">
                {per.card}
              </p>
              <p className="columns" id="a">
                {per.name}
              </p>
              <p className="columns">{per.phone}</p>
              <p
                className="columns i"
                id="top"
                style={{ borderRight: '2px solid crimson' }}
              >
                {per.total_days}
              </p>
              <p
                className="columns "
                style={{ borderRight: '2px solid crimson' }}
              >
                {comma(per.daily)}
              </p>
              <p className="columns" id="a">
                {comma(per.total)}
              </p>

              {/* <p className="columns">{unpack(per)}</p> */}
              <p className="columns">
                {/* {unpack(per) &&
                  unpack(per).map((item) => (
                    <div>
                      <span>{item}</span> */}
                <span>{unpack(per)}</span>
                {/* </div> */}
                {/* ))} */}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </NavLink>
  );

  const toggle = () => {
    switch (select) {
      case 'zero':
        return percents?.zero?.map((per) => {
          localStorage.setItem('setPercent', JSON.stringify(per));
          return renderData(per);
        });
      case 'twenty':
        return percents?.twenty?.map((per) => {
          localStorage.setItem('setPercent', JSON.stringify(per));
          return renderData(per);
        });
      case 'fourty':
        return percents?.fourty?.map((per) => {
          localStorage.setItem('setPercent', JSON.stringify(per));
          return renderData(per);
        });
      case 'sixty':
        return percents?.sixty?.map((per) => {
          localStorage.setItem('setPercent', JSON.stringify(per));
          return renderData(per);
        });
      case 'eighty':
        return percents?.eighty?.map((per) => {
          localStorage.setItem('setPercent', JSON.stringify(per));
          return renderData(per);
        });
      case 'hundred':
        return percents?.hundred?.map((per) => {
          localStorage.setItem('setPercent', JSON.stringify(per));
          return renderData(per);
        });
      default:
        break;
    }
  };

  const handlePercent = (e) => {
    setSelect(e.target.value);
    toggle();
  };

  const toggleTotal = () => {
    switch (select) {
      case 'zero':
        return percents?._0;
      case 'twenty':
        return percents?._20;
      case 'fourty':
        return percents?._40;
      case 'sixty':
        return percents?._60;
      case 'eighty':
        return percents?._80;
      case 'hundred':
        return percents?._100;
      default:
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
            <option value="zero">0%</option>
            <option value="twenty">20%</option>
            <option value="fourty">40%</option>
            <option value="sixty">60%</option>
            <option value="eighty">80%</option>
            <option value="hundred">100%</option>
          </select>
        </label>
      </div>

      <NavLink to="groupitems">
        <button className=" render-page-btn" id="render-btn">
          View Items
        </button>
      </NavLink>

      <div className="transact-customer-container">
        {superadmin && (
          <div>
            <div id="col">
              <h2 className="total-orders">Total: {toggleTotal() ?? 0}</h2>
            </div>
            <div className="custrans-name">
              <h6 className="columns " id="a">
                <span className="cus-name1">C/No</span>
              </h6>
              <h6 className="columns " id="a">
                <span className="cus-name1">Name</span>
              </h6>
              <h6 className="columns " id="a">
                <span className="cus-name1">Phone</span>
              </h6>
              <h6 className="columns ">Days Paid</h6>
              <h6 className="columns i" id="a">
                Daily
              </h6>
              <h6 className="columns" id="a">
                <span className="cus-name1 ">Total (NGN)</span>
              </h6>
              <h6 className="columns">
                <span className="cus-name1 ">Items</span>
              </h6>
            </div>

            <div className="custrans-name" id="col">
              <h6 className="columns" id="a">
                <span className="cus-name1"></span>
              </h6>
              <h6 className="columns" id="a">
                <span className="cus-name1"></span>
              </h6>
              <h6 className="columns" id="a">
                <span className="cus-name1"></span>
              </h6>
              <h6 className="columns " id="a">
                <span className="cus-name1"></span>
              </h6>
              <h6 className="columns" id="a">
                <span className="cus-name1"></span>
              </h6>
              <h6 className="columns" id="a">
                {' '}
                <span className="cus-name1"></span>
              </h6>
              <h6 className="columns" style={{ color: 'crimson' }}>
                {' '}
                <span className="cus-name1"></span>
              </h6>
            </div>
            {toggle()}
          </div>
        )}
        {!superadmin && <p>Unauthorized to see this page!</p>}
      </div>
    </div>
  );
};

RenderPercent.propTypes = {
  percents: PropTypes.object.isRequired,
};

export default RenderPercent;
/* eslint-enable */
