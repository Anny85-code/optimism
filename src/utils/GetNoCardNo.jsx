/* eslint-disable */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { utils, writeFileXLSX } from 'xlsx';
import { getCustomerFromApi } from '../redux/forms/customerReducer';

const GetNoCardNo = () => {
  const customers = useSelector((state) => state.customer?.data);
  const dispatch = useDispatch();

  function handleNill() {
    const myCustomers = customers?.customers?.filter(
      (customer) => !customer.card_number
      // ========{ To Update bad card number/ user location } =========
      // customer.card_number !== null && customer.card_number.includes('U/M86')
    );

    // =========={ To Update bad card number/ user location, also uncomment the reload in postCustomerUpdate function }==========
    // const cusWithNewCardNo = myCustomers.map((cus) => {
    //   const newCardNo = cus.card_number.replace('U/M86', 'UMI86');
    //   const newCus = { ...cus, card_number: newCardNo };
    //   return newCus;
    // });

    // cusWithNewCardNo.map((cus) => dispatch(postUpdateCustomerToApi(cus)));
    // ============= Used to play with update card number info ================

    const exportData = myCustomers.map((cus) => {
      return {
        id: cus.id,
        name: cus.name,
        phone: cus.phone,
        address: cus.address,
        daily_contribution: cus.daily_contribution,
      };
    });

    // ======={ To Update bad card number/ user location, exported data to view changes }========
    // const exportData = cusWithNewCardNo.map((cus) => {
    //   return {
    //     id: cus.id,
    //     name: cus.name,
    //     phone: cus.phone,
    //     address: cus.address,
    //     daily_contribution: cus.daily_contribution,
    //     cardNumber: cus.card_number,
    //   };
    // });
    // ============= Used to play with update card number info ================

    const ws = utils.json_to_sheet(exportData.sort((a, b) => a.id - b.id));
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Data');
    writeFileXLSX(wb, `Customer_with_no_card_number.xlsx`);
  }

  useEffect(() => {
    dispatch(getCustomerFromApi());
  }, []);

  return (
    <div className="cards" onClick={handleNill} style={{ cursor: 'pointer' }}>
      <div className="card__inner">
        <p className="text-primary-p">No Card No</p>
      </div>
    </div>
  );
};

export default GetNoCardNo;
/* eslint-enable */
