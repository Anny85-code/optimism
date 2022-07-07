import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getCustomerFromApi } from '../../redux/forms/customerReducer';
import './Search.css';

const Search = () => {
  const dispatch = useDispatch();
  const allCustomers = useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(getCustomerFromApi());
  }, []);

  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
    customer = document.querySelector('.search-input');
  };

  console.log('customer', customer);

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
  };

  const filteredData = allCustomers.data.filter((item) => {
    const searchTerm = value.toLowerCase();
    const fullName = item.name.toLowerCase();
    /*eslint-disable */
    return (
      searchTerm && fullName.startsWith(searchTerm) && fullName !== searchTerm
    );
  });

  const mapedData = filteredData.slice(0, 10).map((item) => {
    return (
      <div
        onClick={() => onSearch(item.name)}
        className="dropdown-row"
        key={item.name}
      >
        {item.name}
      </div>
    );
  });
  // console.log('mapedData ', mapedData);
  // const customer = allCustomers.data.filter(
  //   (item) => item.name === 'Peter Obi'
  // );
  // console.log('customer ', customer);

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
            placeholder="Search"
            id="search-input-id"
          />
          <NavLink to={`/customers/${value.id}`}>
            <button
              className="search-btn"
              type="button"
              value={value}
              onClick={onSearch}
            >
              Search
            </button>
          </NavLink>
        </div>
        <div className="dropdown">{mapedData}</div>
      </div>
    </div>
  );
};
/* eslint-enable */
export default Search;
