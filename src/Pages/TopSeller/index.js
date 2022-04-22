import { useState, useEffect } from 'react';
import classnames from 'classnames';

import API from '../../services/api';
import ProductCard from '../../Components/ProductCard';
import ProductCardLoader from '../../Components/ProductCardLoader';
import PageLayout from '../../Layout/Page';
import { BrandCardLoader } from '../../Components/BrandCard';
import useBrands from '../../hooks/useBrands';
import './style.scss';

const TopBrand = ({ name, products, className }) => {
  return (
    <div className={classnames('top-brand', className)}>
      <div className="top-brand_img bg-light mb-2 d-flex align-items-center justify-content-center">
        <h5 className="text-light-primary fw-600">{name}</h5>
      </div>
      <p className="text-light-primary fw-600 mb-1">{name}</p>
      <a
        href={`/products?brand[]=${name}`}
        className="btn p-0 shadow-none link-arrow"
      >
        View {products} products
      </a>
    </div>
  );
};

const TopSeller = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false)
  const { loading: brandLoading, brands } = useBrands(3);

  const getNewArrivalProducts = async () => {
    try {
      setLoading(true);
      const { data } = await API.get('/api/products', {
        limit: 12,
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
    getNewArrivalProducts();
  }, []);

  return (
    <PageLayout>
      <>
        <div className="mt-4">
          <div>
            <h2>Top Selling Products Today</h2>
          </div>
          <div className="d-flex flex-wrap">
            {loading &&
              !products.length &&
              Array.from({ length: 6 }).map((_, index) => (
                <ProductCardLoader className="mb-3 me-md-3" key={index} />
              ))}
            {products.slice(0, 6).map((product, index) => (
              <ProductCard
                className="mb-3 me-md-3"
                product={product}
                key={index}
              />
            ))}
          </div>
        </div>
        <div className="mt-4">
          <div>
            <h2>Top Selling Products Today</h2>
          </div>
          <div className="d-flex flex-wrap">
            {loading &&
              !products.length &&
              Array.from({ length: 6 }).map((_, index) => (
                <ProductCardLoader className="mb-3 me-md-3" key={index} />
              ))}
            {products.slice(0, 6).map((product, index) => (
              <ProductCard
                className="mb-3 me-md-3"
                product={product}
                key={index}
              />
            ))}
          </div>
        </div>
        <div className="mt-4 mb-5">
          <div className="d-flex align-items-center justify-content-between">
            <h2>Top Selling Brands</h2>
          </div>
          <div className="row g-3">
            {brandLoading && Array.from({ length: 3 }).map((_, index) =>
              <div key={index} className="col-12 col-md-4">
                <BrandCardLoader />
              </div>
            )}
            {brands.slice(0, 3).map((brand, index) => (
              <TopBrand
                className="col-12 col-md-4"
                name={brand?.vendor || brand}
                products={brand?.products}
                key={index}
              />
            ))}
          </div>
        </div>
      </>
    </PageLayout>
  );
};

export default TopSeller;
