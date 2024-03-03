import React, { useEffect, useState } from 'react';
import endpoint from '../../assets/url/url';
import Loader from '../loader/Loader';

const AllZeroCollect = () => {
  const [zeroCollect, setZeroCollect] = useState({});
  const { token } = localStorage;
  const style = {
    constainer: {
      border: '2px solid crimson',
      borderRadius: '0.5rem',
      width: '59.375rem',
      height: 'fit-content',
      margin: '1.25rem 1.25rem 1.25rem 3.125rem',
      background: '#fff',
    },
  };

  useEffect(() => {
    (async () => {
      const fetchData = await fetch(`${endpoint}/users/all_zero_collect`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const res = await fetchData.json();
      setZeroCollect(res);
    })();
  }, []);

  return (
    <>
      {!zeroCollect.total && <Loader />}
      {zeroCollect.total && (
        <div style={style.constainer}>
          <p>{`All customers with no collection yet are ${zeroCollect.total}`}</p>
        </div>
      )}
    </>
  );
};

export default AllZeroCollect;
