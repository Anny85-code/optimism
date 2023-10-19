import React, { useEffect, useState } from 'react';
import { Grid } from 'react-loader-spinner';
import './Loader.css';

const Loader = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [longer, setLonger] = useState(false);
  const isPhoneScreen = window.innerWidth < 600;

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 5000);
    setTimeout(() => {
      if (isPhoneScreen) setLonger(true);
    }, 8000);
  }, []);
  return (
    <>
      <div className="loader">
        <Grid color="crimson" height={100} width={100} />
      </div>
      {isVisible && (
        <center>
          <b>
            <i
              style={
                isPhoneScreen ? { marginLeft: '0' } : { marginLeft: '10rem' }
              }
            >
              NB: This may take up to 5 mins or more. Be patient!
            </i>
          </b>
        </center>
      )}
      {longer && (
        <center>
          <br />
          <i>
            This may not work on phones due to limited resources. Try it on your
            PC!
          </i>
          <br />
          <i>
            If you choose to continue on your phone, Loading may take more than
            8mins.
            <br />
            After you select your percent, wait another 2 to 5 mins for it to
            propagate on your phone!
          </i>
        </center>
      )}
    </>
  );
};

export default Loader;
