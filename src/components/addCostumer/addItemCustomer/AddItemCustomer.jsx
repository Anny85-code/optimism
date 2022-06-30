import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItemFromApi } from '../../../redux/forms/getItemsReducer';
import './AddItemCustomer.css';

const AddItemCustomer = () => {
  const allItemsCostumer = useSelector((state) => state.item);
  const dispatch = useDispatch();

  const [checked, setChecked] = useState(false);
  const handleCheckbox = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    dispatch(getItemFromApi());
  }, []);
  // setIsPending(false);
  return (
    <div className="form-container-items-costumer">
      {allItemsCostumer.data.map((item) => (
        <div key={item.id}>
          <h3 className="item-costumer-name">{item.name}</h3>
          <h3>
            <input
              type="checkbox"
              id="checkbox"
              checked={checked}
              onChange={handleCheckbox}
            />
          </h3>
        </div>
      ))}
    </div>
  );
};

export default AddItemCustomer;
