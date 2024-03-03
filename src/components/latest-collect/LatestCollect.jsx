/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import endpoint from '../../assets/url/url';
import './LatestCollect.css';
import Loader from '../loader/Loader';

const LatestCollect = () => {
  const [data, setData] = useState({});
  const { id } = useParams();
  const { token } = localStorage;

  useEffect(() => {
    (async () => {
      const fetchData = await fetch(
        `${endpoint}/users/${id}/marketer_last_collect`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const res = await fetchData.json();
      setData(res);
    })();
  }, []);

  return (
    <>
      {!data.data && <Loader />}

      {data.data && (
        <div className="transact-customer-container">
          <div>
            <table>
              <thead className="table-head">
                <td> Marketer: {data.marketer}</td>

                <td> Total: {data.total}</td>
              </thead>
              <thead>
                <td>Entry Date</td>
                <td>Latest</td>
                <td>Oldest</td>
              </thead>
              <tbody>
                <td>{data.data.entry_date}</td>
                <td>{data.data.collected_for.latest}</td>
                <td>{data.data.collected_for.oldest}</td>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default LatestCollect;
