import { useNavigate } from "react-router-dom";
import { Link, NavLink } from "react-router-dom";

import marketPlaceLogo from "../../Assets/Marketplace.svg";
import byOperatorLogo from "../../Assets/byOperator.svg";
import SearchInput from "../../Components/Header/SearchInput";
import Footer from "../../Components/Footer";

const navElements = [
  {
    text: "New Arrivals",
    url: "/products?order_by=DESC&sort_by=productCreatedAt",
  },
  {
    text: "Top Sellers",
    url: "/top-sellers",
  },
  {
    text: "Our Favorites",
    url: "/our-favorites",
  },
  {
    text: "Surprise Me",
    url: "/product-details",
  },
  {
    text: "Browse All",
    url: "/products",
  },
];
const PageLayout = ({ children }) => {
  const navigate = useNavigate();
  const onSearchSubmit = (value) => {
    navigate(`/products?search=${value}`);
  };
  return (
    <>
      <div className="container pt-4">
        <div className="d-flex align-items-center justify-content-center flex-column logo">
          <div className="mb-3">
            <Link to="/">
              <img src={marketPlaceLogo} alt="market place logo" />
            </Link>
          </div>
          <img src={byOperatorLogo} alt="Operator" />
        </div>
        <hr />
        <ul className="nav justify-content-center mb-4">
          {navElements.map(({ text, url }) => (
            <li key={text} className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  `nav-link ${isActive && "fw-bold"}`
                }
                to={url}
              >
                {text}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="d-flex justify-content-center">
          <SearchInput onSubmit={onSearchSubmit} />
        </div>
        {children}
      </div>
      <Footer />
    </>
  );
};

export default PageLayout;
