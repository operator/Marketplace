/* eslint-disable jsx-a11y/alt-text */
const Img = (props) => {
  return <img {...props} onError={(event) => event.target.style.display = 'none'} />
};

export default Img;
