import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import classnames from 'classnames';

import marketPlaceLogo from '../../Assets/Marketplace.svg';
import byOperatorLogo from '../../Assets/byOperator.svg';
import SearchInput from '../../Components/Header/SearchInput';
import Footer from '../../Components/Footer';
import API from '../../services/api';
import ProductCard from '../../Components/ProductCard';
import ProductCardLoader from '../../Components/ProductCardLoader';
import './style.scss';

const newArrivalLink = '/products?order_by=DESC&sort_by=productCreatedAt';

const navElements = [
  {
    text: 'New Arrivals',
    url: newArrivalLink,
  },
  {
    text: 'Top Sellers',
    url: '/top-sellers',
  },
  {
    text: 'Our Favorites',
    url: '#',
  },
  {
    text: 'Suprise Me',
    url: '#',
  },
  {
    text: 'Browse All',
    url: '/products',
  },
];

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
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onSearchSubmit = (value) => {
    navigate(`/products?search=${value}`);
  };

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
    getBrands();
  }, []);

  const getBrands = async (search) => {
    try {
      setLoading(true);
      const { data } = await API.get('/api/brand/list', { search, limit: 3 });
      setBrands(data.value);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container py-4">
        <div className="d-flex align-items-center justify-content-center flex-column logo">
          <div className="mb-3">
            <a href="/">
              <img src={marketPlaceLogo} alt="market place logo" />
            </a>
          </div>
          <img src={byOperatorLogo} alt="Operator" />
        </div>
        <hr />
        <ul className="nav justify-content-center mb-4">
          {navElements.map(({ text, url }) => (
            <li key={text} className="nav-item">
              <a className="nav-link" href={url}>
                {text}
              </a>
            </li>
          ))}
        </ul>
        <div className="d-flex justify-content-center">
          <SearchInput onSubmit={onSearchSubmit} />
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
          <div className="d-flex align-items-center justify-content-between">
            <h2>Top Selling Brands</h2>
          </div>
          <div className="row g-3">
            {brands.map((brand) => (
              <TopBrand
                className="col-12 col-md-4"
                name={brand?.vendor || brand}
                products={brand?.products}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default TopSeller;
