/* eslint-disable */
// import React from 'react';
// import './LandingFoot.css';

// export const LandingFoot = () => {
//   return (
//     <div className="landing_footer">
//       <h6>LandingFoot</h6>
//       Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate
//       perferendis necessitatibus sequi, at quam vitae.
//     </div>
//   );
// };
/* eslint-enable */

import React from 'react';
import './LandingFoot.css';
import fb from '../../../assets/image/facebook.png';
import linkdin from '../../../assets/image/linkdin.png';
import insta from '../../../assets/image/insta.png';

export const LandingFoot = () => {
  const Foter = () => new Date().getFullYear();
  return (
    <>
      <div
        style={{
          backgroundColor: '#000',
          paddingTop: '89px',
          paddingBottom: '90px',
        }}
      >
        <div className="container_landing">
          <div className="row_landing">
            <div className="col-lg-3 col-sm-6 contain">
              <p className="logo"> Food 4 All </p>{' '}
              <p className="text">
                Building the future requires a strong foundation, a clear
                vision, and a trusted partner. We are committed to providing the
                highest level of services to help our clients achieve their
                goals and build a better tomorrow!
              </p>{' '}
              <p className="text"> Quick service delivery! </p>{' '}
              <p className="text"> Affordable prices! </p>{' '}
              <div className="social_logo">
                <a
                  href="https://www.facebook.com/profile.php?id=100063462045932&mibextid=ZbWKwL"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <img src={fb} alt="fb" className="img" />
                </a>
                <a href="#instagram" rel="noopener noreferrer" target="_blank">
                  <img src={linkdin} alt="in" className="img" />
                </a>
                <a href="#linkedIn" rel="noopener noreferrer" target="_blank">
                  <img src={insta} alt="insta" className="img" />
                </a>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6  contain">
              <p className="head"> Services </p>{' '}
              <p className="text">Available 24 hours and 7 days a week </p>{' '}
              <p className="text"> hendrexresource@yahoo.com</p>{' '}
              <p className="text"> (234) 80 - 3266 - 8874 </p>{' '}
            </div>
            <div className="col-lg-3 col-sm-6 contain">
              <p className="head"> Head Office </p>{' '}
              <p className="text">Km 7 Abak road Uyo, Akwa Ibom State </p>{' '}
              <p className="text"> hendrexresource@yahoo.com </p>{' '}
              <p className="text"> (080) 3945 - 3274 </p>{' '}
            </div>
            <div className="col-lg-3 col-sm-6 contain">
              <p className="head"> Opening Hours </p>{' '}
              <p className="text"> Mon - Sat: 8: 00 - 17: 00 </p>{' '}
              <p className="text"> Sun: Closed </p>{' '}
            </div>{' '}
          </div>
        </div>{' '}
      </div>
      <div
        style={{ backgroundColor: '#000', borderTop: 'solid 1px #707070' }}
      >
        <p className="bottom">
          Copyright© {Foter()} &nbsp; All rights reserved{' '}
        </p>{' '}
      </div>{' '}
    </>
  );
};
// export default LandingFoot;
