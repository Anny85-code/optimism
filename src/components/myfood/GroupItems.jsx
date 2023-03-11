import React from 'react';

const GroupItems = () => {
  const data = JSON.parse(localStorage.getItem('setPercent'));
  console.log(data);
  return <div>GroupItems</div>;
};

export default GroupItems;
