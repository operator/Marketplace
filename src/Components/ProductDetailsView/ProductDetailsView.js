import React, { useContext } from 'react';
import './ProductDetailsView.css';
import BreadCrumbs from './BreadCrumbs/BreadCrumbs';
import BreadCrumbsLoader from './BreadCrumbs/BreadCrumbsLoader/BreadCrumbsLoader';
import ProductsListFourProducts from './ProductsListFourProducts/ProductsListFourProducts';
import Product from './Product/Product';
import ProductLoader from './Product/ProductLoader/ProductLoader';
import APIContext from '../../Contexts/APIContext';

const ProductDetailsView = () => {
  const { loadingProduct, isRandomProduct } = useContext(APIContext);
  return (
    <div className="container product-details-page">
      <div>
        {loadingProduct ? <BreadCrumbsLoader /> : <BreadCrumbs />}
        <div className="product-details">
          {loadingProduct ? <ProductLoader /> : <Product />}
        </div>
        <div className="flex-column jc-c product-details-product-block">
          <p className="text-center fw-bold product-block-header">
            You May Also Like
          </p>
          <div className="d-flex">
            <ProductsListFourProducts />
          </div>
          {isRandomProduct && (
            <div className="text-center">
              <a className="btn btn-light text-center" href="/product-details">
                🎲 Surprise Me Again
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsView;
