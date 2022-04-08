import React, { useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import './styles.scss';
import API from '../../../services/api';
import CheckBoxGroup from '../../CheckBoxGroup';

const FilterBrand = ({
  changeBrandsFilterBar
}) => {
  const [brands, setBrands] = useState([]);
  const [fn, setFn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const getBrands = async (search) => {
    setFn(true);
    try {
      setLoading(true);
      const { data } = await API.get('/api/brand/list', { search });
      setBrands(data.value);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  const onChangeHandler = useCallback((values) => {
    changeBrandsFilterBar(values);
  }, [changeBrandsFilterBar])

  if (!fn) {
    getBrands();
  }

  if(loading) {
    return <span>Loading...</span>
  }

  return (
    <CheckBoxGroup
      options={brands.map((brand) => ({
        label: brand?.vendor || brand,
        value: brand?.vendor || brand,
      }))}
      onChange={onChangeHandler}
      value={searchParams.getAll('brand[]').map(brand => ({
        label: brand,
        value: brand
      }))}
    />
  );
};

export default FilterBrand;

FilterBrand.defaultProps = {
  changeBrandsFilterBar: () => {}
}

FilterBrand.propTypes = {
  changeBrandsFilterBar: PropTypes.func
}
