/* eslint-disable */
import { useSelector } from 'react-redux';
import '../items/products/Itemstat.css';
import Loader from '../loader/Loader';
import RenderItems from './RenderItems';

const MarketerItems = () => {
  const mFoods = useSelector((state) => state.marketerItemsReducer);

  return (
    <div>{mFoods?.loading ? <Loader /> : <RenderItems mFoods={mFoods} />}</div>
  );
};
/* eslint-enable */
export default MarketerItems;
