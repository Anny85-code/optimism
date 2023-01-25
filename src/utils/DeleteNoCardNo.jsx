/* eslint-disable */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerFromApi } from '../redux/forms/customerReducer';
import { delOneCustomerFromApi } from '../redux/forms/OneCustomerReducer';

const DeleteNoCardNo = () => {
  const customers = useSelector((state) => state.customer?.data);
  const dispatch = useDispatch();
  const delNoCard = () => {
    const myCustomers = customers?.customers?.filter(
      (customer) => customer.card_number === null
    );
    myCustomers.map((cus) => dispatch(delOneCustomerFromApi(cus.id)));
  };

  useEffect(() => {
    dispatch(getCustomerFromApi());
  }, []);

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
      onClick={delNoCard}
    >
      Del No Card
    </button>
  );
};

export default DeleteNoCardNo;
/* eslint-enable */
