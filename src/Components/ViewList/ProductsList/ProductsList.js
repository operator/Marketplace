import React, { useContext } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import classnames from 'classnames';

import './ProductsList.css'
import APIContext from '../../../Contexts/APIContext';
import ProductCard from '../../ProductCard';
import Loader from '../../Loader';
import ProductError from '../ProductError';

const WrappedLoader = ({
  className
}) => {
  return <div className={classnames("d-flex justify-content-center align-items-center", className)}>
    <Loader />
  </div>
}

const ProductsList = () => {
  const { products, loading, loadMoreProducts, hasMoreProducts, getProducts } = useContext(APIContext);
  return (loading ? <WrappedLoader className="mt-5 pt-5" /> :
    <InfiniteScroll
      dataLength={products.length}
      hasMore={hasMoreProducts}
      loader={<WrappedLoader className="mb-5" />}
      next={loadMoreProducts}
    >
      {!products.length && !loading && <ProductError
           message="Sorry, there are no results for this Query!"
           refresh={() => getProducts({
             search: ''
           })}
          />}
        <div className="row gy-5 gx-0 flex-wrap justify-content-between">
          {products.map((product, index) => <ProductCard key={index} product={product} />)}
        </div>
    </InfiniteScroll>
  );
};
export default ProductsList
