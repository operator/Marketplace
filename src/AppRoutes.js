import { Route, Routes } from 'react-router-dom';
import MarketplaceSearch from './Pages/MarketplaceSearch/MarketplaceSearch';
import ProductDetails from './Pages/ProductDetails/ProductDetails';
import Home from './Pages/Home';
import TopSeller from './Pages/TopSeller';

const AppRoutes = () => {
  return (
    <Routes location={window.location} key={window.location.pathname}>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<MarketplaceSearch />} />
      <Route path="/product-details" element={<ProductDetails />} />
      <Route path="/top-sellers" element={<TopSeller />} />
    </Routes>
  );
};

export default AppRoutes;
