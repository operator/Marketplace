import React, { useContext } from 'react';
import './ProductDetailsView.css';
import BreadCrumbs from './BreadCrumbs/BreadCrumbs';
import BreadCrumbsLoader from './BreadCrumbs/BreadCrumbsLoader/BreadCrumbsLoader';
import ProductsListFourProducts from './ProductsListFourProducts/ProductsListFourProducts';
import Product from './Product/Product';
import ProductLoader from './Product/ProductLoader/ProductLoader';
import APIContext from '../../Contexts/APIContext';

const ProductDetailsView = ()=> {

  const { product, loadingProduct } = useContext(APIContext);

    return (
      <div className="d-flex col-12 jc-c product-details-page">
        <div className="flex-column ai-c col-9">
          {loadingProduct? <BreadCrumbsLoader /> 
              :
              <BreadCrumbs />
            }
          <div className="product-details">
            {loadingProduct? <ProductLoader /> 
              :
              <Product />
            }
          </div>
          <div className="flex-column jc-c product-details-product-block">
            <p className="text-center fw-bold product-block-header">You May Also Like</p>
            <div className="d-flex">
              <div className="product-list-wrapper">
                <ProductsListFourProducts />
              </div>
            </div>
          </div>
        </div>
      </div>
    );

}

export default ProductDetailsView;
