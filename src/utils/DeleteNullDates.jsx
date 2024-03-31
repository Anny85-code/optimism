/* eslint-disable */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactionFromApi } from '../redux/forms/transactionReducer';

const DeleteNullDates = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions);

  useEffect(() => {
    dispatch(getTransactionFromApi());
  }, []);

  const delNullDates = () => {
    const myTrans = transactions?.data?.transactions?.filter(
      (trans) =>
        !trans.transaction_date ||
        !trans.previous_contribution_date ||
        !trans.current_contribution_date
    );
    myTrans.map((trans) => dispatch(delOneCustomerFromApi(trans.id)));
  };

  return (
    <div
      className="cards"
      style={{
        color: '#FF5D5D',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
      }}
      type="button"
      onClick={delNullDates}
    >
      <i className="fa fa-trash fa-2x" />
      <div className="card__inner">
        <p className="text-primary-p" style={{ color: '#FF5D5D' }}>
          Delete Bad Dates
        </p>
      </div>
    </div>
  );
};

export default DeleteNullDates;
/* eslint-enable */
