/* eslint-disable */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { getOneUserTransFromApi } from '../redux/forms/oneUserTransactReducer';
import { useDispatch, useSelector } from 'react-redux';

const DeleteMarketerTrans = ({ id }) => {
  const dispatch = useDispatch();

  const transactions = useSelector((state) => state.userTransacts);

  const handleDel = async () => {
    const sss = await dispatch(getOneUserTransFromApi(id));
    console.log(transactions, { id }, sss);
  };

  useEffect(() => {
    console.log(id);
  }, []);

  return (
    <button type="button" onClick={handleDel}>
      Delete
    </button>
  );
};

// delOneTransFromApi()

DeleteMarketerTrans.propTypes = {
  id: PropTypes.number.isRequired,
};

export default DeleteMarketerTrans;
/* eslint-enable */
