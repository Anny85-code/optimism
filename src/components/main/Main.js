/* eslint-disable */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { utils, writeFileXLSX } from 'xlsx';
import './Main.css';
import hello from '../../assets/image/hello.jfif';
import ChartWithCrosshair from '../chart/Chart_with_Crosshair';
import { getCustomerFromApi } from '../../redux/forms/customerReducer';
import { delOneCustomerFromApi } from '../../redux/forms/OneCustomerReducer';
import { getDashboard } from '../../redux/forms/getDashboard';
import Loader from '../loader/Loader';
// import { delOneTransFromApi } from '../../redux/forms/OneTransactionReducer';

const Main = () => {
  const dispatch = useDispatch();
  const dash = useSelector((state) => state.dash);
  const dashData = dash?.data;
  const customers = useSelector((state) => state.customer?.data);
  // const transactions = useSelector((state) => state.transactions);
  const date = new Date();
  const today = date.toDateString();
  const data = JSON.parse(localStorage.getItem('user'));
  const { user } = data || {};
  const admins = user.role === 'admin' || user.role === 'superadmin';

  function handleNill() {
    const myCustomers = customers?.customers?.filter(
      (customer) => customer.card_number === null
      // ========{ To Update bad card number/ user location } =========
      // customer.card_number !== null && customer.card_number.includes('U/M86')
    );

    // =========={ To Update bad card number/ user location, also uncomment the reload in postCustomerUpdate function }==========
    // const cusWithNewCardNo = myCustomers.map((cus) => {
    //   const newCardNo = cus.card_number.replace('U/M86', 'UMI86');
    //   const newCus = { ...cus, card_number: newCardNo };
    //   return newCus;
    // });

    // cusWithNewCardNo.map((cus) => dispatch(postUpdateCustomerToApi(cus)));
    // ============= Used to play with update card number info ================

    const exportData = myCustomers.map((cus) => {
      return {
        id: cus.id,
        name: cus.name,
        phone: cus.phone,
        address: cus.address,
        daily_contribution: cus.daily_contribution,
      };
    });

    // ======={ To Update bad card number/ user location, exported data to view changes }========
    // const exportData = cusWithNewCardNo.map((cus) => {
    //   return {
    //     id: cus.id,
    //     name: cus.name,
    //     phone: cus.phone,
    //     address: cus.address,
    //     daily_contribution: cus.daily_contribution,
    //     cardNumber: cus.card_number,
    //   };
    // });
    // ============= Used to play with update card number info ================

    const ws = utils.json_to_sheet(exportData.sort((a, b) => a.id - b.id));
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Data');
    writeFileXLSX(wb, `Customer_with_no_card_number.xlsx`);
  }

  const delNoCard = () => {
    const myCustomers = customers?.customers?.filter(
      (customer) => customer.card_number === null
    );
    myCustomers.map((cus) => dispatch(delOneCustomerFromApi(cus.id)));
  };
  console.log(dashData);
  // ================ Used to destroy all transactions in the app ====================
  // const delNoCard = () => {
  //   transactions.data.transactions.map((trans) =>
  //     dispatch(delOneTransFromApi(trans.id))
  //   );
  // };

  useEffect(() => {
    dispatch(getCustomerFromApi());
    // dispatch(getTransactionFromApi());
    dispatch(getDashboard());
  }, []);

  const comma = (num) => {
    const number = parseInt(num);
    const newText = number.toLocaleString();
    return newText;
  };

  return (
    <>
      {admins ? (
        <main>
          <div className="main__container">
            <div className="main__title">
              <img src={hello} alt="hello logo" />
              <div className="main__greetings">
                <h1>Hello {user.name}</h1>
                <h4>
                  Welcome to another brand new day {user.name}! Today is {today}
                  .
                </h4>
              </div>
            </div>
            {dash?.loading ? (
              <Loader />
            ) : (
              <>
                {' '}
                <div className="main__cards">
                  <div className="cards">
                    <i className="fa fa-user-o fa-2x text-lightblue" />
                    <div className="card__inner">
                      <p className="text-primary-p">Number of Customers</p>
                      <span className="font-bold text-title">
                        {comma(dashData?.customers ?? 0)}
                      </span>
                    </div>
                  </div>
                  <div className="cards">
                    <i class="fa fa-line-chart fa-2x text-red" />
                    <div className="card__inner">
                      <p className="text-primary-p">Number of Transactions</p>
                      <span className="font-bold text-title">
                        {comma(dashData?.trans ?? 0)}
                      </span>
                    </div>
                  </div>
                  <div className="cards">
                    <i className="fa fa-user-o fa-2x text-yellow" />
                    <div className="card__inner">
                      <p className="text-primary-p">Number of Marketers</p>
                      <span className="font-bold text-title">
                        {comma(dashData?.marketers ?? 0)}
                      </span>
                    </div>
                  </div>
                  <div className="cards">
                    <i className="fa fa-group fa-2x text-red" />
                    <div className="card__inner">
                      <p className="text-primary-p">Number of Admins</p>
                      <span className="font-bold text-title">
                        {comma(dashData?.admins ?? 0)}
                      </span>
                    </div>
                  </div>
                  <div className="cards">
                    <i className="fa fa-cart-plus fa-2x text-red" />
                    <div className="card__inner">
                      <p className="text-primary-p">Number of Products</p>
                      <span className="font-bold text-title">
                        {comma(dashData?.items ?? 0)}
                      </span>
                    </div>
                  </div>
                  <div className="cards">
                    <i className="fa fa-user-o fa-2x text-green" />
                    <div className="card__inner">
                      <p className="text-primary-p">Number of Supervisors</p>
                      <span className="font-bold text-title">
                        {comma(dashData?.supervs ?? 0)}
                      </span>
                    </div>
                  </div>
                  {user.username === 'admin' && (
                    <>
                      <div className="cards" onClick={handleNill}>
                        <div className="card__inner">
                          <p className="text-primary-p">No Card No</p>
                        </div>
                      </div>
                      <button
                        style={{
                          color: 'white',
                          backgroundColor: '#FF5D5D',
                          border: 'none',
                          borderRadius: '8px',
                        }}
                        type="button"
                        onClick={delNoCard}
                      >
                        Del No Card
                      </button>
                    </>
                  )}
                </div>
                <div className="charts">
                  <div className="charts__left">
                    <div className="charts__left__title">
                      <div>
                        <h1>Daily Reports</h1>
                        <p>Kaduna, Jos, Nassarawa, Kogi</p>
                      </div>
                      <i className="fa fa-usd" />
                    </div>
                    <ChartWithCrosshair />
                  </div>
                  <div className="charts__right">
                    <div className="charts__right__title">
                      <div>
                        <h1>Stats Report</h1>
                        <p>Kaduna, Jos, Nassarawa, Kogi</p>
                      </div>
                      <i className="fa fa-use" />
                    </div>
                    <div className="charts__right__cards">
                      <NavLink to="/paidsixty">
                        <div className="card1 cd">
                          <h1 className="h-card">Paid 60%</h1>
                          <p>View Customers</p>
                        </div>
                      </NavLink>

                      {user.role === 'superadmin' && (
                        <>
                          <div className="card2 cd">
                            <h1 className="h-card">Sales</h1>
                            <p style={{ color: '#1c551c' }}>
                              <span style={{ color: '#0b4b09' }}>NGN </span>
                              {comma(dashData?.sales ?? 0)}
                            </p>
                          </div>

                          <div className="card3 cd">
                            <h1 className="h-card">Users</h1>
                            <p>{comma(dashData?.users) - 2}</p>
                          </div>

                          <NavLink to="/itemsstats">
                            <div className="card4 cd">
                              <h1 className="h-card">Orders</h1>
                              <p>See Order</p>
                            </div>
                          </NavLink>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </main>
      ) : (
        <main>
          <div className="main__container">
            <div className="main__title">
              <img src={hello} alt="hello logo" />
              <div className="main__greetings">
                <h1>Hello {user.name}</h1>
                <p>
                  Welcome to another lovely day {user.name}!
                  <span className="welcome-date">Today is {today}.</span>
                </p>
                <h4>As you know, everybody must eat, so Let's talk food!</h4>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};
/* eslint-enable */
export default Main;
