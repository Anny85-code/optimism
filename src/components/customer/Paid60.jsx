import React from 'react';

const PaidSixty = () => {
  const data = JSON.parse(localStorage.getItem('user'));
  const { user } = data || {};
  const admins = user.role === 'admin' || user.role === 'superadmin';
  return (
    <div>
      {admins && <p>Paid60</p>}
      {!admins && <p>Unauthorized to see this page!</p>}
    </div>
  );
};

export default PaidSixty;
