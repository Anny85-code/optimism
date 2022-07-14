import React, { useState } from 'react';
import axios from 'axios';
import { Image, Transformation } from 'cloudinary-react';
import { imgApi } from '../../assets/url/url';

const ImageUpload = () => {
  const [selectedImg, setSelectedImg] = useState([]);

  const uploadImg = () => {
    const formData = new FormData();
    formData.append('file', selectedImg);
    formData.append('upload_preset', 'x9elqosr');

    const postPic = async () => {
      try {
        const postImg = await axios.post(imgApi, formData);
        console.log(postImg);
      } catch (error) {
        console.log(error);
      }
    };

    postPic();
  };

  return (
    <div>
      <input
        type="file"
        onClick={(e) => setSelectedImg(e.target.files[0])}
        // style={{ display: 'none' }}
      />
      <button type="button" onClick={uploadImg}>
        Attach Image
      </button>

      <div className="image-preview">
        {Image && (
          <Image cloudName="demo" publicId="sample">
            <Transformation crop="scale" width="200" angle="0" />
          </Image>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
