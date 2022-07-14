import React, { useState } from 'react';
// import { Image, Transformation } from 'cloudinary-react';

const ImageUpload = () => {
  const [selectedImg, setSelectedImg] = useState([]);

  const uploadImg = () => {
    const formData = new FormData();
    formData.append('file', selectedImg);
    formData.append('upload_preset', '');
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

      <div className="image-preview">{/* Image */}</div>
    </div>
  );
};

export default ImageUpload;
