import React, { Fragment, useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { useParams } from "react-router-dom";
import {  Button,Rating} from "@mui/material";
import Loader from "../layouts/Loader";
import ListReviews from '../reviews/ListReviews';
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails, clearErrors,newReview, } from "../../actions/productActions";
import { addItemToCart } from '../../actions/cartActions';
import { toast } from "react-toastify";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";



const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  let { id } = useParams();

  const { loading, error, product } = useSelector(
    (state) => state.productDetails
  );

  const { user } = useSelector(state => state.auth)

const [rating, setRating] = useState(0);

    const [comment, setComment] = useState('');

    const { error: reviewError, success } = useSelector(state => state.newReview)


  useEffect(() => {
    dispatch(getProductDetails(id));

    if (error) {
      dispatch(clearErrors());
    }

    if (reviewError) {

      notifys(reviewError);

      dispatch(clearErrors())

  }



  if (success) {

      notifys('Review posted successfully')

      dispatch({ type: NEW_REVIEW_RESET })

  }


  }, [dispatch, error, id,reviewError,success]);

  const increaseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber >= product.stock) return;

    const qty = count.valueAsNumber + 1;

    setQuantity(qty);
  };

  const decreaseQty = () => {
    const count = document.querySelector(".count");

    if (count.valueAsNumber <= 1) return;

    const qty = count.valueAsNumber - 1;

    setQuantity(qty);
  };

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

  const addToCart = () => {

    dispatch(addItemToCart(id, quantity));

    notifys('Item Added to Cart')

}

function setUserRatings() {

  const stars = document.querySelectorAll('.star');



  stars.forEach((star, index) => {

      star.starValue = index + 1;



      ['click', 'mouseover', 'mouseout'].forEach(function (e) {

          star.addEventListener(e, showRatings);

      })

  })

  
  function showRatings(e) {

    stars.forEach((star, index) => {

        if (e.type === 'click') {

            if (index < this.starValue) {

                star.classList.add('orange');



                setRating(this.starValue)

            } else {

                star.classList.remove('orange')

            }

        }



        if (e.type === 'mouseover') {

            if (index < this.starValue) {

                star.classList.add('yellow');

            } else {

                star.classList.remove('yellow')

            }

        }



        if (e.type === 'mouseout') {

            star.classList.remove('yellow')

        }

    })

}


  }

  const reviewHandler = () => {

    const formData = new FormData();



    formData.set('rating', rating);

    formData.set('comment', comment);

    formData.set('productId', id);



    dispatch(newReview(formData));

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
                {product.images &&
                  product.images.map((image) => (
                    <Carousel.Item key={image.public_id}>
                      <img
                        className="d-block w-100"
                        height="500px"
                        width="500px"
                        src={image.url}
                        alt={product.title}
                      />
                    </Carousel.Item>
                  ))}
              </Carousel>
            </div>

            <div className="col-12 col-lg-5 mt-5">
              <h3>{product.name}</h3>

              <p id="product_id">Product # {product._id}</p>

              <hr />

             
              <Rating name="half-rating" defaultValue={`${product.ratings/product.numOfReviews}`} precision={2.5} readOnly/>
              

              <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>

              <hr />

              <p id="product_price">${product.price}</p>

              <div className="stockCounter d-inline">
                <span className="btn btn-danger minus" onClick={decreaseQty}>
                  -
                </span>

                <input
                  type="number"
                  className="form-control count d-inline"
                  value={quantity}
                  readOnly
                />

                <span className="btn btn-primary plus" onClick={increaseQty}>
                  +
                </span>
              </div>

              <button type="button" id="cart_btn" className="btn btn-primary d-inline ml-4" 
              disabled={product.stock === 0} onClick={addToCart}>Add to Cart</button>
              {/* <Button variant="contained" 
           size="large"
           color="success"
          
           disabled={product.stock === 0}
           onClick={addToCart}
          
           >
            Add to Cart</Button> */}
              <hr />

              <p>
                Status:{" "}
                <span
                  id="stock_status"
                  className={product.stock > 0 ? "greenColor" : "redColor"}
                >
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </span>
              </p>

              <hr />

              <h4 className="mt-2">Description:</h4>

              <p>{product.description}</p>

              <hr />

              <p id="product_seller mb-3">
                Sold by: <strong>{product.seller}</strong>
              </p>

              {/* <button
                id="review_btn"
                type="button"
                className="btn btn-primary mt-4"
                data-toggle="modal"
                data-target="#ratingModal"
              >
                Submit Your Review
              </button> */}

              

              {/* <div className="alert alert-danger mt-5" type="alert">
                Login to post your review.
              </div> */}
              {user ? <button id="review_btn" type="button" className="btn btn-primary mt-4" data-toggle="modal" data-target="#ratingModal" onClick={setUserRatings}>

Submit Your Review

</button>

:

<div className="alert alert-danger mt-5" type='alert'>Login to post your review.</div>

}

              <div className="row mt-2 mb-5">
                <div className="rating w-50">
                  <div
                    className="modal fade"
                    id="ratingModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="ratingModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="ratingModalLabel">
                            Submit Review
                          </h5>

                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>

                        <div className="modal-body">
                          <ul className="stars">
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>

                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>

                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>

                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>

                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                          </ul>

                          <textarea

name="review"

id="review" className="form-control mt-3"

value={comment}

onChange={(e) => setComment(e.target.value)}

>



</textarea>

<button className="btn my-3 float-right review-btn px-4 text-white" onClick={reviewHandler} data-dismiss="modal" aria-label="Close">Submit</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {product.reviews && product.reviews.length > 0 && (

<ListReviews reviews={product.reviews} />

)}
        </Fragment>
      )}
    </Fragment>
  );
};
export default ProductDetails;