import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import Moment from 'moment';
import Loader from '../loader/Loader';
import 'react-datepicker/dist/react-datepicker.css';
import { getOneUserTransFromApi } from '../../redux/forms/oneUserTransactReducer';
import './UserTransaction.css';
import comma from '../../utils/Comma';
import { getSeasonFromApi } from '../../redux/forms/seasonReducer';
/* eslint-disable */
const UserTransacts = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const { id } = param;
  const transactions = useSelector((state) => state.userTransacts);
  const getCustomers = useSelector((state) => state.customer);
  const seasons = useSelector((state) => state.seasons?.data);
  const customers = getCustomers?.data?.customers;
  const { data } = transactions;
  const { trans, name, loc, total } = data || {};
  const info = JSON.parse(localStorage.getItem('user'));
  const { user } = info || {};
  const [sDate, setSDate] = useState(new Date());
  const [filtaTrans, setFiltaTrans] = useState([]);
  const [filtaTotal, setFiltaTotal] = useState(0);
  const sliceChunk = 10;
  const [nx, setNx] = useState(sliceChunk);
  const [pr, setPr] = useState(0);
  const [transNo, setTransNo] = useState(0);
  const superadmins = user.role === 'superadmin';
  const len = filtaTrans.length;

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

  useEffect(() => {
    dispatch(getOneUserTransFromApi(id));
    dispatch(getSeasonFromApi());
  }, []);

  const [season] = seasons;
  const startDate = new Date(season?.start_date);
  const endDate = new Date(season?.end_date);

  const handleFilter = () => {
    if (trans) {
      const selDate = sDate.toDateString();
      const sameDay = trans.filter(
        (el) => selDate == new Date(el.created_at).toDateString()
      );
      const fTotal = sameDay.reduce((a, b) => a + +b.amount, 0);
      setFiltaTotal(fTotal);
      setFiltaTrans(sameDay);
      setTransNo(sameDay.length);
    }
  };

  const handleFilter2 = () => {
    if (trans) {
      const selDate = sDate.toDateString();
      const sameDay = trans.filter(
        (el) => selDate == new Date(el.transaction_date).toDateString()
      );
      const fTotal = sameDay.reduce((a, b) => a + +b.amount, 0);
      setFiltaTotal(fTotal);
      setFiltaTrans(sameDay);
      setTransNo(sameDay.length);
    }
  };

  return (
    <>
      {getCustomers.loading && <Loader />}
      {!getCustomers.loading && (
        <div className="cust-tansact-container1">
          <div className="start-date-container">
            <h3 className="details start-d">Marketer Transaction details</h3>
            <p
              style={{
                textAlign: 'center',
                color: 'crimson',
                marginLeft: '60px',
              }}
            >
              Please select a date
            </p>
            <div className="date-picker-container date-picker-trans1">
              <div>
                <label htmlFor="start_date" className="start-date">
                  <DatePicker
                    // portalId="root-portal"
                    dateFormat="yyyy/MM/dd"
                    selected={sDate}
                    showMonthDropdown
                    // showYearDropdown
                    dropdownMode="select"
                    onChange={(date) => setSDate(date)}
                    style={{ margin: 0 }}
                    className="start-date-picker-tran"
                    endDate={endDate}
                    startDate={startDate}
                    includeDateIntervals={[
                      {
                        start: startDate.setDate(startDate.getDate() - 0),
                        end: endDate,
                      },
                    ]}
                  />
                </label>
              </div>
              <div>
                <button
                  type="button"
                  onClick={handleFilter}
                  className="user-transact-btn-filter"
                >
                  Filter
                </button>
              </div>
              <div className="trans-filter">
                <button
                  type="button"
                  onClick={handleFilter2}
                  // className="user-transact-btn"
                  className="user-transact-btn-total1"
                  style={{ background: '#f72727', color: '#fff' }}
                >
                  Trans Filter
                </button>
              </div>
            </div>
          </div>
          <div className="transact-customer-container">
            {trans ? (
              <>
                {trans.length <= 0 ? (
                  <>
                    <p className="no-trans">No transactions yet!</p>
                    {user.role === 'supervisor' ? null : (
                      <button type="button" className="no-trans-btn">
                        <NavLink
                          to="/addtransaction"
                          style={{ textDecoration: 'none' }}
                        >
                          Add New Transaction
                        </NavLink>
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <table>
                      <tr>
                        <th>Collected by</th>
                        <th>Date & Time</th>
                        <th>Amount</th>
                        <th>Total by filtered date</th>
                        <th>No. of Transactions</th>
                        {superadmins && <th>Total amount collected</th>}
                      </tr>
                      <tr>
                        <td>
                          {name} -{loc}
                        </td>
                        <td></td>
                        <td></td>
                        <td>{` NGN ${comma(filtaTotal)}`}</td>
                        <td>{transNo}</td>
                        {superadmins && <td>{`NGN ${comma(total)}`}</td>}
                      </tr>
                    </table>
                    {len >= 1 ? (
                      filtaTrans?.slice(pr, nx).map((transaction) => {
                        const [customer] = customers?.filter(
                          (cus) => cus.id === transaction.v2_customer_id
                        );

                        return (
                          <NavLink
                            key={transaction.id}
                            to={`/transactions/${transaction.id}`}
                            target="_blank"
                          >
                            <ul id="p-child">
                              <li>
                                <div className="custrans-name">
                                  <h4 className="columns9">{customer?.name}</h4>
                                  <h4 className="columns9 i" id="top">
                                    {Moment(transaction.created_at).format(
                                      'MMMM DD, LT'
                                    )}
                                  </h4>
                                  <h4 className="columns9 i">{`NGN ${comma(
                                    transaction.amount
                                  )}`}</h4>
                                  <h4 className="columns9 i">
                                    NGN {customer?.daily_contribution} daily
                                  </h4>
                                  <h4
                                    className="columns9 i"
                                    style={{ borderRight: '2px solid crimson' }}
                                  >
                                    {transaction.days_paid_for > 1
                                      ? `${transaction.days_paid_for} days`
                                      : `${transaction.days_paid_for} day`}
                                  </h4>
                                  {superadmins && (
                                    <h4 className="columns9 "></h4>
                                  )}
                                </div>
                              </li>
                            </ul>
                          </NavLink>
                        );
                      })
                    ) : (
                      <>
                        <p className="no-transact-p">
                          No transactions to show!
                        </p>
                      </>
                    )}
                  </>
                )}
              </>
            ) : (
              <Loader />
            )}
          </div>
          {len > 5 && (
            <div className="pre-next-cont userTrans-pre-next-cont">
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
/* eslint-enable */
export default UserTransacts;
