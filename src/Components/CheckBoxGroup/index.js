
import { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import PropTypes from 'prop-types';

const CheckBoxGroup = ({
  options,
  onChange
}) => {
  const [selected, setSelected] = useState([]);

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

  return <Form>
    {options.map(({ label, value }) => <Form.Check
      className="mb-3"
      type={'checkbox'}
      label={label}
      id={value}
      onClick={() => onCheck(value)}
      key={value}
    />)}
  </Form>
};

export default CheckBoxGroup;

CheckBoxGroup.propTypes = {
  options: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)),
  onChange: PropTypes.func
}

CheckBoxGroup.defaultProps = {
  options: [],
  onChange: () => { }
}
