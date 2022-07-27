import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const CustomerTransacts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch();
  }, []);

  return (
    <div>
      <h1>CustomerTransacts</h1>
    </div>
  );
};

export default CustomerTransacts;
