// import React, { useState } from 'react';
// // import axios from 'axios';
// // import { Image, Transformation } from 'cloudinary-react';
// import { imgApi } from '../../assets/url/url';

// const ImageUpload = () => {
//   const [selectedImg, setSelectedImg] = useState([]);

//   const uploadImg = () => {
//     const formData = new FormData();
//     formData.append('file', selectedImg);
//     formData.append('upload_preset', 'x9elqosr');
//     console.log(formData);
//     const postPic = async () => {
//       try {
//         fetch(imgApi, {
//           method: 'POST',
//           body: formData,
//         })
//           .then((response) => {
//             console.log(response);
//             // return response.text();
//           })
//           .then((data) => {
//             // document.getElementById('data').innerHTML += data;
//             console.log(data);
//           });
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     postPic();
//   };

//   return (
//     <div>
//       <input
//         type="file"
//         onClick={(e) => setSelectedImg(e.target.files[0])}
//         // style={{ display: 'none' }}
//       />
//       <button type="button" onClick={uploadImg}>
//         Attach Image
//       </button>

//       <div className="image-preview">
//         {/* {Image && (
//           <Image cloudName="dpuwic8rw" publicId={``}>
//             <Transformation crop="scale" width="200" angle="0" />
//           </Image>
//         )} */}
//       </div>
//     </div>
//   );
// };

// export default ImageUpload;

import { useState } from 'react';
import axios from 'axios';
import { Image } from 'cloudinary-react';
import { imgApi } from '../../assets/url/url';

export default function ImageUpload() {
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageData, setImageData] = useState(null);

  const uploadImage = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', selectedImages);
    formData.append('upload_preset', 'x9elqosr');

    const postImage = async () => {
      try {
        const response = await axios.post(imgApi, formData);
        console.log(response);
        // setImageData(response.data);
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
          {/* {imageData && (
            <Image
              cloudName="YOUR_CLOUD_NAME"
              publicId={`https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1649427526/${imageData.public_id}`}
              // Replace YOUR_CLOUD_NAME with your cloudName which you can find in your Dashboard. NOTE: Your publicId link might be different.
            />
          )} */}
        </article>
      </div>
    </>
  );
}
