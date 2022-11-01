import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneCustomerTransFromApi } from '../../redux/forms/oneCustomerTransactReducer';

const PaidSixty = () => {
  const customers = useSelector(
    (state) => state.customerTransactions?.datacustomers?.data
  );
  const data = JSON.parse(localStorage.getItem('user'));
  const { user } = data || {};
  const admins = user.role === 'admin' || user.role === 'superadmin';

  console.log(customers);

  useEffect(() => {
    useDispatch(getOneCustomerTransFromApi(id));
  }, []);

  return (
    <div>
      {admins && <p>Paid60</p>}
      {!admins && <p>Unauthorized to see this page!</p>}
    </div>
  );
};

export default PaidSixty;
