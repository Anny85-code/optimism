import React from 'react';
import RenderItems from './RenderItems';

const GroupItems = () => {
  const data = JSON.parse(localStorage.getItem('setPercent'));
  console.log(data);
  return (
    <div>
      <RenderItems mFoods={data} />
    </div>
  );
};

export default GroupItems;
