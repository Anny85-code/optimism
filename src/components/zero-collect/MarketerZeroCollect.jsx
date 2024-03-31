/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import endpoint from '../../assets/url/url';
import './MarketerZeroCollect.css';
import Loader from '../loader/Loader';

const MarketerZeroCollect = () => {
  const [zeroCollect, setZeroCollect] = useState({});
  const { id } = useParams();
  const { token } = localStorage;

  useEffect(() => {
    (async () => {
      const fetchData = await fetch(`${endpoint}/users/${id}/marketer_zero`, {
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
      {!zeroCollect.data && <Loader />}
      {zeroCollect.data && (
        <div className="marketer-zero-customer-container">
          <div>
            <div className="header">
              <h1>Marketer: {zeroCollect.marketer}</h1>
              <p>Total: {zeroCollect.total}</p>
            </div>
            <table id="table">
              <tr>
                <th id="th">Name</th>
                <th id="th">Card No</th>
                <th id="th">Days Paid</th>
              </tr>
              {zeroCollect &&
                zeroCollect.data.map(({ name, card, total_days }) => (
                  <tr key={card}>
                    <td id="th">{name}</td>
                    <td id="th">{card}</td>
                    <td id="th">{total_days}</td>
                  </tr>
                ))}
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default MarketerZeroCollect;
