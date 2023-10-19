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
          <b
            style={
              isPhoneScreen ? { marginLeft: '0' } : { marginLeft: '10rem' }
            }
          >
            <i>NB: This may take up to 5 mins or more. Be patient!</i>
            <br />
            <i>
              To print, Click &quot;Export Items&quot; button to generate Excel.
            </i>
            <br />
            <i>
              If &quot;Export Items&quot; or &quot;View Items&quot; buttons
              don&apos;t work, a customer item is missing. Call Developer.
            </i>
          </b>
        </center>
      )}
      {longer && (
        <center>
          <br />
          <p style={{ color: 'forestgreen', fontWeight: 'bolder' }}>
            This may not work on phones due to limited resources. Try it on your
            PC!
          </p>
          <br />
          <br />
          <i>
            <b>
              If you choose to continue on your phone, Loading may take more
              than 8 mins.
            </b>
            <br />
            <br />
            After loading & you select a percent, wait another 2 to 5 mins for
            it to propagate on your phone!
          </i>
          <br />
          <br />
          <b>Total wait time: 10 mins possibly! ☕☕</b>
        </center>
      )}
    </>
  );
};

export default Loader;
