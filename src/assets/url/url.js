/* eslint-disable */
// const endpoint = 'https://optimistic-food.herokuapp.com/api/v2';

export const setEndPoint = (e) => {
  let url = localStorage.getItem('baseUrl');
  /*  ===== January 2023 =================
  if (e.target.textContent === 'Log in') {
    url = 'https://rails-eqth.onrender.com/api/v2';
    localStorage.setItem('baseUrl', url);
  }
      ====================================  */

  if (e.target.textContent === 'Log in') {
    url = 'https://rails-7myb.onrender.com/api/v2';
    localStorage.setItem('baseUrl', url);
  }
  if (e.target.textContent === 'Log in new') {
    url = 'https://rails-0afz.onrender.com/api/v2';
    // url = 'http://localhost:4000/api/v2';
    localStorage.setItem('baseUrl', url);
  }
  if (!url) {
    return;
  }
  return url;
};
const endpoint = localStorage.getItem('baseUrl');
// const endpoint = 'http://localhost:4000/api/v1';
// const endpoint = 'http://localhost:4000/api/v2';
export const imgApi = 'https://api.cloudinary.com/v1_1/dpuwic8rw/image/upload/';
export const cldName = 'dpuwic8rw';

export default endpoint;
/* eslint-enable */
