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

  useEffect(() => {
    dispatch(getCustomerFromApi());
  }, []);


  const handleChange = (event) => {
    console.log(event.target.value);
    const typedContent = event.target.value;
    const filteredCustomer = allCustomers.data.filter((customer) =>
      customer.name.toLowerCase().includes(typedContent.toLowerCase())
    );
    setACustomer(filteredCustomer);
    setTimeout(() => {
      window.location.reload();
    }, 5000);
  };

  console.log('aCustomer', aCustomer);

  
  return (
    <div
    id="search-container1"
    >
      <h1>Search Customers</h1>
      <i className="fa fa-times"
        id="sidebarIcon"
        onClick={handleSearch}
      />
      <div className="search-container">
        <div className="search-inner">
          <input
            className="search-input"
            type="text"
            onChange={handleChange}
            placeholder="Search customers"
          />
        </div>
      </div>
      <>
        {aCustomer &&
          aCustomer.slice(0, 5).map((customer) => (
            <NavLink key={customer.id} to={`/customers/${customer.id}`}>
              <div className="dropdown-row">
                <div className="search-text">
                  <p>{customer.name}</p>
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
