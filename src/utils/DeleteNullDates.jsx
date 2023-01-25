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
    <button
      className="cards"
      style={{
        color: 'white',
        backgroundColor: '#FF5D5D',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
      }}
      type="button"
      onClick={delNullDates}
    >
      Del Bad Dates
    </button>
  );
};

export default DeleteNullDates;
/* eslint-enable */
