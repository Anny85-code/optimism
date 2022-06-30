// import React from 'react';
// import React, { useState, useEffect } from 'react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerFromApi } from '../../redux/forms/customerReducer';

const Customers = () => {
  const dispatch = useDispatch();
  const allCustomers = useSelector((state) => state.customer);

  useEffect(() => {
    dispatch(getCustomerFromApi());
  }, []);

  return (
    <div>
      {allCustomers.data.map((customer) => (
        <div key={customer.id}>
          <h3>{customer.name}</h3>
        </div>
      ))}
    </div>
  );
};

export default Customers;
