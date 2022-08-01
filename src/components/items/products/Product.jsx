import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
/* eslint-disable */
import { getOneItemFromApi } from '../../../redux/forms/oneItemReducer';

const editUrl = (product) => {
  const { id } = product;
  return `/products/${id}/edit`;
};
const data = JSON.parse(localStorage.getItem('user'));
const { user } = data || {};

const Product = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const { id } = param;
  const aProduct = useSelector((state) => state.oneItem);

  useEffect(() => {
    dispatch(getOneItemFromApi(id));
  }, []);

  const { name, price, description, picture } = aProduct.data;
  const redirect = editUrl(aProduct.data);

  return (
    <div className="containa">
      <div className="image-container">
        <img className="cus-image" src={picture} alt={`${name}`} />
      </div>
      <div className="details-container">
        <h3 className="cus-details">
          <span>Name:</span> {name}
        </h3>
        <p className="cus-details">Price: {price}</p>
        <p className="cus-details">Description: {description}</p>
      </div>

      <div className="image-container">
        <div className="edit">
          {user.role === 'admin' && (
            <NavLink to={redirect} style={{ textDecoration: 'none' }}>
              <i className="fa fa-edit text-red" />
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};
/* eslint-enable */
export default Product;
