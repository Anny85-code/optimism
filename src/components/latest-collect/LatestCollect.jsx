/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import endpoint from '../../assets/url/url';
import './LatestCollect.css';
import Moment from 'moment';
import Loader from '../loader/Loader';
import { useSelector } from 'react-redux';

const LatestCollect = () => {
  const getCustomers = useSelector((state) => state.customer?.data?.customers);
  const [data, setData] = useState({});
  const { id } = useParams();
  const { token } = localStorage;
  const sliceChunk = 50;
  const [nx, setNx] = useState(sliceChunk);
  const [pr, setPr] = useState(0);
  const len = data?.total;

  const handleNext = () => {
    if (nx <= len) {
      setNx(nx + sliceChunk);
      setPr(pr + sliceChunk);
    }
  };

  const handPrevious = () => {
    if (pr > 1) {
      setPr(pr - sliceChunk);
      setNx(nx - sliceChunk);
    }
  };

  const cusName = (id) => {
    const cus = getCustomers?.filter((cus) => cus.id === id);
    return cus?.[0].name;
  };

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
                <td> Total: {data?.total}</td>
              </thead>
              <thead>
                <td>Customer</td>
                <td>Amount</td>
                <td>Entry Date</td>
                <td>Coll. Date</td>
              </thead>
              {data.data
                .sort((a, b) => b.transaction_date - a.transaction_date)
                .slice(pr, nx)
                .map((trans, i) => (
                  <tbody key={i}>
                    <td>{cusName(trans.v2_customer_id)}</td>
                    <td>{trans.amount}</td>
                    <td>{Moment(trans.created_at).format('MMMM DD, LT')}</td>
                    <td>
                      {Moment(trans.transaction_date).format('Do MMMM YYYY')}
                    </td>
                  </tbody>
                ))}
            </table>
          </div>
          {len > 0 && (
            <div className="pre-next-cont">
              <i
                className="fa fa-caret-left fa-2x text-red"
                onClick={handPrevious}
                style={{ cursor: 'pointer' }}
              />
              <p className="pre-text">
                {pr + 1} - {nx < len ? nx : len} <span>of</span> {len}
              </p>
              <i
                className="fa fa-caret-right fa-2x text-red"
                onClick={handleNext}
                style={{ cursor: 'pointer' }}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default LatestCollect;
