/* eslint-disable */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMarketerItemsFromApi } from '../../redux/forms/marketerItemsReducer';
import '../items/products/Itemstat.css';
import Loader from '../loader/Loader';
import RenderItems from './RenderItems';

const MarketerItems = () => {
  const dispatch = useDispatch();
  const mFoods = useSelector((state) => state.marketerItemsReducer);

  useEffect(() => {
    dispatch(getMarketerItemsFromApi(localStorage.getItem('_id')));
  }, []);

  console.log(mFoods);

  return (
    <div>{mFoods?.loading ? <Loader /> : <RenderItems mFoods={mFoods} />}</div>
  );
};
/* eslint-enable */
export default MarketerItems;
