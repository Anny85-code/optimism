/* eslint-disable */
import React, { useState } from 'react';
import './Blocker.css';

const Blocker = ({ trigger, display }) => {
  const [modal, setModal] = useState(false);

  const toggleModal = (e) => {
    e.preventDefault();
    setModal(!modal);
  };

  return (
    <div className="App">
      <button className="btn-modal add-trans-btn" onClick={toggleModal}>
        {trigger}
      </button>

      {modal && (
        <div className="modal">
          <div className="overlay" onClick={toggleModal}></div>
          <div className="modal-content">
            {display}
            <button className="close-modal" onClick={toggleModal}>
              x
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blocker;
/* eslint-enable */
