/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

import Header from '../../Components/Header/Header';
import ProductDetailsView from '../../Components/ProductDetailsView/ProductDetailsView';
import APIProvider from '../../Contexts/APIContext';
import API from '../../services/api';
import queryString from 'query-string';

function getQueryString(_url) {
  const url = new URL(_url);
  return queryString.parse(url.search) || {};
}

const ProductDetails = () => {
  sessionStorage.removeItem('productID');
  let productDetails = {};
  const queryStrings = getQueryString(window.location.href);

  if (sessionStorage.productDetails === undefined) {
    sessionStorage.productID = queryStrings.product;
  } else {
    productDetails = JSON.parse(sessionStorage.productDetails);
  }
  const [product, setProduct] = useState(productDetails);
  const [products, setProducts] = useState([]);
  const [productLoading, setProductLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(true);
  const [searchParams, setParams] = useSearchParams();
  const [isRandom, setIsRandom] = useState(false);
 
  const getProducts = async (filters = {}) => {
    const { data } = await API.get('/api/products', { ...filters });
    setProducts(data.value);
    setProductsLoading(false);
  };

  const getProductByID = useCallback(async() => {
    setProductLoading(true)
    API.get('/api/product', {
      productID: searchParams.get('product'),
    }).then((response) => {
      const productData = response.data.value;
      setProduct(productData)
      setProductLoading(false)
      getProducts({ search: productData.title });
    });
  }, []);

  const getRandomProduct = useCallback(async() => {
    try {
      setProductLoading(true);
      const { data: { product } } = await API.get('/api/product/random');
      setProduct(product);
      getProducts({ search: product.title });
      setParams({
        product: product.productID
      });
      setIsRandom(true);
    } catch(error) {
    } finally {
      setProductLoading(false);
    }
  }, []);

  useEffect(() => {
    if(searchParams.get('product')) {
      getProductByID();
    } else {
      getRandomProduct();
    }
  }, [getProductByID, getRandomProduct])

  return (
    <div className="main">
      <APIProvider.Provider
        value={{
          products: products,
          product: product,
          loadingProducts: productsLoading,
          loadingProduct: productLoading,
          getProducts: getProducts,
          isRandomProduct: isRandom
        }}
      >
        <Header />
        <ProductDetailsView />
      </APIProvider.Provider>
    </div>
  );
}

export default ProductDetails;
