import React, { useEffect } from 'react';
// import { useSelector } from 'react-redux';

const PaidSixty = () => {
  // const customers = useSelector((state) => state.customers?.data);
  const data = JSON.parse(localStorage.getItem('user'));
  const { user } = data || {};
  const admins = user.role === 'admin' || user.role === 'superadmin';

  // console.log(customers);

  useEffect(() => {
    // dispatch(getOneCustomerTransFromApi(id));
  }, []);

  return (
    <div>
      {admins && <p>Paid60</p>}
      {!admins && <p>Unauthorized to see this page!</p>}
    </div>
  );
};

export default PaidSixty;
