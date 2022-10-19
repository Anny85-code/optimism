import React, { useEffect } from 'react';

const PaidSixty = () => {
  // const transactions = useSelector((state) => state.customerTransactions?.data);
  const data = JSON.parse(localStorage.getItem('user'));
  const { user } = data || {};
  const admins = user.role === 'admin' || user.role === 'superadmin';

  console.log();

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
