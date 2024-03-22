import { useMemo, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import './Itemstat.css';
import comma from '../../../utils/Comma';
import Loader from '../../loader/Loader';

/* eslint-disable */
const RenderItemsStats = ({ foods }) => {
  const data = JSON.parse(localStorage.getItem('user'));
  const { user } = data || {};
  const superadmin = user.role === 'superadmin';
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'emp-data',
  });

  console.log(foods);

  const foodArr = useMemo(() => {
    if (foods?.items) {
      return Object.values(foods.items);
    } else {
      return [];
    }
  }, [foods]);

  return (
    <>
      {!foodArr.length > 0 ? (
        <Loader />
      ) : (
        <div className="transact-customer-container">
          {superadmin && (
            <div ref={componentRef}>
              <div id="col">
                <div className="total-orders">
                  {/* Total Orders: {comma(allOrderTotal)} */}
                  <h2>
                    <i>Name:</i> {foods?.user?.name}
                  </h2>
                  <span>
                    <i>Location:</i> {foods?.user?.location_area}
                  </span>
                </div>
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
