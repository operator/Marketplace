import { useState } from 'react';
import { Placeholder } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Img from '../Img';

import './style.scss';
const BrandCard = ({ logo, products, bgUrl, name }) => {
  const bgActive =
    'radial-gradient(100% 100% at 50% 100.09%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)';
  const bgInActive =
    'radial-gradient(100% 100% at 50% 100.09%, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.5) 100%)';
  const [active, setActive] = useState(false);
  const onMouseEnter = () => {
    setActive(true);
  };
  const onMouseLeave = () => {
    setActive(false);
  };
  return (
    <div
      style={{
        backgroundImage: `${active ? bgActive : bgInActive}, url(${bgUrl})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }}
      className="brand-card p-5 h-100 d-flex align-items-end justify-content-center"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="d-flex flex-column text-center">
        <Img src={logo} alt="brand-logo" className="img-fluid pb-3 brand-logo" />
        <Link to={`/products?brand[]=${name}`} className="btn link-arrow shadow-none">
          View {products} products
        </Link>
      </div>
    </div>
  );
};

export const BrandCardLoader = () => {
  return <Placeholder bg="dark" xs={12} animation="glow">
    <Placeholder xs={12} bg="dark" style={{ height: '180px' }} />
  </Placeholder>
}

export default BrandCard;
