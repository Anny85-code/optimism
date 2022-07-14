import { useState } from 'react';
import axios from 'axios';
import { Image } from 'cloudinary-react';
import { cldName, imgApi } from '../../assets/url/url';

const ImageUpload = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageData, setImageData] = useState('');

  localStorage.setItem('image_str', imageData.secure_url);

  const uploadImage = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', selectedImages);
    formData.append('upload_preset', 'x9elqosr');

    const postImage = async () => {
      try {
        const response = await axios.post(imgApi, formData);
        console.log(response);
        setImageData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    postImage();
  };

  return (
    <>
      <div>
        <article>
          <input
            type="file"
            name="file"
            id="file"
            onChange={(e) => setSelectedImages(e.target.files[0])}
          />
          <button onClick={uploadImage}>Upload Image</button>
        </article>

        <article>
          {imageData && (
            <Image cloudName={cldName} publicId={`${imageData.secure_url}`} />
          )}
        </article>
      </div>
    </>
  );
};

export default ImageUpload;
