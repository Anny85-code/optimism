/* eslint-disable */
import React, { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { utils, writeFileXLSX } from 'xlsx';
import PropTypes from 'prop-types';
import './Paid60.css';
import './RenderPercent.css';
import comma from '../../utils/Comma';

const RenderPercent = ({ percents, owner }) => {
  const data = JSON.parse(localStorage.getItem('user'));
  const { user } = data || {};
  const superadmin = user.role === 'superadmin';
  const [select, setSelect] = useState('Select Percent');
  const sliceChunk = 50;
  const [nx, setNx] = useState(sliceChunk);
  const [pr, setPr] = useState(0);
  const componentRef = useRef();

  const unpack = (data) => {
    const dataItems = data?.items?.[0]?.items;
    const jsonItems = dataItems && JSON.parse(dataItems);
    const items = jsonItems && Object.values(jsonItems);
    return items && items.map((item) => [item?.id, item?.qauntity]).join('-');
  };

  const renderData = (per) => (
    <NavLink
      style={{ color: 'black' }}
      key={per.id}
      to={`/customers/${per.id}`}
      target="_blank"
    >
      <div>
        <ul id="p-child">
          <li>
            <div className="custrans-name">
              <p className="columns" id="a">
                {per && per.card}
              </p>
              <p className="columns" id="a">
                {per && per.name}
              </p>
              <p className="columns">{per && per.phone}</p>
              <p
                className="columns i"
                id="top"
                style={{ borderRight: '2px solid crimson' }}
              >
                {per && per.total_days}
              </p>
              <p
                className="columns "
                style={{ borderRight: '2px solid crimson' }}
              >
                {comma(per && per.daily)}
              </p>
              <p className="columns" id="a">
                {comma(per && per.total)}
              </p>

              {/* <p className="columns">{unpack(per)}</p> */}
              <p className="columns">
                {/* {unpack(per) &&
                  unpack(per).map((item) => (
                    <div>
                      <span>{item}</span> */}
                <span>{unpack(per && per)}</span>
                {/* </div> */}
                {/* ))} */}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </NavLink>
  );

  const percentValues = [
    ['zero', '_0'],
    ['ten', '_10'],
    ['twenty', '_20'],
    ['twenty_five', '_25'],
    ['thirty', '_30'],
    ['fourty', '_40'],
    ['fifty', '_50'],
    ['sixty', '_60'],
    ['seventy', '_70'],
    ['seventy_five', '_75'],
    ['eighty', '_80'],
    ['ninety', '_90'],
    ['hundred', '_100'],
  ];
  const selectedPercent = select;

  if (owner === 'General') {
    percentValues.splice(0, 5);
  }

  const toggle = () => {
    const selectedValue = percentValues.find(
      ([label]) => label === selectedPercent
    );

    if (selectedValue) {
      const [label] = selectedValue;

      const selectedPercents = percents?.[label];
      if (selectedPercents) {
        localStorage.setItem('setPercent', JSON.stringify(selectedPercents));
        return selectedPercents.slice(pr, nx).map((per) => renderData(per));
      }
    }
  };

  const renderOptions = () => {
    return (
      <>
        {percentValues.map((centa) => (
          <option key={centa[1]} value={centa[0]}>
            {centa[1].slice(1)}%
          </option>
        ))}
      </>
    );
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'emp-data',
  });

  const handlePercent = (e) => {
    setSelect(e.target.value);
    setPr(0);
    setNx(sliceChunk);
    toggle();
  };

  const selectToPropertyMap = Object.fromEntries(percentValues);

  const toggleTotal = () => {
    const selectedProperty = selectToPropertyMap?.[select];
    return selectedProperty ? percents?.[selectedProperty] : null;
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

  const handleExp = () => {
    const percent = localStorage.getItem('setPercent');
    let exportData = JSON.parse(percent);

    exportData = exportData.map((cus) => {
      const newCus = { ...cus, items: unpack(cus) };
      return newCus;
    });

    const ws = utils.json_to_sheet(exportData);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Data');
    writeFileXLSX(wb, `${owner.replace(' ', '_')}.xlsx`);
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
            {renderOptions()}
          </select>
        </label>
      </div>

      <center>
        <button className=" render-page-btn" id="render-btn">
          <NavLink to="groupitems" target="_blank">
            View Items
          </NavLink>
        </button>
        <button
          onClick={handleExp}
          className=" render-page-btn"
          id="render-btn"
        >
          Export Items
        </button>
      </center>

      <div className="transact-customer-container">
        {superadmin && (
          <div key={owner}>
            <div id="col">
              <h2 className="total-orders">
                {owner ?? 'General'} ---- Total: {toggleTotal() ?? 0}
              </h2>
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

/* eslint-enable */
export default RenderPercent;
