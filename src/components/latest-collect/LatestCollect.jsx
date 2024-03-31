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
            <div className="table-head">
              <h1>Marketer: {data.marketer}</h1>
              <p> Total: {data?.total}</p>
            </div>
            <table className="table">
              <tr>
                <th className="th">Customer</th>
                <th className="th">Amount</th>
                <th className="th">Entry Date</th>
                <th className="th">Coll. Date</th>
              </tr>
              {data.data
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                .slice(pr, nx)
                .map((trans, i) => (
                  <tr key={i}>
                    <td className="td">{cusName(trans.v2_customer_id)}</td>
                    <td className="td">{trans.amount}</td>
                    <td className="td">
                      {Moment(trans.created_at).format('MMMM DD, LT')}
                    </td>
                    <td className="td">
                      {Moment(trans.transaction_date).format('Do MMMM YYYY')}
                    </td>
                  </tr>
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
