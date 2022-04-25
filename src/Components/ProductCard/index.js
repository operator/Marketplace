/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState, useEffect } from 'react';
import classnames from 'classnames';
import { useNavigate } from 'react-router-dom';

import moneyFormatter from '../../utilities/moneyFormatter';
import './style.scss';

const ProductCard = ({ product, className }) => {
  const navigate = useNavigate()
  const [selectedVariant, setSelectedVariant] = useState(false);
  const [selectedColor, setSelectedColor] = useState(false)

  const onClick = () => {
    sessionStorage.productDetails = JSON.stringify(product);
    navigate(`/product-details?product=${product.productID}`);
  }

  const colorMetaNameRegex = new RegExp('^colou*r$', 'i');
  const maxColorOptionsToShow = 5;

  const getColorOptions = () => {
    const colorOptions = product?.meta_data.filter(md => colorMetaNameRegex.test(md.key));
    return !!colorOptions && !!colorOptions[0] ? colorOptions[0].values : false;
  }

  const getSelectableVariantByColorOption = colorOptionValue => {
    return product?.variants
    .find(variant => variant.meta_data
      .find(md => colorMetaNameRegex
        .test(md.key) && md.value === colorOptionValue))
  }

  const selectColorOption = colorOptionValue => {
    setSelectedColor(colorOptionValue);
    if(colorOptionValue) {
      const selectableVariant = getSelectableVariantByColorOption(colorOptionValue);
      setSelectedVariant(selectableVariant)
    }
  }

  useEffect(() => {
    const colorOptions = getColorOptions();
    selectColorOption(!!colorOptions ? colorOptions[0] : false)
  }, [])

  return (
    <div className={classnames("product-card d-flex flex-md-column", className)}>
      <div onClick={onClick} className="product-card_img-wrapper overflow-hidden rounded-2">
        <img src={!!selectedVariant && !!selectedVariant?.image?.src ? selectedVariant?.image?.src : product.images[0].src} alt="product" />
      </div>
      {product.variants.length > 1 && getColorOptions() ?
        <div className="product-card_variants">
          {getColorOptions()/*.slice(0, maxColorOptionsToShow)*/.map((colorOption, i) => (
            <div
              className={selectedColor === colorOption ? "active" : ""}
              style={{ backgroundImage: `url(${getSelectableVariantByColorOption(colorOption)?.image?.src})` }}
              onClick={() => {
                selectColorOption(colorOption)
              }}
            ></div>
          ))}
          {getColorOptions().length > maxColorOptionsToShow
            ? <div
                className="more-items"
                onClick={onClick}
              >{'+' + (getColorOptions().length - maxColorOptionsToShow)}</div>
            : ''
          }
        </div>
        : ""
      }
      <div onClick={onClick} className="d-flex flex-column product-card_details ms-2">
        <span className="fw-bolder mb-2">
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
