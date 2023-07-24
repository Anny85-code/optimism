import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Image } from 'cloudinary-react';
import { cldName, imgApi } from '../../assets/url/url';
import { sendErrors } from '../../redux/forms/errors';
import './ImageUpload.css';

const ImageUpload = () => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageData, setImageData] = useState('');
  const dispatch = useDispatch();
  const li = 'https://res.cloudinary.com/dpuwic8rw/image/upload/';
  const nk = 'v1663004650/optimistic/avatar_cohnpr.svg';
  const link = li + nk;

  localStorage.setItem('image_str', imageData.secure_url ?? link);
  const uploadImage = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', selectedImages);
    formData.append('upload_preset', 'x9elqosr');

    const postImage = async () => {
      try {
        const response = await axios.post(imgApi, formData);
        setImageData(response.data);
      } catch (error) {
        dispatch(sendErrors(error));
      }
    };

    postImage();
  };

  return (
    <>
      <div className="upload-container">
        <article className="art-container art-mart" id="art-cus">
          <input
            type="file"
            name="file"
            id="file"
            onChange={(e) => setSelectedImages(e.target.files[0])}
          />
          <button type="button" onClick={uploadImage} className="upload-btn">
            Upload Image
          </button>
        </article>

        <article>
          {imageData && (
            <Image
              cloudName={cldName}
              publicId={`${imageData.secure_url}`}
              className="upload-image product-i"
            />
          )}
        </article>
      </div>
    </>
  );
};

export default ImageUpload;
