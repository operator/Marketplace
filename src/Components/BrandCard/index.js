import { useState } from 'react';
const BrandCard = ({ logo, products, bgUrl }) => {
  const bgActive =
    'radial-gradient(100% 100% at 50% 100.09%, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.5) 100%)';
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
        <img src={logo} alt="brand-logo" className="img-fluid pb-3" />
        <a href="#" className="btn link-arrow">
          View {products} products
        </a>
      </div>
    </div>
  );
};

export default BrandCard;
