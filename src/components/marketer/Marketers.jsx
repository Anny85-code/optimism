import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getCustomerFromApi } from '../../redux/forms/customerReducer';

const Customers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCustomerFromApi());
  }, []);

  return (
    <div>
      <h1>Customers</h1>
    </div>
  );
};

export default Customers;
