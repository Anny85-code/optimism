import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getItemFromApi } from '../../../redux/forms/getItemsReducer';
// import topp from '../../../assets/json/data.json';
// import './AddItemCustomer.css';
import './play.css';

// export default function AddItemCustomer() {
//   const allItemsCostumer = useSelector((state) => state.item);
//   const [quantity, setQuantity] = useState(1);
//   const [checked, setChecked] = useState([]);
//   const dispatch = useDispatch();
//   const { data } = allItemsCostumer;

//   useEffect(() => {
//     dispatch(getItemFromApi());
//   }, []);

//   const handleItemQty = (e) => {
//     if (e.target.value > 0) {
//       setQuantity(e.target.value);
//     }
//   };

//   const handleCheck = (e) => {
//     let updatedList = [...checked];
//     if (e.target.checked) {
//       updatedList = [...checked, e.target.value];
//     } else {
//       updatedList.splice(checked.indexOf(e.target.value), 1);
//     }
//     setChecked(updatedList);
//   };

//   const checkedItems = checked.length
//     ? checked.reduce((total, item, index, array) => {
//         console.log(total, item, index, array);
//         return total + ',' + item;
//       })
//     : '';

//   let isChecked = (item) =>
//     checked.includes(item) ? 'checked-item' : 'not-checked-item';

//   return (
//     <div>
//       {data.map((item) => (
//         <div key={item.id}>
//           <input type="checkbox" onChange={handleCheck} />
//           <h2 className={isChecked(item.name)}>{item.name}</h2>
//           <input
//             type="number"
//             value={quantity}
//             onChange={handleItemQty}
//             style={{ width: '40px', display: 'inline' }}
//           />
//         </div>
//       ))}

//       <h1>{`Items checked are: ${checkedItems}`}</h1>
//     </div>
//   );
// }

const AddItemCustomer = () => {
  const [checked, setChecked] = useState([]);
  const allItemsCostumer = useSelector((state) => state.item);
  //   const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { data } = allItemsCostumer;
  const dataPrices = data.map((la) => la.price);

  useEffect(() => {
    dispatch(getItemFromApi());
  }, []);

  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  const checkedItems = checked.length
    ? checked.reduce((total, item, ind) => {
        return total + +dataPrices[ind];
      }, 0)
    : 0;

  // Return classes based on whether item is checked
  var isChecked = (item) =>
    checked.includes(item) ? 'checked-item' : 'not-checked-item';

  return (
    <div className="app">
      <div className="checkList">
        <div className="title">Your CheckList:</div>
        <div className="list-container">
          {data.map((item, index) => (
            <div key={index}>
              <input value={item} type="checkbox" onChange={handleCheck} />
              <span className={isChecked(item)}>{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div>{`Items checked are: ${checkedItems}`}</div>
    </div>
  );
};

export default AddItemCustomer;
