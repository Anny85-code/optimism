/* eslint-disable */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getMarketerItemsFromApi } from '../../redux/forms/marketerItemsReducer';
import '../items/products/Itemstat.css';
import Loader from '../loader/Loader';
import RenderItems from './RenderItems';

const MarketerItems = () => {
  const mFoods = useSelector((state) => state.marketerItemsReducer);
  const dispatch = useDispatch();
  const param = useParams();
  const { id } = param;

  console.log(mFoods);

  useEffect(() => {
    dispatch(getMarketerItemsFromApi(id));
  }, []);

  return (
    <div>{mFoods?.loading ? <Loader /> : <RenderItems mFoods={mFoods} />}</div>
  );
};
/* eslint-enable */
export default MarketerItems;
