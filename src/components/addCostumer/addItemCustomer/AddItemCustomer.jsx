// import { useState } from 'react';
// import { useDispatch } from 'react-redux/es/exports';
// import data from '../../../assets/json/data.json';
// import { postCustomerToApi } from '../../../redux/forms/customerReducer';
// import './AddItemCustomer.css';

// const getFormattedPrice = (price) => `NGN${price.toFixed(2)}`;
// /* eslint-disable */
// const AddItemCustomer = () => {
//   const [checkedState, setCheckedState] = useState(
//     new Array(data.length).fill(false)
//   );

//   const dispatch = useDispatch();
//   const [total, setTotal] = useState(0);

//   const handleOnChange = (position) => {
//     const updatedCheckedState = checkedState.map((item, index) =>
//       index === position ? !item : item
//     );

//     setCheckedState(updatedCheckedState);

//     const totalPrice = updatedCheckedState.reduce(
//       (sum, currentState, index) => {
//         if (currentState === true) {
//           return sum + data[index].price;
//         }
//         return sum;
//       },
//       0
//     );

//     setTotal(totalPrice);
//   };

//   const handleContribution = () => {
//     if (total > 0) {
//       let customer = JSON.parse(localStorage.getItem('customer'));
//       const userData = { ...customer, daily_contribution: total };
//       dispatch(postCustomerToApi(userData));
//       localStorage.removeItem('customer');
//       localStorage.removeItem('image_str');
//     }
//   };

//   return (
//     <div className="items-costumer">
//       <h3 className="head-text">Select Product</h3>
//       {data.map(({ name, price }, index) => {
//         return (
//           <div key={index} className="checkbox-container">
//             <h3>
//               <label htmlFor={index} key={index} className="checkbox-label">
//                 <input
//                   type="checkbox"
//                   id={`custom-checkbox-${index}`}
//                   name={name}
//                   value={name}
//                   className="checkbox-input"
//                   checked={checkedState[index]}
//                   onChange={() => handleOnChange(index)}
//                 />
//               </label>
//             </h3>
//             <div className="price-name">
//               <h3>
//                 <label
//                   htmlFor={`custom-checkbox-${index}`}
//                   id="item-costumer-name"
//                 >
//                   {name}
//                 </label>
//               </h3>
//               <h3 className="right-section"> &nbsp;-&nbsp;</h3>
//               <h3 className="right-section">{getFormattedPrice(price)}</h3>
//             </div>
//           </div>
//         );
//       })}
//       <div className="toppings-list-item">
//         <div className="left-section">Total:</div>
//         <div className="right-section">{getFormattedPrice(total)}</div>
//       </div>
//       <div className="form-group btn1">
//         <button
//           type="submit"
//           className="add-customer-btn"
//           onClick={handleContribution}
//         >
//           Add Customer
//         </button>
//       </div>
//     </div>
//   );
// };
// /* eslint-enable */
// export default AddItemCustomer;

import React, { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import PropTypes from 'prop-types';
import Carousel from 'react-material-ui-carousel';
import { useSelector, useDispatch } from 'react-redux';
import PuffLoader from 'react-spinners/PuffLoader';
import styles from './Home.module.css';
import Car from './Cars';
import { getCarsFromApi } from '../../redux/reducers/cars/carsReducer';

function CarSlides({ navigate }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.cars);
  const { data: cars, loading } = state;
  const loaderColor = '#97bf0e';

  const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

  const cssOverride = `
  display: block;
  margin: 100px auto;
  border-color: red;
`;

  useEffect(() => {
    if (cars.length === 0) {
      dispatch(getCarsFromApi());
    }
  }, []);

  const sliderItems = cars.length > 3 ? 3 : cars.length;
  const mobileItems = cars.length > 1 ? 1 : cars.length;
  const carLists = [];

  for (let i = 0; i < cars.length; i += sliderItems) {
    if (i % sliderItems === 0 && i % mobileItems === 0) {
      carLists.push(
        <div className={styles.banners} key={i.toString()}>
          <div className={styles.BannerGrid}>
            {isMobile
              ? cars
                  .slice(i, i + mobileItems)
                  .map((da) => (
                    <Car key={da.id} item={da} navigate={navigate} />
                  ))
              : cars
                  .slice(i, i + sliderItems)
                  .map((da) => (
                    <Car key={da.id} item={da} navigate={navigate} />
                  ))}
          </div>
        </div>
      );
    }
  }

  return (
    <div>
      {loading ? (
        <PuffLoader
          color={loaderColor}
          css={cssOverride}
          size={100}
          loading={loading}
        />
      ) : (
        <Carousel
          animation="slide"
          autoPlay
          cycleNavigation
          timeout={3000}
          indicators={false}
        >
          {carLists}
        </Carousel>
      )}
    </div>
  );
}

CarSlides.propTypes = {
  navigate: PropTypes.func.isRequired,
};

export default CarSlides;
