/* eslint-disable*/
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { NavLink } from 'react-router-dom';
// import { getCustomerFromApi } from '../../redux/forms/customerReducer';
// import { getUsersFromApi } from '../../redux/forms/userManReducer';
// import './Search.css';

const Blocker = () => {
  return (
    <div id="search-container1">
      {/* <h1 className="search-header">Search Customers</h1>
      <i className="fa fa-times" id="closeSearchIcon" onClick={handleSearch} />
      <div className="search-container">
        <div className="search-inner">
          <input
            className="search-input"
            id="search-input"
            type="text"
            onChange={handleChange}
            placeholder="Search customers"
            autoFocus={true}
          />
        </div>
      </div>
      <>
        {aCustomer &&
          aCustomer?.slice(pr, nx).map((customer) => {
            return (
              <div className="dropdown-row">
                <NavLink key={customer.id} to={`/customers/${customer.id}`}>
                  <div id="dropdown-main">
                    <div className="search-text">
                      <p onClick={handleSearch}>
                        {customer.card_number} - {customer.name}
                      </p>
                    </div>
                  </div>
                </NavLink>
              </div>
            );
          })}
      </>
      {len > 5 && (
        <div className="pre-next-cont pre-next-search">
          <i
            className="fa fa-caret-left fa-2x text-red"
            onClick={handPrevious}
            style={{ cursor: 'pointer' }}
          />
          <p className="pre-text pre-text-search">
            {pr + 1} - {nx < len ? nx : len} <span>of</span> {len}
          </p>
          <i
            className="fa fa-caret-right fa-2x text-red"
            onClick={handleNext}
            style={{ cursor: 'pointer' }}
          />
        </div>
      )} */}
      <p>No road!!</p>
    </div>
  );
};
/* eslint-enable */
export default Blocker;
