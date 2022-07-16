import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getCustomerFromApi } from '../../redux/forms/customerReducer';
import './Search.css';

const Search = () => {
  const dispatch = useDispatch();
  const allCustomers = useSelector((state) => state.customer);
  const [aCustomer, setACustomer] = useState('');
  /* eslint-disable*/
  const handleSearch = () => {
    document.getElementById('search-container1').style.display = 'none';
  };

  const handleSelected = () => {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  useEffect(() => {
    dispatch(getCustomerFromApi());
  }, []);

  const handleChange = (event) => {
    const typedContent = event.target.value;
    const filteredCustomer = allCustomers.data.filter((customer) =>
      customer.name.toLowerCase().includes(typedContent.toLowerCase())
    );
    setACustomer(filteredCustomer);
  };

  return (
    <div id="search-container1">
      <h1 className="search-header">Search Customers</h1>
      <i className="fa fa-times" id="closeSearchIcon" onClick={handleSearch} />
      <div className="search-container">
        <div className="search-inner">
          <input
            className="search-input"
            type="text"
            onChange={handleChange}
            placeholder="Search customers"
            autoFocus={true}
          />
        </div>
      </div>
      <>
        {aCustomer &&
          aCustomer.slice(0, 5).map((customer) => (
            <NavLink key={customer.id} to={`/customers/${customer.id}`}>
              <div className="dropdown-row">
                <div className="search-text">
                  <p onClick={handleSelected}>{customer.name}</p>
                </div>
              </div>
            </NavLink>
          ))}
      </>
    </div>
  );
};
/* eslint-enable */
export default Search;
