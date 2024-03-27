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
        <div className="transact-customer-container">
          <div>
            <div className="text_header_collect">
              <h1>Marketer: {zeroCollect.marketer}</h1>
              <h2>Total: {zeroCollect.total}</h2>
            </div>
            <table className="zero_table">
              <tr className="zero_table_tr">
                <th className="zero_table_th">Name</th>
                <th>Card No</th>
                <th>Days Paid</th>
              </tr>
              {zeroCollect &&
                zeroCollect.data.map(({ name, card, total_days }) => (
                  <tr key={card}>
                    <td className="zero_table_td">{name}</td>
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
