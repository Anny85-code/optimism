/* eslint-disable */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTransactionFromApi } from '../redux/forms/transactionReducer';

const GetNullDates = () => {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.transactions);

  useEffect(() => {
    dispatch(getTransactionFromApi());
  }, []);

  function handleNullDates() {
    const myTrans = transactions?.data?.transactions?.filter(
      (trans) =>
        !trans.transaction_date ||
        !trans.previous_contribution_date ||
        !trans.current_contribution_date
    );

    /*=========   GET CUSTOMER NAME    ============*/
    myTrans.map((tr) =>
      customers?.customers?.filter((cus) => {
        if (cus.id === tr.v2_customer_id) {
          const newDta = (tr['cus_name'] = cus.name);
          return newDta;
        }
      })
    );

    /*=========   GET MARKETER NAME    ============*/
    myTrans.map((tr) =>
      users?.filter((user) => {
        if (user.id === tr.user_id) {
          const newDta = (tr['marketer'] = user.name);
          return newDta;
        }
      })
    );

    const exportData = myTrans.map((cus) => {
      return {
        name: cus.cus_name,
        Days_Paid: cus.days_paid_for,
        Transaction_Date: cus.transaction_date,
        Marketer: cus.marketer,
      };
    });

    const ws = utils.json_to_sheet(exportData.sort((a, b) => a.id - b.id));
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Data');
    writeFileXLSX(wb, `Customer_with_no_card_number.xlsx`);
  }

  return (
    <div
      className="cards"
      style={{ cursor: 'pointer' }}
      onClick={handleNullDates}
    >
      <div className="card__inner">
        <p className="text-primary-p">Bad Dates</p>
      </div>
    </div>
  );
};

export default GetNullDates;
/* eslint-enable */
