import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getItemFromApi } from '../../redux/forms/getItemsReducer';
import './AddItems.css';

const ViewItems = () => {
  const allItems = useSelector((state) => state.item?.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItemFromApi());
  }, []);

  return (
    <>
      {allItems.length > 0 ? (
        <div className="form-container-item-list">
          {allItems.map((item) => (
            <NavLink key={item.id} to={`/products/${item.id}`}>
              <div key={item.id}>
                <ul className="item-name">
                  <li className="item-item-name">
                    <h3>{item.name}</h3>
                  </li>
                  <li>
                    <img
                      src={item.picture}
                      alt={item.picture}
                      style={{
                        width: '70px',
                        height: '60px',
                        borderRadius: '5px',
                      }}
                    />
                  </li>
                  <li className="item-price">
                    <h3>{`NGN ${item.price}`}</h3>
                  </li>
                </ul>
              </div>
            </NavLink>
          ))}
        </div>
      ) : (
        <>
          <p>There is no Products</p>
        </>
      )}
    </>
  );
};

export default ViewItems;
