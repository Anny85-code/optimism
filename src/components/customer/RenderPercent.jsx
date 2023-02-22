/* eslint-disable */
import React, { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import PropTypes from 'prop-types';
import './Paid60.css';
import comma from '../../utils/Comma';

const RenderPercent = ({ percents, owner }) => {
  const data = JSON.parse(localStorage.getItem('user'));
  const { user } = data || {};
  const superadmin = user.role === 'superadmin';
  const [select, setSelect] = useState('hundred');
  const sliceChunk = 20;
  const [nx, setNx] = useState(sliceChunk);
  const [pr, setPr] = useState(0);
  const componentRef = useRef();

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
      case 'twenty':
        return percents?.twenty?.slice(pr, nx).map((per) => renderData(per));
      case 'fourty':
        return percents?.fourty?.slice(pr, nx).map((per) => renderData(per));
      case 'sixty':
        return percents?.sixty?.slice(pr, nx).map((per) => renderData(per));
      case 'eighty':
        return percents?.eighty?.slice(pr, nx).map((per) => renderData(per));
      case 'hundred':
        return percents?.hundred?.slice(pr, nx).map((per) => renderData(per));
      default:
        break;
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'emp-data',
  });

  const handlePercent = (e) => {
    setSelect(e.target.value);
    toggle();
  };

  const toggleTotal = () => {
    switch (select) {
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

  const len = toggleTotal();

  const handleNext = () => {
    if (nx <= len) {
      setNx(nx + sliceChunk);
      setPr(pr + sliceChunk);
    }
  };

  const handPrevious = () => {
    if (pr > 1) {
      setPr(pr - sliceChunk);
      setNx(nx - sliceChunk);
    }
  };

  return (
    <div className="main-percent-conrainer" ref={componentRef}>
      <div className="percent-input">
        <label htmlFor="role" className="form-label">
          <center>Please Select Percentage</center>
          <center style={{ margin: '12px 0' }}>
            <button className="view-trans" type="button" onClick={handlePrint}>
              Print
            </button>
          </center>
          <select
            value={select}
            onChange={handlePercent}
            className="select-percent"
            id="opt-id"
          >
            <option defaultValue="PLEASE SELECT ...">Select Percent</option>
            <option value="twenty">20%</option>
            <option value="fourty">40%</option>
            <option value="sixty">60%</option>
            <option value="eighty">80%</option>
            <option value="hundred">100%</option>
          </select>
        </label>
      </div>

      <div className="transact-customer-container">
        {superadmin && (
          <div>
            <div id="col">
              <h2 className="total-orders">
                {owner ?? 'General'} ---- Total: {toggleTotal() ?? 0}
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
        {!superadmin && <p>Unauthorized to see this page!</p>}
        {len > 0 && (
          <div className="pre-next-cont">
            <i
              className="fa fa-caret-left fa-2x text-red"
              onClick={handPrevious}
              style={{ cursor: 'pointer' }}
            />
            <p className="pre-text">
              {pr + 1} - {nx < len ? nx : len} <span>of</span> {len}
            </p>
            <i
              className="fa fa-caret-right fa-2x text-red"
              onClick={handleNext}
              style={{ cursor: 'pointer' }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

RenderPercent.propTypes = {
  percents: PropTypes.object.isRequired,
  owner: PropTypes.string.isRequired,
};

export default RenderPercent;
/* eslint-enable */
