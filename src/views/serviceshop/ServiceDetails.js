import React, { Fragment, useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {  Button} from "@mui/material";
import Loader from "../layouts/Loader";
import ListReviews from '../reviews/ListReviews';
import { useDispatch, useSelector } from "react-redux";
import { getoneServiceDetails, clearErrors } from "../../actions/serviceActions";
import { saddItemToCart } from '../../actions/cartActions';
import { toast } from "react-toastify";






const ServiceDetails = () => {



  // const handleShow = () => setShow(true);
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  let { id } = useParams();

  const { loading, error, service } = useSelector(
    (state) => state.serviceDetails
  );


    // const { error: reviewError, success } = useSelector(state => state.newReview)


  useEffect(() => {
    dispatch(getoneServiceDetails(id));

    if (error) {
      dispatch(clearErrors());
    }

   



  


  }, [dispatch, error, id]);

 

  const notifys = (message = "") =>
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
  });

  const saddToCart = () => {

    dispatch(saddItemToCart(id));

    notifys('Service Added')

}




  



  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          {/* <MetaData title={product.name} /> */}

          <div className="row d-flex justify-content-around">
            <div className="col-12 col-lg-5 img-fluid" id="product_image">
              <Carousel pause="hover">
                {service.images &&
                  service.images.map((image) => (
                    <Carousel.Item key={image.public_id}>
                      <img
                        className="d-block w-100"
                        height="500px"
                        width="500px"
                        src={image.url}
                        alt={service.title}
                      />
                    </Carousel.Item>
                  ))}
              </Carousel>
            </div>

            <div className="col-12 col-lg-5 mt-5">
              <h3>{service.name}</h3>

              <p id="product_id">Product # {service._id}</p>

              <hr />

             
              {/* <Rating name="half-rating" defaultValue={`${(product.ratings / 5) * 100}`} precision={2.5} readOnly/> */}
              

              {/* <span id="no_of_reviews">({product.numOfReviews} Reviews)</span> */}

              <hr />

              <p id="product_price">${service.price}</p>

              <div className="stockCounter d-inline">
                <span className="btn btn-danger minus" >
                  -
                </span>

                <input
                  type="number"
                  className="form-control count d-inline"
                  value={quantity}
                  readOnly
                />

                <span className="btn btn-primary plus" >
                  +
                </span>
              </div>

              <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4" 
             onClick={saddToCart}>Add to Services</button>
           
              <hr />

              <p>
                Status:{" "}
                <span
                  id="stock_status"
                  className={ "greenColor"}
                >
                 Available
                </span>
              </p>

              <hr />

              <h4 className="mt-2">Description:</h4>

              <p>{service.description}</p>

              <hr />

              <p id="product_seller mb-3">
                Sold by: <strong>Seller</strong>
              </p>

            </div>
          </div>
       
        </Fragment>
      )}
    </Fragment>
  );
};
export default ServiceDetails;