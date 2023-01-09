/* eslint-disable */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postItemsToApi } from '../../../redux/forms/getItemsReducer';
import ImageUpload from '../../images/imageUpload';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const picture = localStorage.getItem('image_str');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const condition = name === '';
  const condition3 = +price < 1;
  const condition4 = description === '';
  const condition5 = !picture?.includes('cloudinary');
  const genTruth = condition || condition3 || condition4 || condition5;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    const { id } = user.user;
    const product = {
      user_id: id,
      name,
      price,
      picture,
      description,
    };
    dispatch(postItemsToApi(product));
  };

  return (
    <div className="form-container">
      <div className="inner-container">
        <h3 className="title">Create Item</h3>
      </div>
      <form onSubmit={handleSubmit} className="add-customer-form">
        <div className="form-group">
          <label htmlFor="name">
            <span>
              Name <span style={{ color: 'crimson' }}>*</span>
            </span>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="price">
            <span>
              Price <span style={{ color: 'crimson' }}>*</span>
            </span>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              placeholder="price"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="picture">
            <span>
              Picture <span style={{ color: 'crimson' }}>*</span>
            </span>
            {ImageUpload()}
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="address">
            <span>
              Description <span style={{ color: 'crimson' }}>*</span>
            </span>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              required
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group btn1">
          {!genTruth && (
            <button type="submit" className="add-customer-btn">
              Create Item
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
/* eslint-enable */
export default AddProduct;
