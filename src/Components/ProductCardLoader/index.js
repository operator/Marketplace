import classnames from 'classnames';
import './style.scss';

const ProductCardLoader = ({ className }) => {
  return (
    <div
      className={classnames(
        'card border-0 product-card-loader align-items-center align-items-md-stretch flex-row flex-md-column',
        className
      )}
    >
      <div className="placeholder-glow">
        <div className="placeholder product-card-loader_img" />
      </div>
      <div className="card-body px-0 ms-2 ms-md-0">
        <h5 className="card-title placeholder-glow">
          <span className="placeholder col-6"></span>
        </h5>
        <p className="card-text placeholder-glow">
          <span className="placeholder col-7 me-1"></span>
          <span className="placeholder col-4"></span>
          <span className="placeholder col-4 me-1 mb-1"></span>
          <span className="placeholder col-6 mb-1"></span>
          <span className="placeholder col-4 me-1"></span>
          <span className="placeholder col-1 me-1"></span>
          <span className="placeholder col-5"></span>
        </p>
      </div>
    </div>
  );
};

export default ProductCardLoader;
