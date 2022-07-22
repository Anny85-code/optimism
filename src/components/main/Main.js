import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Main.css';
import hello from '../../assets/image/hello.jfif';
import ChartWithCrosshair from '../chart/Chart_with_Crosshair';
import { getCustomerFromApi } from '../../redux/forms/customerReducer';
import { getTransactionFromApi } from '../../redux/forms/transactionReducer';
import { getUsersFromApi } from '../../redux/forms/userManReducer';
import { getItemFromApi } from '../../redux/forms/getItemsReducer';

const data = JSON.parse(localStorage.getItem('user'));
const { user } = data || {};
/* eslint-disable */
const Main = () => {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customer);
  const numOfCustomers = customers.data.length;
  const transactions = useSelector((state) => state.transactions);
  const numOfTransactions = transactions.data.length;
  const users = useSelector((state) => state.userManReducer);
  const marketers = users.data.filter((user) => user.role === 'marketer');
  const numOfMarketers = marketers.length;
  const admins = users.data.filter((user) => user.role === 'admin');
  const numOfAdmins = admins.length;
  const products = useSelector((state) => state.item);
  const numOfProducts = products.data.length;
  const date = new Date();
  const today = date.toDateString();

  useEffect(() => {
    dispatch(getCustomerFromApi());
    dispatch(getTransactionFromApi());
    dispatch(getUsersFromApi());
    dispatch(getItemFromApi());
  }, []);

  return (
    <>
      {user.role === 'admin' ? (
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
            <div className="main__cards">
              <div className="cards">
                <i className="fa fa-user-o fa-2x text-lightblue" />
                <div className="card__inner">
                  <p className="text-primary-p">Number of Customers</p>
                  <span className="font-bold text-title">{numOfCustomers}</span>
                </div>
              </div>
              <div className="cards">
                <i class="fa fa-line-chart fa-2x text-red" />
                <div className="card__inner">
                  <p className="text-primary-p">Number of Transactions</p>
                  <span className="font-bold text-title">
                    {numOfTransactions}
                  </span>
                </div>
              </div>
              <div className="cards">
                <i className="fa fa-user-o fa-2x text-yellow" />
                <div className="card__inner">
                  <p className="text-primary-p">Number of Marketers</p>
                  <span className="font-bold text-title">{numOfMarketers}</span>
                </div>
              </div>
              <div className="cards">
                <i className="fa fa-group fa-2x text-red" />
                <div className="card__inner">
                  <p className="text-primary-p">Number of Admins</p>
                  <span className="font-bold text-title">{numOfAdmins}</span>
                </div>
              </div>
              <div className="cards">
                <i className="fa fa-cart-plus fa-2x text-red" />
                <div className="card__inner">
                  <p className="text-primary-p">Number of Products</p>
                  <span className="font-bold text-title">{numOfProducts}</span>
                </div>
              </div>
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
                  <div className="card1 cd">
                    <h1 className="h-card">Income</h1>
                    <p>$56,678</p>
                  </div>

                  <div className="card2 cd">
                    <h1 className="h-card">Sales</h1>
                    <p>$516,678</p>
                  </div>

                  <div className="card3 cd">
                    <h1 className="h-card">Users</h1>
                    <p>12,678</p>
                  </div>

                  <div className="card4 cd">
                    <h1 className="h-card">Orders</h1>
                    <p>56,678</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <main>
          <div className="main__container">
            <div className="main__title">
              <img src={hello} alt="hello logo" />
              <div className="main__greetings">
                <h1>Hello {user.name}</h1>
                <h4>
                  Welcome to another lovely day {user.name}! Today is {today}.
                </h4>
                <p>As you know, everybody must eat, so Let's talk food!</p>
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
