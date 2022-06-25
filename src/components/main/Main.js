import './Main.css';
// import hello from "../../assets/image/hello.jfif";
import hello from '../../assets/image/hello.png';
import ChartWithCrosshair from '../chart/Chart_with_Crosshair';

const Main = () => (
  <main>
    <div className="main__container">
      <div className="main__title">
        <img src={hello} alt="hello logo" />
        <div className="main__greetings">
          <h1>Hello Admin</h1>
          <p>Welcome to Admin Dashboard</p>
        </div>
      </div>
      <div className="main__cards">
        <div className="cards">
          <i className="fa fa-user-o fa-2x text-lightblue" />
          <div className="card__inner">
            <p className="text-primary-p">Number of Subscribers</p>
            <span className="font-bold text-title">678</span>
          </div>
        </div>
        <div className="cards">
          <i className="fa fa-calendar fa-2x text-red" />
          <div className="card__inner">
            <p className="text-primary-p">Times of Watching</p>
            <span className="font-bold text-title">2657</span>
          </div>
        </div>
        <div className="cards">
          <i className="fa fa-user-o fa-2x text-yellow" />
          <div className="card__inner">
            <p className="text-primary-p">Number of Employees</p>
            <span className="font-bold text-title">300</span>
          </div>
        </div>
        <div className="cards">
          <i className="fa fa-thumbs-up fa-2x text-green" />
          <div className="card__inner">
            <p className="text-primary-p">Number of Likes</p>
            <span className="font-bold text-title">678</span>
          </div>
        </div>
      </div>
      <div className="charts">
        <div className="charts__left">
          <div className="charts__left__title">
            <div>
              <h1>Daily Reports</h1>
              <p>Kaduna, Abuja, Sokoto</p>
            </div>
            <i className="fa fa-usd" />
          </div>
          <ChartWithCrosshair />
        </div>
        <div className="charts__right">
          <div className="charts__right__title">
            <div>
              <h1>Stats Report</h1>
              <p>Kaduna, Nassarawa, Benue</p>
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
);

export default Main;
