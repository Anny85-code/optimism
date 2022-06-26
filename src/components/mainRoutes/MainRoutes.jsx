import { Route, Routes } from 'react-router-dom';
import AddCostumer from '../addCostumer/AddCostumer';

const MainRoutes = () => (
  <Routes>
    <Route path="/addcostumer" element={<AddCostumer />} />
  </Routes>
);

export default MainRoutes;
