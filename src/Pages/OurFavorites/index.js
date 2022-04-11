import { useState, useEffect } from 'react';

import PageLayout from '../../Layout/Page';
import BrandCard from '../../Components/BrandCard';
import { brands } from '../../__mocks__';
import ProductCard from '../../Components/ProductCard';
import API from '../../services/api';
import ProductCardLoader from '../../Components/ProductCardLoader';

const OurFavorites = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/api/products', {
        limit: 20,
        order_by: 'DESC',
        sort_by: 'productCreatedAt',
      });
      setProducts(data.value);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <PageLayout>
      <div className="mt-4 mb-5">
        <div className="d-flex align-items-center justify-content-between">
          <h2>Our Favorite Brands</h2>
          <a href="#" className="text-decoration-none link-arrow">
            View more
          </a>
        </div>
        <div className="row g-5">
          {brands.map(({ logo, bgUrl, products }, key) => (
            <div key={key} className="col-12 col-md-4">
              <BrandCard logo={logo} bgUrl={bgUrl} products={products} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 mb-5">
        <div>
          <h2>Operator's Favorites Products</h2>
        </div>
        <div className="d-flex flex-wrap">
          {loading &&
            !products.length &&
            Array.from({ length: 6 }).map((_, index) => (
              <ProductCardLoader className="mb-3 me-md-3" key={index} />
            ))}
          {products.map((product, index) => (
            <ProductCard
              className="mb-3 me-md-3"
              product={product}
              key={index}
            />
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default OurFavorites;
