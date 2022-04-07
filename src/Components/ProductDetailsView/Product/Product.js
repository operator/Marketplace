import React, { useContext, useState } from 'react';
import classnames from 'classnames';
import { groupBy } from  'lodash';

import './Product.css';
import APIContext from '../../../Contexts/APIContext';
import moneyFormatter from '../../../utilities/moneyFormatter';

export default function Product() {
  const { product } = useContext(APIContext);
  const [mainImage, setMainImage] = useState(product.images[0].src);
  const mainImageOriginal = product.images[0].src;
  const additionalImages = product.images.map((image, key) => (
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
  const buyCaption = product.quantity ? 'Buy now' : 'Currently Unavailable';
  const groupedVariants = groupBy(product?.variants?.map((variant) => ({
      ...variant,
      groupBy: variant?.meta_data[0]?.key
    })), 'groupBy');

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
            'opacity-50': !product.quantity
          })} href={product.quantity ? product.checkoutLink : null} target="_blank" rel='noreferrer'>
            {buyCaption}
          </a>
        </div>
        <p>{product.title}</p>
        {Object.keys(groupedVariants).map(group => <p key={group}>
          {group}: <span className="fw-bold">{groupedVariants[group].map((groupItem) => groupItem.title).join(',')}</span>
        </p>)}
      </div>
    </div>
  );
}
