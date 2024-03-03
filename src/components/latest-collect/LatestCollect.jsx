/* eslint-disable */
import React from 'react';
import './LatestCollect.css';

const LatestCollect = () => {
  const data = {
    total: 8,
    marketer: 'BLESSING YAHAYA',
    data: {
      entry_date: '2024-03-02',
      collected_for: {
        latest: '2024-02-28',
        oldest: '2024-02-28',
      },
    },
  };

  return (
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
  );
};

export default LatestCollect;
