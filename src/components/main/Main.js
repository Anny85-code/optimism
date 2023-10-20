/* eslint-disable */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './Main.css';
import hello from '../../assets/image/hello.jfif';
import ChartWithCrosshair from '../chart/Chart_with_Crosshair';
import { getDashboard } from '../../redux/forms/getDashboard';
import Loader from '../loader/Loader';
import DeleteNullDates from '../../utils/DeleteNullDates';
import GetNullDates from '../../utils/GetNullDates';
import DeleteNoCardNo from '../../utils/DeleteNoCardNo';
import GetNoCardNo from '../../utils/GetNoCardNo';
import comma from './../../utils/Comma';

const Main = () => {
  const dispatch = useDispatch();
  const dash = useSelector((state) => state.dash);
  const dashData = dash?.data;
  const date = new Date();
  const today = date.toDateString();
  const data = JSON.parse(localStorage.getItem('user'));
  const { user } = data || {};
  const admins = user.role === 'admin' || user.role === 'superadmin';

  useEffect(() => {
    dispatch(getDashboard());
  }, []);

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
                  Welcome {user.name}! Today is {today}.
                </h4>
              </div>
            </div>
            {dash.loading ? (
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
                      <GetNoCardNo />
                      <DeleteNoCardNo />
                      <GetNullDates />
                      <DeleteNullDates />
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
                    {user.role === 'superadmin' && (
                      <div className="charts__right__cards">
                        <>
                          <NavLink to="/paidsixty">
                            <div className="card1 cd">
                              <p>View Customer's</p>
                              <h1 className="h-card">Percentage</h1>
                              <p>NB: Takes 5+ min</p>
                            </div>
                          </NavLink>
                          <div className="card2 cd">
                            <h1 className="h-card">Sales</h1>
                            <p style={{ color: '#1c551c' }}>
                              <span style={{ color: '#0b4b09' }}>NGN </span>
                              {comma(dashData?.sales ?? 0)}
                            </p>
                          </div>

                          <div className="card3 cd">
                            <h1 className="h-card">Users</h1>
                            {dashData?.users > 2 ? (
                              <p>{comma(dashData?.users) - 2}</p>
                            ) : (
                              <p>0</p>
                            )}
                          </div>

                          <NavLink to="/itemsstats">
                            <div className="card4 cd">
                              <h1 className="h-card">Orders</h1>
                              <p>See Order</p>
                            </div>
                          </NavLink>
                        </>
                      </div>
                    )}
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
