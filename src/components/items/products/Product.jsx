import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Product.css';
/* eslint-disable */
import { getOneItemFromApi } from '../../redux/forms/oneItemReducer';
/* eslint-enable */
const editUrl = (product) => {
  const { id } = product;
  return `/items/${id}/edit`;
};
const data = JSON.parse(localStorage.getItem('item'));
const { item } = data || {};
console.log(item);

const Product = () => {
  const dispatch = useDispatch();
  const param = useParams();
  const { id } = param;
  const aProduct = useSelector((state) => state.oneItem);

  useEffect(() => {
    dispatch(getOneItemFromApi(id));
  }, []);

  /* eslint-disable */

  const {
    name,
    price,
    description,
    picture,
  } = aProduct.data;
  const redirect = editUrl(aProduct.data);

  return (
    <div className="containa">
      <div className="image-container">
        <img className="cus-image" src={picture} alt={`${name}`} />
      </div>
      <div className="details-container">
        <h3 className="cus-details">Name: {name}</h3>
        <p className="cus-details">Price: {price}</p>
        <p className="cus-details">Description: {description}</p>
      </div>

      <div className="image-container">
        <div className="edit">
          {user.role === 'admin' && (
            <NavLink to={redirect} style={{ textDecoration: 'none' }}>
              <i className="fa fa-edit" />
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

/* eslint-enable */
export default Product;
