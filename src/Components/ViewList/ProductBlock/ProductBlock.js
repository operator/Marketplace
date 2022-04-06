import React from 'react';

import './ProductBlock.css';
import moneyFormatter from '../../../utilities/moneyFormatter';

const ProductBlock = (props) => {
  const productDetails = (product) => {
    sessionStorage.productDetails = JSON.stringify(product);
    window.location = `/product-details?product=${product.productID}`;
  };

  return (
    <>
      <div
        className="product-block"
        aria-hidden
        onClick={() => productDetails(props.productData)}
      >
        <div className="img-wrapper">
          <img
            className="img-wrapper__img"
            src={props.productData.images[0]?.src}
            alt={props.productData.description}
          />
        </div>

        <div className="product-info">
          <span className="product-info__price">
           {moneyFormatter(props.productData.maxPrice, props.productData.currencyCode)}
          </span>
          <h3 className="product-info__title">{props.productData.title}</h3>
          <div>
            <p className="product-info__desc">
              Fullfilled by <span>{props.productData.vendor}</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductBlock;
