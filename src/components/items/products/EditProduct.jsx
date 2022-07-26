import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneItemFromApi } from '../../../redux/forms/oneItemReducer';
import { postUpdateItemToApi } from '../../../redux/forms/getItemsReducer';
import './EditProduct.css';
import ImageUpload from '../../images/imageUpload';
/* eslint-disable */
const EditProduct = () => {
  const param = useParams();
  const { id } = param;
  const item = useSelector((state) => state.oneItem);
  const productId = item.data.id;
  const [name, setName] = useState(items.data.name);
  const [price, setPrice] = useState(user.data.price);
  const [description, setDescription] = useState(user.data.description);
  let { picture } = items.data;
  const [isPending, setIsPending] = useState(false);
  const { error } = useSelector((state) => state.item);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneItemFromApi(id));
  }, []);

  const handleEditPic = () => {
    document.getElementById('img-editor').style.display = 'none';
    document.getElementById('new-img-editor').style.display = 'block';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentProduct = JSON.parse(localStorage.getItem('item'));
    const { id } = currentProduct.item;
    picture = localStorage.getItem('image_str');
    const oneItem = {
      id: productId,
      user_id: id,
      name,
      price,
      description,
      picture,
    };
    setIsPending(true);
    dispatch(postUpdateItemToApi(oneItem));
    setIsPending(false);
  };

  return (
    <div className="form-container">
      <div className="form-group">
        <div className="column mt-5">
          <div className="d-flex justify-content-center align-items-center flex-column shadow-lg rounded w-50 mx-auto p-5">
            <h3 className="title">Update Product</h3>
            <br />
            {error ? (
              <div>
                {typeof error === 'string' ? (
                  <span>{error}</span>
                ) : (
                  error.map((errorItem) => (
                    <span key={errorItem}>{errorItem}</span>
                  ))
                )}
              </div>
            ) : (
              ''
            )}
            <form className="register-form" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="form-label">
                  Name *
                  <input
                    type="text"
                    placeholder="Name"
                    onChange={setName}
                    value={name}
                    id="name"
                    name="name"
                    className="form-control"
                    autoComplete="off"
                    required
                  />
                </label>
              </div>
              <br />
              <div>
                <label htmlFor="email" className="form-label">
                  price *
                  <input
                    type="text"
                    placeholder="price"
                    onChange={setPrice}
                    value={price}
                    id="price"
                    name="price"
                    className="form-control"
                    autoComplete="off"
                    required
                  />
                </label>
              </div>
              <br />
              <div>
                <label htmlFor="phone" className="form-label">
                  Description *
                  <input
                    type="number"
                    placeholder="Phone"
                    onChange={setDescription}
                    value={description}
                    id="description"
                    name="description"
                    className="form-control"
                    autoComplete="off"
                    required
                  />
                </label>
              </div>
              <br />
              <div id="img-editor">
                <label htmlFor="picture" className="form-label reg-edit">
                  Picture
                  <div className="image-container">
                    <img
                      src={picture}
                      alt={`${name}`}
                      className="cus-image upload-img"
                    />
                  </div>
                  <span onClick={handleEditPic} className="edit-user-icon">
                    Edit
                  </span>
                </label>
              </div>
              <div id="new-img-editor" style={{ display: 'none' }}>
                <label htmlFor="picture" className="form-label">
                  <h4 className="p-text">Picture</h4>
                  {ImageUpload()}
                </label>
              </div>
              <br />
              <div className="form-group btn1">
                {!isPending && (
                  <button
                    type="submit"
                    className="btn1 btn-secondary1 add-marketer-btn edit-user-btn"
                  >
                    Edit User
                  </button>
                )}
                {isPending && (
                  <button
                    className="btn1 btn-secondary1"
                    type="submit"
                    disabled
                  >
                    Editing User . . .
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
/* eslint-enable */
export default EditProduct;
