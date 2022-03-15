import React, { useContext } from 'react';
import './ProductsListFourProducts.css';
import classnames from 'classnames';
import APIContext from '../../../Contexts/APIContext';
import ProductBlock from '../../ViewList/ProductBlock/ProductBlock';


const ProductsListFourProducts = () => {
    let { products, loadingProducts } = useContext(APIContext);

    const ProductBlockLoader = () => {
      return <div className="card border-0 flex-row flex-md-column">
        <div className="placeholder-glow col-6 col-md-12">
          <div className="placeholder p-5 w-100" />
          <div className="placeholder p-5 w-100 d-none d-md-block" />
        </div>
        <div className="card-body col-6 col-md-12">
          <h5 className="card-title placeholder-glow">
            <span className="placeholder col-6"></span>
          </h5>
          <p className="card-text placeholder-glow">
            <span className="placeholder col-7 me-1"></span>
            <span className="placeholder col-4"></span>
            <span className="placeholder col-4 me-1"></span>
            <span className="placeholder col-6"></span>
            <span className="placeholder col-8"></span>
          </p>
        </div>
      </div>
    }

    const WrappedLoader = ({
      className
    }) => {
      return <div className={classnames("mt-md-3 products-wrapper w-100", className)}>
        <ProductBlockLoader />
        <ProductBlockLoader />
        <ProductBlockLoader />
        <ProductBlockLoader />
      </div>
    }
    
    return (
        <>
            {loadingProducts ? <WrappedLoader /> 
                :
                <div className="d-flex justify-content-center align-items-center mt-md-3">
                    <div className="products-wrapper w-100">
                            {products.slice(0,4).map((product) => <ProductBlock key={product.productID} productData={product} />)}
                    </div>
                </div>
            }
        </>
    );
};
export default ProductsListFourProducts
