import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getSupervItemsFromApi } from '../../redux/forms/supervisorItemsReducer';
import RenderItemsStats from '../items/products/RenderItemsStats';

const SupervisorItems = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const supervItems = useSelector((state) => state.supvItems?.data);

  useEffect(() => {
    dispatch(getSupervItemsFromApi(id));
  }, []);
  return (
    <div>
      <RenderItemsStats foods={supervItems} />
    </div>
  );
};

export default SupervisorItems;
