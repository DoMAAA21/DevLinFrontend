import axios from 'axios'


import { ADD_TO_CART, CLEAR_CART, REMOVE_ITEM_CART ,SAVE_SHIPPING_INFO,
    SADD_TO_CART, SCLEAR_CART, SREMOVE_ITEM_CART ,SSAVE_SHIPPING_INFO



} from '../constants/cartConstants';

import {CREATE_ORDER_REQUEST,CREATE_ORDER_SUCCESS,CREATE_ORDER_FAIL} from  '../constants/orderConstants';


export const  clearCart = () => async (dispatch) =>
{
    dispatch({
        type: CLEAR_CART,
    })
}


export const saveShippingInfo = (data) => async (dispatch) => {



    dispatch({

        type: SAVE_SHIPPING_INFO,

        payload: data

    })



    localStorage.setItem('shippingInfo', JSON.stringify(data))



}

export const removeItemFromCart = (id) => async (dispatch, getState) => {



    dispatch({

        type: REMOVE_ITEM_CART,

        payload: id

    })



    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))



}



export const addItemToCart = (id, quantity) => async (dispatch, getState) => {

    const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/${id}`,{withCredentials:true})



    dispatch({

        type: ADD_TO_CART,

        payload: {

            product: data.product._id,

            name: data.product.name,

            price: data.product.price,

            image: data.product.images[0].url,

            stock: data.product.stock,

            quantity

        }

    })



    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}

export const saddItemToCart = (id) => async (dispatch, getState) => {

    const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/service/${id}`,{withCredentials:true})



    dispatch({

        type:  SADD_TO_CART,

        payload: {

            service: data.service._id,

            name: data.service.name,

            price: data.service.price,

            image: data.service.images[0].url,


        }

    })



    localStorage.setItem('scartItems', JSON.stringify(getState().scart.scartItems))

}

export const sremoveItemFromCart = (id) => async (dispatch, getState) => {



    dispatch({

        type: SREMOVE_ITEM_CART,

        payload: id

    })



    localStorage.setItem('scartItems', JSON.stringify(getState().scart.scartItems))



}

export const ssaveShippingInfo = (data) => async (dispatch) => {



    dispatch({

        type: SSAVE_SHIPPING_INFO,

        payload: data

    })



    localStorage.setItem('sshippingInfo', JSON.stringify(data))



}


export const createServiceOrder = (order) => async (dispatch, getState) => {


    try {



        dispatch({ type: CREATE_ORDER_REQUEST })



        const config = {

            headers: {

                'Content-Type': 'application/json'

            }

        }



        const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/serviceorder/new`, order, {withCredentials:true},config)



        dispatch({

            type: CREATE_ORDER_SUCCESS,

            payload: data

        })



    } catch (error) {

        dispatch({

            type: CREATE_ORDER_FAIL,

            payload: error.response.data.message

        })

    }

}

export const  sclearCart = () => async (dispatch) =>
{
    dispatch({
        type: SCLEAR_CART,
    })
}
