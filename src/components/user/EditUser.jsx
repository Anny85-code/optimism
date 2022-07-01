import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneUserFromApi } from '../../redux/forms/oneUserManReducer';
import '../forms/Register.css';

const EditUser = () => {
  const param = useParams();
  const { id } = param;
  const user = useSelector((state) => state.oneUser);
  const [state, setState] = useState({
    ...state,
    [user.data.keys]: user.data.values,
  });
  const { error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneUserFromApi(id));
  }, []);

  const onchange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // dispatch(registerUserToApi(state));
  };

  const [select, setSelect] = useState('PLEASE SELECT ...');

  const handleSelect = (e) => {
    setSelect(e.target.value);
  };

  return (
    <div className="form-container">
      <div className="form-group">
        <div className="column mt-5">
          <div className="d-flex justify-content-center align-items-center flex-column shadow-lg rounded w-50 mx-auto p-5">
            <h3 className="title">Register A Marketer</h3>
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
            <form className="register-form">
              <div>
                <label htmlFor="name" className="form-label">
                  Name *
                  <input
                    type="text"
                    placeholder="Name"
                    onChange={onchange}
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
                    onChange={onchange}
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
                    onChange={onchange}
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
                <label htmlFor="password" className="form-label">
                  Password *
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={onchange}
                    id="password"
                    name="password"
                    className="form-control"
                    autoComplete="off"
                    required
                  />
                </label>
              </div>
              <br />
              <div>
                <label htmlFor="password_confirmation" className="form-label">
                  Password confirmation *
                  <input
                    type="password"
                    placeholder="Password Confirmation"
                    onChange={onchange}
                    id="password_confirmation"
                    name="password_confirmation"
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
                    onChange={onchange}
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
                    value={select}
                    onChange={handleSelect}
                  >
                    <option defaultValue="PLEASE SELECT ...">
                      PLEASE SELECT ...
                    </option>
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
                    onChange={onchange}
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
                    onChange={onchange}
                    id="address"
                    name="address"
                    className="form-control"
                    autoComplete="off"
                  />
                </label>
              </div>
              <br />
              <div>
                <label htmlFor="picture" className="form-label">
                  Picture
                  <input
                    type="text"
                    placeholder="Picture"
                    onChange={onchange}
                    id="picture"
                    name="avatar"
                    className="form-control"
                    autoComplete="off"
                  />
                </label>
              </div>
              <br />
              <div className="form-group btn">
                <button
                  type="submit"
                  className="btn btn-secondary"
                  onClick={handleSubmit}
                >
                  Edit User
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
