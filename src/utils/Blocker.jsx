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
      <button className="btn-modal" onClick={toggleModal}>
        {trigger}
      </button>

      {modal && (
        <div className="modal">
          <div className="overlay" onClick={toggleModal}></div>
          <div className="modal-content">
            {display}
            <button className="close-modal" onClick={toggleModal}>
              CLOSE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blocker;
/* eslint-enable */
