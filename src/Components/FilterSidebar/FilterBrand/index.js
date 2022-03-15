import React, { useState } from 'react';

import './styles.scss';
import API from '../../../services/api';
import CheckBoxGroup from '../../CheckBoxGroup';

const FilterBrand = (props) => {

  const [brands, setBrands] = useState([])
  const [fn, setFn] = useState(false)

  const getBrands = async search => {

    setFn(true)

    try {
      const { data } = await API.get('/api/brand/list', { search });
      setBrands(data.value)

    } catch (error) {
      console.log(error.message)
    }

  }

  if (!fn) {
    getBrands()
  }

  return (
    <CheckBoxGroup
      options={brands.map((brand) => ({
        label: brand,
        value: brand
      }))}
      onChange={props.changeBrandsFilterBar}
    />
  )
}

export default FilterBrand;
