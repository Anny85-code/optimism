import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getCustomerFromApi } from '../../redux/forms/customerReducer';
import './Search.css';

/* eslint-disable*/
const Search = () => {
  const dispatch = useDispatch();
  const allCustomers = useSelector((state) => state.customer?.data);
  const [aCustomer, setACustomer] = useState('');
  const data = JSON.parse(localStorage.getItem('user'));
  const { user } = data || {};
  const admins = user.role === 'superadmin' || user.role === 'admin';

  const handleSearch = () => {
    document.getElementById('search-container1').style.display = 'none';
    document.getElementById('search-input').value = '';
    setACustomer([]);
  };

  const handleSelected = () => {
    document.getElementById('search-container1').style.display = 'none';
  };

  useEffect(() => {
    dispatch(getCustomerFromApi());
  }, []);

  const handleChange = (event) => {
    const typedContent = event.target.value;
    if (typedContent === '') {
      setACustomer([]);
    } else {
      const filteredCustomer = allCustomers.filter(
        (customer) =>
          customer.name.toLowerCase().includes(typedContent.toLowerCase()) ||
          customer.phone.includes(typedContent) ||
          (customer.card_number !== null &&
            customer.card_number
              .toLowerCase()
              .includes(typedContent.toLowerCase()))
      );
      setACustomer(filteredCustomer);
    }
  };

  return (
    <div id="search-container1">
      <h1 className="search-header">Search Customers</h1>
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
          aCustomer.slice(0, 5).map((customer) => {
            const permitted = user.id === customer.user_id || admins;
            return (
              <>
                {permitted && (
                  <NavLink key={customer.id} to={`/customers/${customer.id}`}>
                    <div className="dropdown-row" id="dropdown-main">
                      <div className="search-text">
                        <p onClick={handleSelected}>
                          {customer.card_number} - {customer.name}
                        </p>
                      </div>
                    </div>
                  </NavLink>
                )}
              </>
            );
          })}
      </>
    </div>
  );
};
/* eslint-enable */
export default Search;
