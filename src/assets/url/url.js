// const endpoint = 'https://optimistic-food.herokuapp.com/api/v2';

export const setEndPoint = (e) => {
  let url = localStorage.getItem('baseUrl');
  if (e.target.textContent === 'Log in') {
    url = 'https://rails-eqth.onrender.com/api/v2';
    localStorage.setItem('baseUrl', url);
  }
  if (e.target.textContent === 'Log in new') {
    url = 'https://rails-c6w0.onrender.com/api/v2';
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
