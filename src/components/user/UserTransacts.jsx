import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import Moment from 'moment';
import Loader from '../loader/Loader';
import { getOneUserTransFromApi } from '../../redux/forms/oneUserTransactReducer';
/* eslint-disable */
const UserTransacts = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const { id } = param;
  const transactions = useSelector((state) => state.userTransacts);
  const { data } = transactions;
  const { trans, user_name, total } = data || {};
  const [sDate, setSDate] = useState(new Date());
  const [filtaTrans, setFiltaTrans] = useState([]);
  const [filtaTotal, setFiltaTotal] = useState(0);
  const [transNo, setTransNo] = useState(0);

  useEffect(() => {
    dispatch(getOneUserTransFromApi(id));
  }, []);

  const handleFilter = () => {
    const selDate = sDate.toDateString();
    const sameDay = trans.filter(
      (el) => selDate == new Date(el.created_at).toDateString()
    );
    const fTotal = sameDay.reduce((a, b) => a + +b.amount, 0);
    setFiltaTotal(fTotal);
    setFiltaTrans(sameDay);
    setTransNo(sameDay.length);
  };

  return (
    <div>
      {trans ? (
        <>
          {trans.length <= 0 ? (
            <>
              <p>No transactions yet!</p>
              <button type="button">
                <NavLink
                  to="/addtransaction"
                  style={{ textDecoration: 'none' }}
                >
                  Add New Transaction
                </NavLink>
              </button>
            </>
          ) : (
            <>
              <div>
                <h3>
                  <span className="cus-name">Collected by:</span>
                  {user_name}
                </h3>
                <h3>
                  <span className="cus-name">Total amount collected:</span>
                  {total}
                </h3>
                <label htmlFor="start_date">
                  Start Date
                  <DatePicker
                    // portalId="root-portal"
                    dateFormat="yyyy/MM/dd"
                    selected={sDate}
                    // showMonthDropdown
                    // showYearDropdown
                    dropdownMode="select"
                    onChange={(date) => setSDate(date)}
                    style={{ margin: 0 }}
                  />
                </label>
                <button type="button" onClick={handleFilter}>
                  Filter
                </button>
                <div>
                  <p>Total by filtered date</p>
                  <p>{filtaTotal}</p>
                </div>
                <div>
                  <p>No. of Transactions</p>
                  <p>{transNo}</p>
                </div>
              </div>
              {filtaTrans.length >= 1 ? (
                filtaTrans.map((transaction) => (
                  <NavLink
                    key={transaction.id}
                    to={`/transactions/${transaction.id}`}
                  >
                    <div className="customer-container transactions-container">
                      <h4>
                        <span className="cus-name">Amount:</span>
                        {transaction.amount}
                      </h4>
                      <h4>
                        <span className="cus-phone">Date:</span>
                        {Moment(transaction.created_at).format('MMMM DD, LT')}
                      </h4>
                    </div>
                  </NavLink>
                ))
              ) : (
                <>
                  <p>No transactions to show!</p>
                </>
              )}
            </>
          )}
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
};
/* eslint-enable */
export default UserTransacts;
