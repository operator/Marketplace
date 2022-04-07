import React, { useContext } from 'react';
import './ProductsListFourProducts.css';
import classnames from 'classnames';
import APIContext from '../../../Contexts/APIContext';
import ProductCard from '../../ProductCard';
import ProductCardLoader from '../../ProductCardLoader';

const ProductsListFourProducts = () => {
  let { products, loadingProducts } = useContext(APIContext);

  const WrappedLoader = ({ className }) => {
    return (
      <div className={classnames('mt-md-3 d-flex justify-content-center w-100 flex-wrap', className)}>
        <ProductCardLoader className="me-md-3 mb-3" />
        <ProductCardLoader className="me-md-3 mb-3" />
        <ProductCardLoader className="me-md-3 mb-3" />
        <ProductCardLoader className="me-md-3 mb-3" />
      </div>
    );
  };

  return (
    <>
      {loadingProducts ? (
        <WrappedLoader />
      ) : (
        <div className="d-flex justify-content-center align-items-center mt-md-3 w-100 flex-wrap">
            {products.slice(0, 4).map((product) => (
              <ProductCard key={product.productID} product={product} className="me-md-3 mb-3" />
            ))}
        </div>
      )}
    </>
  );
};
export default ProductsListFourProducts;
