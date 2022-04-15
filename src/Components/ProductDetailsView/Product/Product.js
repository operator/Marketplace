import React, { useContext, useState } from 'react';
import classnames from 'classnames';
import { xorWith, isEqual } from 'lodash';

import './Product.css';
import APIContext from '../../../Contexts/APIContext';
import moneyFormatter from '../../../utilities/moneyFormatter';

function OptionSelector({
  selected,
  label,
  className,
  ...props
}) {
  return <button {...props} className={classnames("btn btn-option-selector me-2 rounded-1 shadow-none", className, {
    'border-primary border-2 m-0': selected
  })}>
    {label}
  </button>
}

export default function Product() {
  const { product } = useContext(APIContext);
  const images = product?.images?.length ? product?.images : product.images_scrapeds
  const [mainImageOriginal, setMainImageOriginal] = useState(images && images[0]?.src);
  const [mainImage, setMainImage] = useState(mainImageOriginal);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants && product?.variants[0]);
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
  const buyCaption = selectedVariant?.quantityAvailable && selectedVariant?.checkoutLink ? 'Buy now' : 'Currently Unavailable';

  const getVariant = (option) => {
    const options = [...selectedVariant.meta_data
    .filter(({ key, value }) => option.key !== key && option.value !== value), option];
    return product.variants
      .find(variant => !xorWith(options, variant.meta_data, isEqual).length)
  }

  const isOptionSelected = (option) => {
    return selectedVariant
    .meta_data
    .find(({ key, value }) => key === option.key && value === option.value)
  };

  const isOptionAvailable = (option, prevOptions) => {
    const options = [...prevOptions, option];
    return product.variants
    .filter(variant => xorWith(options, variant.meta_data, isEqual).length === (variant.meta_data.length - options.length))
    .reduce((prev, curr) => {
      return prev + curr.quantityAvailable
    }, 0);
  }

  const onOptionSelect = (option) => {
    const variant = getVariant(option);
    setSelectedVariant(variant);
    setMainImage(variant?.image?.src)
    setMainImageOriginal(variant?.image?.src)
  }

  const prevOptions = (metaIndex) => {
    return Array.from({length: metaIndex })
    .map((_, index) => selectedVariant.meta_data
    .find(metaData => metaData.key === product?.meta_data[index].key))
  }

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
        <h5 className="fw-bold">{moneyFormatter(selectedVariant?.price, selectedVariant?.currencyCode)}</h5>
        <hr />
        {product?.meta_data?.map(({ key, values = [] }, metaIndex) => <div key={key}>
          <label className="mb-2">{key}</label>
          <div className="d-flex">
            {values.map((value, index) => <OptionSelector
              selected={isOptionSelected({ key, value })}
              onClick={() => onOptionSelect({ key, value })}
              key={index}
              label={value}
              disabled={!isOptionAvailable({ key, value }, prevOptions(metaIndex))}
            />)}
          </div>
        </div>)}
        <div className="d-flex margin-bottom-extra">
          <a className={classnames("btn black-button text-center", {
            'opacity-50': !product?.quantity || !selectedVariant?.checkoutLink
          })} href={product?.quantity ? selectedVariant?.checkoutLink : null} target="_blank" rel='noreferrer'>
            {buyCaption}
          </a>
        </div>
        <p>{product.description}</p>
      </div>
    </div>
  );
}
