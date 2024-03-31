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
    <div
      className="cards"
      style={{
        color: '#FF5D5D',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
      }}
      type="button"
      onClick={delNoCard}
    >
      <i className="fa fa-trash fa-2x" />
      <div className="card__inner">
        <p className="text-primary-p" style={{ color: '#FF5D5D' }}>
          Delete No Card
        </p>
      </div>
    </div>
  );
};

export default DeleteNoCardNo;
/* eslint-enable */
