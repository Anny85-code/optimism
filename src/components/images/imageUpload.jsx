import React, { useState } from 'react';

const imageUpload = () => {
  const [image, setImage] = useState();
  const handleImageSel = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div>
      <input type="file" value={image} onClick={handleImageSel} />
    </div>
  );
};

export default imageUpload;
