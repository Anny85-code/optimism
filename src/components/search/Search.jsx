import React, { useEffect, useState } from 'react';
// import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerFromApi } from '../../redux/forms/customerReducer';
import './Search.css';
// var data = require('./MOCK_DATA.json');

const Search = () => {
  const dispatch = useDispatch();
  const allCustomers = useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(getCustomerFromApi());
  }, []);

  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    // our api to fetch the search result
    console.log('search ', searchTerm);
  };

  return (
    <div className="search-container1">
      <h1>Search</h1>

      <div className="search-container">
        <div className="search-inner">
          <input
            className="search-input"
            type="text"
            value={value}
            onChange={onChange}
          />
          <button type="button" onClick={() => onSearch(value)}>
            Search
          </button>
        </div>
        <div className="dropdown">
          {allCustomers.data
            .filter((item) => {
              const searchTerm = value.toLowerCase();
              const fullName = item.name.toLowerCase();
              /*eslint-disable */
              return (
                searchTerm &&
                fullName.startsWith(searchTerm) &&
                fullName !== searchTerm
              );
            })
            .slice(0, 10)
            .map((item) => (
              <div
                onClick={() => onSearch(item.name)}
                className="dropdown-row"
                key={item.name}
              >
                {item.name}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
/* eslint-enable */
export default Search;
