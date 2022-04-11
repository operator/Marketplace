import { Route, Routes } from 'react-router-dom';
import MarketplaceSearch from './Pages/MarketplaceSearch/MarketplaceSearch';
import ProductDetails from './Pages/ProductDetails/ProductDetails';
import Home from './Pages/Home';
import TopSeller from './Pages/TopSeller';
import OurFavorites from './Pages/OurFavorites';
import NotFound from './Pages/404';

const AppRoutes = () => {
  return (
    <Routes location={window.location} key={window.location.pathname}>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<MarketplaceSearch />} />
      <Route path="/product-details" element={<ProductDetails />} />
      <Route path="/top-sellers" element={<TopSeller />} />
      <Route path="/our-favorites" element={<OurFavorites />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
