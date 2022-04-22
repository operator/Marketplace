/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Placeholder } from 'react-bootstrap';
import classnames from 'classnames';

import './styles.scss';
import CheckBoxGroup from '../../CheckBoxGroup';
import useBrands from '../../../hooks/useBrands';

const CheckBoxLoader = ({ className, xs }) => {
  return (
    <div className={classnames('d-flex', className)}>
      <Placeholder xs="1" className="me-2" />
      <Placeholder xs={xs} />
    </div>
  );
};

export const CheckBoxGroupLoader = () => {
  return (
    <Placeholder bg="dark" animation="glow">
      {[10, 11, 8, 10, 5].map((xs) => (
        <CheckBoxLoader key={xs} className="mb-2" xs={xs} />
      ))}
    </Placeholder>
  );
};

const FilterBrand = ({ changeBrandsFilterBar }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [value, setValue] = useState(searchParams.getAll('brand[]'));
  const { loadNextPage, loading, brands, hasMore } = useBrands();

  const onChangeHandler = useCallback(
    (values) => {
      changeBrandsFilterBar(values);
      setValue(values);
      searchParams.delete('brand[]');
      values.forEach((value) => {
        searchParams.append('brand[]', value);
      });
      navigate(`${location.pathname}?${searchParams.toString()}`);
    },
    [changeBrandsFilterBar]
  );

  return (
    <>
      <CheckBoxGroup
        options={brands.map((brand) => ({
          label: brand?.vendor || brand,
          value: brand?.vendor || brand,
        }))}
        onChange={onChangeHandler}
        value={value}
      />
      {loading && <CheckBoxGroupLoader />}
      {hasMore && (
        <button onClick={loadNextPage} className="btn p-0 shadow-none">
          Load more
        </button>
      )}
    </>
  );
};

export default FilterBrand;

FilterBrand.defaultProps = {
  changeBrandsFilterBar: () => {},
};

FilterBrand.propTypes = {
  changeBrandsFilterBar: PropTypes.func,
};
