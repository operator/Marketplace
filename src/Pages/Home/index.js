/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import { Link } from 'react-router-dom';

import { AiOutlineInfoCircle } from "react-icons/ai";
import { OverlayTrigger, Popover, Placeholder } from "react-bootstrap";

import "./styles.scss";
import API from "../../services/api";
import ProductCard from "../../Components/ProductCard";
import ProductCardLoader from "../../Components/ProductCardLoader";
import PageLayout from "../../Layout/Page";
import BrandCard, { BrandCardLoader } from "../../Components/BrandCard";
import useFeauredMerchants from "../../hooks/useFeaturedMerchants";
import Img from '../../Components/Img';

const BillboardLoader = () => {
  return (
    <Placeholder className="mt-4" xs={12} as="div" bg="dark" animation="glow">
      <Placeholder className="carousel-img" xs={12} />
    </Placeholder>
  );
};

const BillBoardItem = ({
  backgroundUrl,
  imageUrl,
  name,
  CTALink,
  logoUrl,
  tagLine,
  shopUrl,
}) => {
  const popover = (
    <Popover id="popover-basic">
      <Popover.Body>
        Want to be featured on the Operator Marketplace?{" "}
        <a
          href="https://www.notion.so/operatorlabs/Be-Featured-In-Our-Marketplace-293dc7b12b8941dbb21d70c19eb5ffa3"
          target="_blank"
          rel="noreferrer"
        >
          Learn more
        </a>
      </Popover.Body>
    </Popover>
  );

  return (
    <>
      <div
        className="p-3 py-5 p-md-5 d-flex align-items-center carousel-img position-relative"
        style={{
          backgroundImage: `url(${backgroundUrl})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      >
        <div className="row px-md-4 w-100">
          <div className="col-8 col-md-5 d-flex flex-column justify-content-center align-items-start">
            {logoUrl && (
              <Img
                src={logoUrl}
                className="brand-logo mb-3 mb-md-5"
                alt="brand logo"
              />
            )}
            <div>
              <h2 className="mb-4 brand-tagline font-display display-md-5">
                {tagLine}
              </h2>
              {shopUrl && (
                <a
                  href={shopUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary col-12 col-md-8 py-2"
                >
                  Shop {name} Now
                </a>
              )}
            </div>
          </div>
          <div className="col-4 col-md-6 offset-md-1 d-flex justify-content-end">
            {imageUrl && <Img src={imageUrl} alt={name} className="img-fluid brand-img" /> }
          </div>
        </div>
      </div>
      <p className="text-end mb-5 mb-md-3 sponsored-by">
        Sponsored by{' '}
        <a href={CTALink} target="_blank" rel="noreferrer">
          {name}
        </a>
        <OverlayTrigger rootClose overlay={popover} trigger="click">
          <button className="p-0 border-0 bg-transparent ms-1">
            <AiOutlineInfoCircle />
          </button>
        </OverlayTrigger>
      </p>
    </>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [productLoadError, setProductLoadError] = useState(null);
  const { loading: featuredLoading, merchants: brands } = useFeauredMerchants();
  const getNewArrivalProducts = async () => {
    try {
      setLoading(true);
      const { data } = await API.get("/api/products", {
        limit: 12,
        order_by: "DESC",
        sort_by: "productCreatedAt",
      });
      setLoading(false);
      setProducts(data.value);
    } catch (error) {
      setProductLoadError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getNewArrivalProducts();
  }, []);

  return (
    <PageLayout className="home-page">
      <>
        {featuredLoading ? (
          <BillboardLoader />
        ) : (
          <Carousel interval={null} variant="dark" className="mt-4" controls={false}>
            {brands
              .slice(0, 3)
              .map(
                ({
                  FeaturedProductImage,
                  Domain,
                  BillboardTagline,
                  Logo,
                  BillboardImage,
                  Name,
                  FeaturedProductURL,
                }) => (
                  <Carousel.Item>
                    <BillBoardItem
                      name={Name}
                      backgroundUrl={BillboardImage?.url}
                      imageUrl={FeaturedProductImage?.url}
                      CTALink={Domain}
                      logoUrl={Logo?.url}
                      tagLine={BillboardTagline}
                      shopUrl={FeaturedProductURL}
                    />
                  </Carousel.Item>
                )
              )}
          </Carousel>
        )}

        <section>
          <div className="d-flex align-items-center justify-content-between">
            <h2>Today's Top Sellers</h2>
            <Link to="/top-sellers" className="text-decoration-none link-arrow">
              View more
            </Link>
          </div>
          <div className="row g-0 flex-wrap justify-content-between">
            {loading &&
              !products.length &&
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="col-12 col-md-4 col-lg-2">
                  <ProductCardLoader />
                </div>
              ))}
            {products.slice(6, 12).map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </section>
        <div className="mt-5">
          <div className="d-flex align-items-center justify-content-between">
            <h2>New Arrivals</h2>
            <Link
              to="/products?order_by=DESC&sort_by=productCreatedAt"
              className="text-decoration-none link-arrow"
            >
              View more
            </Link>
          </div>
          <div className="row g-0 flex-wrap justify-content-between">
            {loading &&
              !products.length &&
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="col-12 col-md-4 col-lg-2">
                  <ProductCardLoader />
                </div>
              ))}
            {products.slice(0, 6).map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
        <section className="mb-5">
          <div className="d-flex align-items-center justify-content-between">
            <h2>Our Favorite Brands</h2>
            <Link to="/our-favorites" className="text-decoration-none link-arrow">
              View more
            </Link>
          </div>
          <div className="row g-5 flex-wrap">
            {featuredLoading &&
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="col-12 col-md-4">
                  <BrandCardLoader />
                </div>
              ))}
            {brands
              .slice(0, 3)
              .map(({ Logo, BillboardImage, products, Name }, key) => (
                <div key={key} className="col-12 col-md-4">
                  <BrandCard
                    logo={Logo.url}
                    bgUrl={BillboardImage.url}
                    products={products}
                    name={Name}
                  />
                </div>
              ))}
          </div>
        </section>
      </>
    </PageLayout>
  );
};

export default Home;
