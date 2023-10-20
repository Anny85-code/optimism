import { useMemo, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import { getMyFoodFromApi } from '../../../redux/forms/myFoodReducer';
import './Itemstat.css';
import comma from '../../../utils/Comma';
import Loader from '../../loader/Loader';

/* eslint-disable */
const RenderItemsStats = ({ foods }) => {
  const dispatch = useDispatch();
  const data = JSON.parse(localStorage.getItem('user'));
  const { user } = data || {};
  const superadmin = user.role === 'superadmin';
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'emp-data',
  });

  /* ========================   ====   Bad ID snoop   ====   ============================= */
  /* ========================   ====   Comment this out   ====   ============================= */
  const foodArr = useMemo(() => {
    if (foods?.items) {
      return Object.values(foods.items);
    } else {
      return [];
    }
  }, [foods]);

  /* ========================   ====   Uncomment this   ====   =============================

  console.log(foods);
/*
  foods.map(({ items, id, user_id }) => {
    const foodItems = JSON.parse(items);
    const food = Object.values(foodItems);
    const id2 = id; // Track bad ID
    food.map((order) => {
      const { id, name, qauntity } = order;
      if (id === 33) {
        console.log(order, id2, user_id); // Track bad ID
      }
    });
  });
  */
  /* ========================   ====   Bad ID snoop   ====   =============================*/

  // const allOrderTotal;

  // const sortedFoods = foodArr?.sort((a, b) => b.quantity - a.quantity);
  // console.log(sortedFoods);

  useEffect(() => {
    dispatch(getMyFoodFromApi());
  }, [foodArr.length > 0]);

  return (
    <>
      {!foodArr.length > 0 ? (
        <Loader />
      ) : (
        <div className="transact-customer-container">
          {superadmin && (
            <div ref={componentRef}>
              <div id="col">
                <h2 className="total-orders">
                  {/* Total Orders: {comma(allOrderTotal)} */}
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
                <h3
                  className="columns"
                  id="col"
                  style={{ color: 'crimson' }}
                ></h3>
              </div>
              {foodArr.length > 0 &&
                foodArr.map((food, i) => (
                  <div key={food.id}>
                    <ul id="p-child">
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
                          <h4 className="columns">{comma(food.quantity)}</h4>
                        </div>
                      </li>
                    </ul>
                  </div>
                ))}
              <center style={{ margin: '12px 0' }}>
                <button
                  className="view-trans"
                  type="button"
                  onClick={handlePrint}
                >
                  Print
                </button>
              </center>
            </div>
          )}
          {!superadmin && (
            <p className="no-trans">You are unauthorized to see this page</p>
          )}
        </div>
      )}
    </>
  );
  /* eslint-enable */
};

export default RenderItemsStats;
