
import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

import './style.scss'

const CheckBoxGroup = ({
  options,
  value = [],
  onChange
}) => {
  const [selected, setSelected] = useState(value);

  useEffect(() => {
    onChange(selected)
  }, [selected, onChange]);

  const onCheck = (value) => {
    if(!value) return;
    if(selected.indexOf(value) !== -1) {
      setSelected(selected.filter(option => option !== value))
    } else {
      setSelected([
        ...selected,
        value
      ])
    }
  }

  return <Form className="check-box-group">
    {options.map(({ label, value }) => <Form.Check
      className="mb-3"
      type={'checkbox'}
      label={label}
      id={value}
      onClick={() => onCheck(value)}
      key={value}
      checked={selected.find(option => option === value)}
    />)}
  </Form>
};

export default CheckBoxGroup;

CheckBoxGroup.propTypes = {
  options: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  onChange: PropTypes.func,
  value: PropTypes.arrayOf(PropTypes.any)
}

CheckBoxGroup.defaultProps = {
  options: [],
  value: [],
  onChange: () => { }
}
