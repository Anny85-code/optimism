import React from 'react';
import './VideoCard.css';
import image1 from '../../assets/image/2.png';
import image2 from '../../assets/image/big.png';

/* eslint-disable */
const VideoCard = () => {
  return (
    <div className="video_card_main_container">
      <div className="image_stack container_video_card">
        <div className="image-stack__item image-stack__item—top">
          <img src={image1} alt="" className="video_image" />
        </div>
        <div className="image-stack__item image-stack__item—bottom">
          <img src={image2} alt="" className="video_image2" />
        </div>
      </div>

      <div data-aos="slide-right" className="video_right_container">
        <ul>
          <li id="right_video_text">
            Recipe videos that never misses any portion
          </li>
          <li>
            inappropriate behavior is often laughed off as “boys will be boys,”
            women face higher conduct standards especially in the workplace.
            That’s why it’s crucial that, as women.
          </li>
          <li>
            <div className="video_cont">
              {' '}
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/BuhrHclfW8o"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default VideoCard;
