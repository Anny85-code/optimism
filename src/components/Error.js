import React from 'react';
import { NavLink } from 'react-router-dom';
import './Error.css';
// import error from '../assets/image/error.gif';

function Error() {
  return (
    <div className="container-error">
      <div className="text-center">
        <h1 className="display-1 for-o-for-text">404</h1>
        <p className="fs-3">
          <span className="text-danger">Opps! Page not found.</span>
        </p>

        {/* <img src={error} alt="error" /> */}
        <div className="image-blurred-edge" />
        <p className="text-danger">
          You are not authorized to view this page.
          <br />
          Login to view this page.
        </p>

        <NavLink to="/" className="btn btn-secondary">
          <div className="btn-error">
            <i className="fa fa-arrow-left" />
            <span>Go Back</span>
          </div>
        </NavLink>
      </div>
    </div>
  );
}

export default Error;
