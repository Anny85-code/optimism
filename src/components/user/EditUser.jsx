import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneUserFromApi } from '../../redux/forms/oneUserManReducer';
import { postUpdateUserToApi } from '../../redux/forms/userManReducer';
import '../forms/Register.css';
import ImageUpload from '../images/imageUpload';
/* eslint-disable */
const EditUser = () => {
  const param = useParams();
  const { id } = param;
  const user = useSelector((state) => state.oneUser);
  const userId = user.data.id;
  const [name, setName] = useState(user.data.name);
  const [email, setEmail] = useState(user.data.email);
  const [phone, setPhone] = useState(user.data.phone);
  const [address, setAddress] = useState(user.data.address);
  let { avatar } = user.data;
  const [username, setUsername] = useState(user.data.username);
  const [location, setLocation] = useState(user.data.location);
  const [isPending, setIsPending] = useState(false);
  const { error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneUserFromApi(id));
  }, []);

  const handleEditPic = () => {
    document.getElementById('img-editor').style.display = 'none';
    document.getElementById('new-img-editor').style.display = 'block';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userLogged = JSON.parse(localStorage.getItem('user'));
    const { id } = userLogged.user;
    avatar = localStorage.getItem('image_str');
    const oneUser = {
      id: userId,
      user_id: id,
      name,
      email,
      phone,
      address,
      avatar,
      location,
      username,
    };
    setIsPending(true);
    dispatch(postUpdateUserToApi(oneUser));
    setIsPending(false);
  };

  const [position, setPosition] = useState(user.data.position);

  const handleSelect = (e) => {
    setPosition(e.target.value);
  };

  return (
    <div className="form-container">
      <div className="form-group">
        <div className="column mt-5">
          <div className="d-flex justify-content-center align-items-center flex-column shadow-lg rounded w-50 mx-auto p-5">
            <h3 className="title">Update User</h3>
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
                <label htmlFor="username" className="form-label">
                  username *
                  <input
                    type="text"
                    placeholder="Username"
                    onChange={setUsername}
                    value={username}
                    id="username"
                    name="username"
                    className="form-control"
                    autoComplete="off"
                    required
                  />
                </label>
              </div>
              <br />
              <div>
                <label htmlFor="email" className="form-label">
                  Email address *
                  <input
                    type="email"
                    placeholder="Email"
                    onChange={setEmail}
                    value={email}
                    id="email"
                    name="email"
                    className="form-control"
                    autoComplete="off"
                    required
                  />
                </label>
              </div>
              <br />
              <div>
                <label htmlFor="location" className="form-label">
                  Location
                  <input
                    type="text"
                    placeholder="Location"
                    onChange={setLocation}
                    value={location}
                    id="location"
                    name="location"
                    className="form-control"
                    autoComplete="off"
                  />
                </label>
              </div>
              <br />
              <div>
                <label htmlFor="role" className="form-label">
                  Position
                  <select
                    name="role"
                    id="role"
                    value={position}
                    onChange={handleSelect}
                  >
                    <option defaultValue={position}>{position}</option>
                    <option value="Admin">ADMIN</option>
                    <option value="Marketer">MARKETER</option>
                  </select>
                </label>
              </div>
              <br />
              <div>
                <label htmlFor="phone" className="form-label">
                  Phone *
                  <input
                    type="number"
                    placeholder="Phone"
                    onChange={setPhone}
                    value={phone}
                    id="phone"
                    name="phone"
                    className="form-control"
                    autoComplete="off"
                    required
                  />
                </label>
              </div>
              <br />
              <div>
                <label htmlFor="address" className="form-label">
                  Address
                  <input
                    type="text"
                    placeholder="Address"
                    onChange={setAddress}
                    value={address}
                    id="address"
                    name="address"
                    className="form-control"
                    autoComplete="off"
                  />
                </label>
              </div>
              <br />
              <div id="img-editor">
                <label htmlFor="picture" className="form-label reg-edit">
                  Picture
                  <div className="image-container">
                    <img src={avatar} alt={`${name}`} className="cus-image upload-img" />
                  </div>
                  <span onClick={handleEditPic}>Edit</span>
                </label>
              </div>
              <div id="new-img-editor" style={{ display: 'none' }}>
                <label htmlFor="picture" className="form-label">
                  Picture
                  {ImageUpload()}
                </label>
              </div>
              <br />
              <div className="form-group btn1">
                {!isPending && (
                  <button
                    type="submit"
                    className="btn1 btn-secondary1 add-marketer-btn"
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
export default EditUser;
