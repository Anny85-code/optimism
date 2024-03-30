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
            <table>
              {/* <thead className="">
                <td className=""> </td>

                <td> </td>
              </thead> */}
              <tr>
                <th>Name</th>
                <th>Card No</th>
                <th>Days Paid</th>
              </tr>
              {zeroCollect &&
                zeroCollect.data.map(({ name, card, total_days }) => (
                  <tr key={card}>
                    <td>{name}</td>
                    <td>{card}</td>
                    <td>{total_days}</td>
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
