import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import moneyFormatter from '../../utilities/moneyFormatter';
import './style.scss';

const ProductCard = ({ product, className }) => {
  const navigate = useNavigate()
  const onClick = () => {
    sessionStorage.productDetails = JSON.stringify(product);
    navigate(`/product-details?product=${product.productID}`);
  }
  return (
    <div className={classnames("product-card d-flex flex-md-column", className)}>
      <div onClick={onClick} className="product-card_img-wrapper overflow-hidden rounded-2">
        <img src={product.images[0].src} alt="product" />
      </div>
      <div className="d-flex flex-column product-card_details ms-2">
        <span className="fw-bolder mb-2" onClick={onClick}>
          {moneyFormatter(product.maxPrice, product.currencyCode)}
        </span>
        <span onClick={onClick} className="product-card_title mb-2 fw-600 text-light-primary">{product.title}</span>
        <p className="small">
          Fullfilled by{' '}
          <a className="text-secondary" href={`/products?brand[]=${product.vendor}`}>
            {product.vendor}
          </a>
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
