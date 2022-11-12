import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getCustomerFromApi } from '../../redux/forms/customerReducer';
import { getUsersFromApi } from '../../redux/forms/userManReducer';
import './Search.css';

/* eslint-disable*/
const Search = () => {
  const dispatch = useDispatch();
  const allCustomers = useSelector((state) => state.customer?.data?.customers);
  // const users = useSelector((state) => state.userManReducer?.data);
  const [aCustomer, setACustomer] = useState('');
  const data = JSON.parse(localStorage.getItem('user'));
  const { user } = data || {};
  // const marketers = users.filter((el) => el.user_id === user.id);
  // const admins = user.role === 'superadmin' || user.role === 'admin';
  const sliceChunk = 5;
  const [nx, setNx] = useState(sliceChunk);
  const [pr, setPr] = useState(0);
  const len = aCustomer?.length;

  const handleNext = () => {
    if (nx < len) {
      setNx(nx + sliceChunk);
      setPr(pr + sliceChunk);
    }
    if (pr > len) {
      setPr(1);
    }
  };

  const handPrevious = () => {
    if (pr > 1) {
      setPr(pr - sliceChunk);
      setNx(nx - sliceChunk);
    }
  };

  const handleSearch = () => {
    document.getElementById('search-container1').style.display = 'none';
    document.getElementById('search-input').value = '';
    setACustomer([]);
  };

  const myFilter = (data, typedContent) => {
    return data?.filter(
      (customer) =>
        customer.name.toLowerCase().includes(typedContent) ||
        customer.phone.includes(typedContent) ||
        (customer.card_number !== null &&
          customer.card_number.toLowerCase().includes(typedContent))
    );
  };

  // const getCustomerIds = (ob) => ob?.map((item) => item?.user_id);
  // const getMarketerIds = (ob) => ob?.map((item) => item?.id);

  // Unstable
  // const marksCustomers = (custs, marks, typedContent) => {
  //   const dCus = myFilter(custs, typedContent);
  //   const user_id = getCustomerIds(dCus);
  //   const markIDs = getMarketerIds(marks);
  //   const aMatch = user_id?.filter((id) => markIDs?.includes(id));
  //   if (aMatch) {
  //     return dCus;
  //   }
  // };

  useEffect(() => {
    dispatch(getCustomerFromApi());
    dispatch(getUsersFromApi());
  }, []);

  const handleChange = (event) => {
    const typedContent = event.target.value?.toLowerCase();
    if (typedContent === '' || !typedContent) {
      setACustomer([]);
      setPr(0);
      setNx(5);
    } else {
      const marketerFilter = allCustomers?.filter(
        (cus) => cus.user_id === user.id
      );
      const marketerData = myFilter(marketerFilter, typedContent);
      // For marketers
      if (user.role === 'marketer') {
        setACustomer(marketerData);
      }
      // For supervisors & admins - Unstable
      if (user.role !== 'marketer') {
        setACustomer(myFilter(allCustomers, typedContent));
      }
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
      )}
    </div>
  );
};
/* eslint-enable */
export default Search;
