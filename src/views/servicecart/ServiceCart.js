import React, { Fragment } from 'react'

import { Link, useNavigate } from 'react-router-dom'



// import MetaData from '../layout/MetaData'

import { useDispatch, useSelector } from 'react-redux'
import { Edit, Delete } from '@mui/icons-material';
import { toast } from "react-toastify";

import { addItemToCart,sremoveItemFromCart } from '../../actions/cartActions'

// import { addItemToCart, removeItemFromCart } from '../../actions/cartActions'

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


const ServiceCart = () => {

    const dispatch = useDispatch();

    const { scartItems } = useSelector(state => state.scart)
    console.log(scartItems)

    const removeCartItemHandler = (id) => {

        dispatch(sremoveItemFromCart(id))
        notifys('Service Removed')

    }
    let navigate = useNavigate();

    const checkoutHandler = () => {

        navigate('/login?redirect=serviceshipping')

    }

    return (

        <Fragment>
{/* 
            <MetaData title={'Your Cart'} /> */}

            {scartItems.length === 0 ? <h2 className="mt-5">Your Service Cart is Empty</h2> : (

                <Fragment>

                    <h2 className="mt-5">Your Service Cart: <b>{scartItems.length} items</b></h2>



                    <div className="row d-flex justify-content-between">

                        <div className="col-12 col-lg-8">

                            {scartItems.map(sitem => (

                                <Fragment>

                                    <hr />

                                    <div className="cart-item" >

                                        <div className="row">

                                            <div className="col-4 col-lg-3">

                                                <img src={sitem.image} alt="Laptop" height="90" width="115" />

                                            </div>



                                            <div className="col-5 col-lg-3">

                                                <Link to={`/product/${sitem.service}`}>{sitem.name}</Link>

                                            </div>

                                            <div className="col-4 col-lg-2 mt-4 mt-lg-0">

                                                <p id="card_item_price">${sitem.price}</p>

                                            </div>





                                            <div className="col-4 col-lg-1 mt-4 mt-lg-0">

                                                {/* <i id="delete_cart_item" className="fa fa-trash btn btn-danger" onClick={() => removeCartItemHandler(item.product)} ></i> */}



                                                <button className="btn btn-danger py-1 px-2 ml-2" onClick={() =>removeCartItemHandler(sitem.service)}>

                                                            <Delete/>

                                                </button>
                                                {/* <i id="delete_cart_item" className="fa fa-trash btn btn-danger" ></i> */}

                                            </div>



                                        </div>

                                    </div>

                                    <hr />

                                </Fragment>

                            ))}



                        </div>



                        <div className="col-12 col-lg-3 my-4">

                            <div id="order_summary">

                                <h4>Services Summary</h4>

                                <hr />

                               
                                <p>Subtotal:  <span className="order-summary-values">{scartItems.reduce((acc, item) => (acc + Number(1)), 0)} (Units)</span></p>

                                <p>Est. total: <span className="order-summary-values">${scartItems.reduce((acc, item) => acc + 1 * item.price, 0).toFixed(2)}</span></p>


                                   
                            

                                <hr />

                                 <button id="checkout_btn" className="btn btn-primary btn-block" onClick={checkoutHandler}>Proceed</button>

                                {/* <button id="checkout_btn" className="btn btn-primary btn-block" >Check out</button> */}

                            </div>

                        </div>



                    </div>

                </Fragment>

            )}

        </Fragment>

    )

}



export default ServiceCart