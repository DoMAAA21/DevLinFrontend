import React, { Fragment, useEffect } from 'react'

import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';


import MetaData from '../layouts/MetaData'

import CheckoutSteps from './checkoutSteps'



// import { useAlert } from 'react-alert'
import { toast } from "react-toastify";

import { useDispatch, useSelector } from 'react-redux'

import { createOrder, clearErrors } from '../../actions/orderActions'

import { clearCart } from '../../actions/cartActions';

const Payment = () => {



    // const alert = useAlert();
    const notify = (message = "") =>
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });

    const dispatch = useDispatch();

    let navigate = useNavigate();
    


    const { user } = useSelector(state => state.auth)

    const { cartItems, shippingInfo } = useSelector(state => state.cart);

    const { error } = useSelector(state => state.newOrder)



    useEffect(() => {



        if (error) {

            notify(error)

            dispatch(clearErrors())

        }



    }, [dispatch,error])



    const order = {

        orderItems: cartItems,

        shippingInfo

    }



    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));

    if (orderInfo) {

        order.itemsPrice = orderInfo.itemsPrice

        order.shippingPrice = orderInfo.shippingPrice

        order.taxPrice = orderInfo.taxPrice

        order.totalPrice = orderInfo.totalPrice

    }
    const cookie = new Cookies();


    const submitHandler = async (e) => {

       
        e.preventDefault();

        document.querySelector('#pay_btn').disabled = true;

        order.paymentInfo = {

            id: 'pi_1DpdYh2eZvKYlo2CYIynhU32',

            status: 'succeeded'

        }

        order.userid =  cookie.get('userid')


        let cart = localStorage.getItem("cartItems");
        let shipinfo = localStorage.getItem("shippingInfo");
        sessionStorage.setItem("cart", cart);
        sessionStorage.setItem("shipinfo", shipinfo);
        // let citems = sessionStorage.getItem("cart");
    //    console.log(citems.product)
        dispatch(createOrder(order))
        dispatch(clearCart())
        
        localStorage.removeItem('cartItems');
        localStorage.removeItem('shippingInfo');
        // sessionStorage.clear();
        navigate('/success')



    }



    return (

        <Fragment>

            <MetaData title={'Payment'} />



            <CheckoutSteps shipping confirmOrder payment />



            <div className="row wrapper">

                <div className="col-10 col-lg-5">

                    <form className="shadow-lg" onSubmit={submitHandler}>

                        <h1 className="mb-4">Card Info</h1>

                        <div className="form-group">

                            <label htmlFor="card_num_field">Card Number</label>

                            <input

                                type="text"

                                id="card_num_field"

                                className="form-control"



                            />

                        </div>



                        <div className="form-group">

                            <label htmlFor="card_exp_field">Card Expiry</label>

                            <input

                                type="text"

                                id="card_exp_field"

                                className="form-control"



                            />

                        </div>



                        <div className="form-group">

                            <label htmlFor="card_cvc_field">Card CVC</label>

                            <input

                                type="text"

                                id="card_cvc_field"

                                className="form-control"



                            />

                        </div>





                        <button

                            id="pay_btn"

                            type="submit"

                            className="btn btn-block py-3"

                        >

                            Pay {` - ${orderInfo && orderInfo.totalPrice}`}

                        </button>



                    </form>

                </div>

            </div>



        </Fragment>

    )

}



export default Payment

