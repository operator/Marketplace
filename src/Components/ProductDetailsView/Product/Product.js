import React, { useContext, useState } from 'react';
import classnames from 'classnames';

import './Product.css';
import APIContext from '../../../Contexts/APIContext';
import moneyFormatter from '../../../utilities/moneyFormatter';

function OptionSelector({
  label,
  className
}) {
  return <button className={classnames("btn btn-option-selector me-2", className)}>
    {label}
  </button>
}

export default function Product() {
  const { product } = useContext(APIContext);
  const images = product?.images?.length ? product?.images : product.images_scrapeds
  const mainImageOriginal = (images && images[0]?.src);
  const [mainImage, setMainImage] = useState(mainImageOriginal);
  const additionalImages = images && images.map((image, key) => (
    <img
      key={'image' + key}
      className="additional-images__img"
      src={image.src}
      alt="additional"
      onMouseEnter={() => showImageLarge(image.src)}
      onMouseLeave={() => showMainImage()}
    />
  ));
  const showImageLarge = (imageSrc) => {
    setMainImage(imageSrc);
  };
  const showMainImage = () => {
    setMainImage(mainImageOriginal);
  };
  const buyCaption = product.quantity && product.checkoutLink ? 'Buy now' : 'Currently Unavailable';
  return (
    <div className="product d-flex jc-sb">
      <div className="content col-5">
        <div className="flex-popup">
          <img
            className="primary-image__img"
            src={mainImage}
            alt="PrimaryImage"
          />
        </div>
        <div className="flex-popup">
          <div className="additional-images d-flex">{additionalImages}</div>
        </div>
      </div>
      <div className="col-6 product-description">
        <h1 className="product-description-header">{product.vendor}</h1>
        <p>{product.title}</p>
        <h5 className="fw-bold">{moneyFormatter(product.maxPrice, product.currencyCode)}</h5>
        <div className="d-flex margin-bottom-extra">
          <a className={classnames("btn black-button text-center", {
            'opacity-50': !product.quantity || !product.checkoutLink
          })} href={product.quantity ? product.checkoutLink : null} target="_blank" rel='noreferrer'>
            {buyCaption}
          </a>
        </div>
        <p>{product.title}</p>
        {product?.meta_data?.map(({ key, values = [] }) => <div key={key}>
          <label className="mb-2">{key}</label>
          <div className="d-flex">
            {values.map((value, index) => <OptionSelector key={index} className={classnames({
              'border-dashed': index === values.length - 1
            })} label={value} />)}
          </div>
        </div>)}
      </div>
    </div>
  );
}
