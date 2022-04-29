/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";

import { AiOutlineInfoCircle } from "react-icons/ai";
import { OverlayTrigger, Popover, Placeholder } from "react-bootstrap";

import "./styles.scss";
import API from "../../services/api";
import ProductCard from "../../Components/ProductCard";
import ProductCardLoader from "../../Components/ProductCardLoader";
import PageLayout from "../../Layout/Page";
import BrandCard, { BrandCardLoader } from "../../Components/BrandCard";
import useFeauredMerchants from "../../hooks/useFeaturedMerchants";

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
        className="p-3 py-5 p-md-5 d-flex align-items-center carousel-img"
        style={{
          backgroundImage: `url(${backgroundUrl})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="row px-md-4 w-100">
          <div className="col-8 col-md-5 d-flex flex-column justify-content-center align-items-start">
            <img
              src={logoUrl}
              className="brand-logo mb-3 mb-md-5"
              alt="brand logo"
            />
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
            <img src={imageUrl} alt={name} className="img-fluid brand-img" />
          </div>
        </div>
      </div>
      <p className="text-end mb-5 mb-md-3">
        Sponsored by{" "}
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
    <PageLayout>
      <>
        {featuredLoading ? (
          <BillboardLoader />
        ) : (
          <Carousel variant="dark" className="mt-4" controls={false}>
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

        <div className="mt-4">
          <div className="d-flex align-items-center justify-content-between">
            <h2>Today's Top Sellers</h2>
            <a href="#" className="text-decoration-none link-arrow">
              View more
            </a>
          </div>
          <div className="row g-3">
            {loading &&
              !products.length &&
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="col-12 col-md-4 col-lg-2">
                  <ProductCardLoader />
                </div>
              ))}
            {products.slice(6, 12).map((product, index) => (
              <div key={index} className="col-12 col-md-4 col-lg-2">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <div className="d-flex align-items-center justify-content-between">
            <h2>New Arrivals</h2>
            <a
              href="/products?order_by=DESC&sort_by=productCreatedAt"
              className="text-decoration-none link-arrow"
            >
              View more
            </a>
          </div>
          <div className="row g-3">
            {loading &&
              !products.length &&
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="col-12 col-md-4 col-lg-2">
                  <ProductCardLoader />
                </div>
              ))}
            {products.slice(0, 6).map((product, index) => (
              <div key={index} className="col-12 col-md-4 col-lg-2">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 mb-5">
          <div className="d-flex align-items-center justify-content-between">
            <h2>Our Favorite Brands</h2>
            <a href="#" className="text-decoration-none link-arrow">
              View more
            </a>
          </div>
          <div className="row g-5">
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
        </div>
      </>
    </PageLayout>
  );
};

export default Home;
