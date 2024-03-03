/* eslint-disable */
import React from 'react';

const ZeroCollect = () => {
  const data = {
    total: 10,
    data: [
      {
        card: 'KAR20/6009',
        name: 'Agatha Auta',
        total_days: 0,
      },
      {
        card: 'KAR20/6014',
        name: 'Raphael',
        total_days: 0,
      },
      {
        card: 'KAR20/6017',
        name: 'Anna Andrew',
        total_days: 0,
      },
      {
        card: 'KAR20/9325',
        name: 'Alpha',
        total_days: 0,
      },
      {
        card: 'KAR20/9349',
        name: 'Mummy favour',
        total_days: 0,
      },
      {
        card: 'KAR20/9391',
        name: 'Mummy Aron70',
        total_days: 0,
      },
      {
        card: 'KAR20/9400',
        name: 'Dorcas peter',
        total_days: 0,
      },
      {
        card: 'KAR20/9432',
        name: 'Mummy Ella',
        total_days: 0,
      },
      {
        card: 'KAR20/12028',
        name: 'Augustina',
        total_days: 0,
      },
      {
        card: 'KAR20/12051',
        name: 'Grace habila 180',
        total_days: 0,
      },
    ],
    marketer: 'FAVOUR DAUDA',
  };

  return (
    <div>
      <div>
        <table>
          <thead>
            <td>Name</td>
            <td>Card No</td>
            <td>Days Paid</td>
          </thead>
          {data.data.map(({ name, card, total_days }) => (
            <tbody key={card}>
              <td>{name}</td>
              <td>{card}</td>
              <td>{total_days}</td>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default ZeroCollect;
