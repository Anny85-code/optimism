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
            <table>
              <thead className="">
                <td className=""> Marketer: {zeroCollect.marketer}</td>

                <td> Total: {zeroCollect.total}</td>
              </thead>
              <thead>
                <td>Name</td>
                <td>Card No</td>
                <td>Days Paid</td>
              </thead>
              {zeroCollect &&
                zeroCollect.data.map(({ name, card, total_days }) => (
                  <tbody key={card}>
                    <td>{name}</td>
                    <td>{card}</td>
                    <td>{total_days}</td>
                  </tbody>
                ))}
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default MarketerZeroCollect;
