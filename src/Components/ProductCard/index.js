/* eslint-disable jsx-a11y/anchor-is-valid */
import classnames from 'classnames';

import moneyFormatter from '../../utilities/moneyFormatter';
import './style.scss';

const ProductCard = ({ product, className }) => {
  const onClick = () => {
    sessionStorage.productDetails = JSON.stringify(product);
    window.location = `/product-details?product=${product.productID}`;
  }
  return (
    <div onClick={onClick} className={classnames("product-card d-flex flex-md-column align-items-center", className)}>
      <div className="product-card_img-wrapper overflow-hidden rounded-2">
        <img src={product.images[0].src} alt="product" />
      </div>
      <div className="d-flex flex-column product-card_details ms-2">
        <span className="fw-bolder mb-2">
          {moneyFormatter(product.maxPrice, product.currencyCode)}
        </span>
        <span className="product-card_title mb-2 fw-600 text-light-primary">{product.title}</span>
        <p className="small">
          Fullfilled by{' '}
          <a className="text-secondary" href="#">
            {product.vendor}
          </a>
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
