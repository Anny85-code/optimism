import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postItemsToApi } from '../../../redux/forms/getItemsReducer';
import './AddProducts.css';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [picture, setPicture] = useState('');
  const [description, setDescription] = useState('');
  const [isPending, setIsPending] = useState(false);
  const dispatch = useDispatch();

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
    setIsPending(true);
    dispatch(postItemsToApi(product));
    setIsPending(false);
  };

  return (
    <div className="form-container">
      <h3 className="title">Create Item</h3>
      <form onSubmit={handleSubmit} className="add-customer-form">
        <div className="form-group">
          <label htmlFor="name">
            Name *
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
            Price *
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
            Picture *
            <input
              type="text"
              className="form-control"
              id="picture"
              name="picture"
              placeholder="Picture"
              required
              value={picture}
              onChange={(e) => setPicture(e.target.value)}
            />
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="address">
            Description *
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
          {!isPending && (
            <button type="submit" className="add-customer-btn">
              Create Item
            </button>
          )}
          {isPending && (
            <button type="submit" disabled>
              Creating Item . . .
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
