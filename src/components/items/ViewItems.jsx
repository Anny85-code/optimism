import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItemFromApi } from '../../redux/forms/getItemsReducer';
import './AddItems.css';

const ViewItems = () => {
  const allItems = useSelector((state) => state.item);
  const dispatch = useDispatch();
  // const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    dispatch(getItemFromApi());
  }, []);
  // setIsPending(false);

  return (
    <div className="form-container-item-list">
      {allItems.data.map((item) => (
        <div key={item.id}>
          <ul className="item-name">
            <li className="item-item-name">
              <h3>{item.name}</h3>
            </li>
            <li>
              <img
                src={item.picture}
                alt={item.picture}
                style={{ width: '50px', height: '50px' }}
              />
            </li>
            <li className="item-price">
              <h3>{`NGN ${item.price}`}</h3>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ViewItems;
