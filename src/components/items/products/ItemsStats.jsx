import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import { getMyFoodFromApi } from '../../../redux/forms/myFoodReducer';
import './Itemstat.css';
import comma from '../../../utils/Comma';

/* eslint-disable */
const ItemsStats = () => {
  const dispatch = useDispatch();
  const foods = useSelector((state) => state.myFood?.data);
  const foodArray = [];
  const data = JSON.parse(localStorage.getItem('user'));
  const { user } = data || {};
  const superadmin = user.role === 'superadmin';
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'emp-data',
  });

  foods.map(({ items }) => {
    const foodItems = JSON.parse(items);
    const food = Object.values(foodItems);
    food.map((order) => {
      const { id, name, qauntity } = order;
      foodArray.push({ id, name, qauntity });
    });
  });

  /* ========================   ====   Bad ID snoop   ====   =============================*/

  foods.map(({ id, v2_customer_id, user_id, items }) => {
    const foodItems = JSON.parse(items);
    const food = Object.values(foodItems);
    const condenseData = { ...food, v2_customer_id, user_id, id };
    if (condenseData['0'].name === 'MAGGIE ' && condenseData['0'].id !== 18) {
      console.log(condenseData.v2_customer_id, id, user_id);
    }
  });

  /* ========================   ====   Bad ID snoop   ====   =============================*/

  const foodArr = Object.values(
    foodArray.reduce((obj, item) => {
      obj[item.id]
        ? (obj[item.id].qauntity += item.qauntity)
        : (obj[item.id] = item);
      return obj;
    }, {})
  );

  const allOrderTotal = foodArr.reduce((acc, obj) => acc + obj.qauntity, 0);

  useEffect(() => {
    dispatch(getMyFoodFromApi());
    localStorage.setItem('order', allOrderTotal);
  }, []);

  return (
    <div className="transact-customer-container">
      {superadmin && (
        <div ref={componentRef}>
          <div id="col">
            <h2 className="total-orders">
              Total Orders: {comma(allOrderTotal)}
            </h2>
          </div>
          <div className="custrans-name">
            <h4 className="columns">
              <span className="cus-name1">Serial Number</span>
            </h4>
            <h4 className="columns i">Items</h4>
            <h4 className="columns i" id="a">
              Item's ID
            </h4>
            <h4 className="columns">
              <span className="cus-name1 ">Quantity</span>
            </h4>
          </div>
          <div className="custrans-name">
            <h3 className="columns" id="col">
              <p className="custransactname"></p>
            </h3>
            <h6
              className="columns i"
              style={{ borderBottom: '2px solid crimson' }}
            ></h6>
            <h3
              className="columns i"
              id="col"
              style={{
                borderRight: '2px solid crimson',
                borderBottom: '2px solid crimson',
                color: 'crimson',
              }}
            ></h3>
            <h3 className="columns" id="col" style={{ color: 'crimson' }}></h3>
          </div>
          {foodArr.map((food, i) => (
            <div key={food.id}>
              <ul id="p-child">
                {/* {food.id !== 0 && ( */}
                <li>
                  <div className="custrans-name">
                    <h4 className="columns"> {i + 1}</h4>
                    <h4 className="columns i" id="top">
                      {`${food.name}`}
                    </h4>
                    <h4
                      className="columns i"
                      style={{ borderRight: '2px solid crimson' }}
                    >
                      {`${food.id}`}
                    </h4>
                    <h4 className="columns">{comma(food.qauntity)}</h4>
                  </div>
                </li>
                {/* )} */}
              </ul>
            </div>
          ))}
          <center style={{ margin: '12px 0' }}>
            <button className="view-trans" type="button" onClick={handlePrint}>
              Print
            </button>
          </center>
        </div>
      )}
      {!superadmin && (
        <p className="no-trans">You are unauthorized to see this page</p>
      )}
    </div>
  );
  /* eslint-enable */
};

export default ItemsStats;
