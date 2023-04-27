import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../layouts/MetaData";
import Service from "./Service";
import Loader from "../layouts/Loader";
import { useParams } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getServices } from "../../actions/serviceActions";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider, { Range, createSliderWithTooltip } from "rc-slider";

import "rc-slider/assets/index.css";



const Home = ({ match }) => {
  const dispatch = useDispatch();

  const Range = createSliderWithTooltip(Slider.Range);
  const [price, setPrice] = useState([1, 1000]);
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);



  const {
    loading,
    services,
    error,
    servicesCount,
    resPerPage,
    filteredServicesCount,
  } = useSelector((state) => state.services);

  let { keyword } = useParams();

  useEffect(() => {
    dispatch(getServices(keyword, currentPage, price, category));
    if (error) {
      return alert.error(error);
    }
  }, [dispatch, alert, error, keyword, price, currentPage, category]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  let count = servicesCount;
  if (keyword) {
    count = filteredServicesCount;
  }

  console.log(keyword);



  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Devlin Shop"} />
          <h1 id="products_heading">Our Services</h1>
          <section id="services" className="container mt-5">
            {/* <div className="row">
                        {products && products.map(product => (
                            <Product key={product._id} product={product} />
                        ))}
                    </div> */}
            <div className="row">
              {keyword ? (
                <Fragment>
                  <div className="col-6 col-md-3 mt-5 mb-5">
                    <div className="px-5">
                      <Range
                        marks={{
                          1: `$1`,
                          1000: `$1000`,
                        }}
                        min={1}
                        max={1000}
                        defaultValue={[1, 1000]}
                        tipFormatter={(value) => `$${value}`}
                        tipProps={{
                          placement: "top",
                          visible: true,
                        }}
                        value={price}
                        onChange={(price) => setPrice(price)}
                      />
                      <hr className="my-5" />
                      <div className="mt-5">
                        <h4 className="mb-3">Categories</h4>
                        <ul className="pl-0">
                          {categories.map((category) => (
                            <li
                              style={{
                                cursor: "pointer",
                                listStyleType: "none",
                              }}
                              key={category}
                              onClick={() => setCategory(category)}
                            >
                              {category}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="col-6 col-md-9">
                    <div className="row">
                      {services.map((service) => (
                        <Service key={service._id} service={service} col={4} />
                      ))}
                    </div>
                  </div>
                </Fragment>
              ) : (
                services.map((service) => (
                
                  <Service key={service._id} service={service} col={3} />
                  
                ))
              )}
            </div>
          </section>
          {resPerPage <= count && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={servicesCount}
                onChange={setCurrentPageNo}
                nextPageText={"Next"}
                prevPageText={"Prev"}
                firstPageText={"First"}
                lastPageText={"Last"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;



