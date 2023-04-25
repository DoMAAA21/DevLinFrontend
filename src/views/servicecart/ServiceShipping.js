import React, { Fragment, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { countries } from 'countries-list'
import Cookies from 'universal-cookie';


import MetaData from '../layouts/MetaData'

// import CheckoutSteps from './checkoutSteps';

import { useDispatch, useSelector } from 'react-redux'

import { saveShippingInfo } from '../../actions/cartActions'

import { createServiceOrder } from '../../actions/cartActions';
import { sclearCart } from '../../actions/cartActions';

const ServiceShipping = () => {



    const countriesList = Object.values(countries)



    const { sshippingInfo } = useSelector(state => state.scart)



    const [address, setAddress] = useState(sshippingInfo.address)

    const [city, setCity] = useState(sshippingInfo.city)

    const [postalCode, setPostalCode] = useState(sshippingInfo.postalCode)

    const [phoneNo, setPhoneNo] = useState(sshippingInfo.phoneNo)

    const [country, setCountry] = useState(sshippingInfo.country)

    const { scartItems } = useSelector(state => state.scart);

    const dispatch = useDispatch();

    let navigate = useNavigate();

   

    const submitHandler = (e) => {

        e.preventDefault()

        const order = {

            orderItems: scartItems,
    
            shippingInfo:{
                address : address,
                city : city,
                phoneNo : phoneNo,
                postalCode : postalCode,
                country : country
    
    
            }
    
        }


        const itemsPrice = scartItems.reduce((acc, item) => acc + item.price * 1, 0)

        const shippingPrice = itemsPrice > 200 ? 0 : 25
    
        const taxPrice = Number((0.05 * itemsPrice).toFixed(2))
    
        const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2)
        order.itemsPrice =  itemsPrice

        order.shippingPrice = shippingPrice

        order.taxPrice =  taxPrice

        order.totalPrice = totalPrice
        order.paymentInfo = {

            id: 'pi_1DpdYh2eZvKYlo2CYIynhU32',

            status: 'succeeded'

        }

        const cookie = new Cookies();
        order.userid =  cookie.get('userid')
        console.log(order)
        dispatch(createServiceOrder(order))
        dispatch(sclearCart())
        localStorage.removeItem('scartItems');
       
        navigate('/servicesuccess')
        


    }



    return (

        <Fragment>



            <MetaData title={'Shipping Info'} />



            {/* <CheckoutSteps shipping /> */}



            <div className="row wrapper">

                <div className="col-10 col-lg-5">

                    <form className="shadow-lg" onSubmit={submitHandler}>

                        <h1 className="mb-4">Address Information</h1>

                        <div className="form-group">

                            <label htmlFor="address_field">Address</label>

                            <input

                                type="text"

                                id="address_field"

                                className="form-control"

                                value={address}

                                onChange={(e) => setAddress(e.target.value)}

                                required

                            />

                        </div>



                        <div className="form-group">

                            <label htmlFor="city_field">City</label>

                            <input

                                type="text"

                                id="city_field"

                                className="form-control"

                                value={city}

                                onChange={(e) => setCity(e.target.value)}

                                required

                            />

                        </div>



                        <div className="form-group">

                            <label htmlFor="phone_field">Phone No</label>

                            <input

                                type="phone"

                                id="phone_field"

                                className="form-control"

                                value={phoneNo}

                                onChange={(e) => setPhoneNo(e.target.value)}

                                required

                            />

                        </div>



                        <div className="form-group">

                            <label htmlFor="postal_code_field">Postal Code</label>

                            <input

                                type="number"

                                id="postal_code_field"

                                className="form-control"

                                value={postalCode}

                                onChange={(e) => setPostalCode(e.target.value)}

                                required

                            />

                        </div>



                        <div className="form-group">

                            <label htmlFor="country_field">Country</label>

                            <select

                                id="country_field"

                                className="form-control"

                                value={country}

                                onChange={(e) => setCountry(e.target.value)}

                                required

                            >



                                {countriesList.map(country => (

                                    <option key={country.name} value={country.name}>

                                        {country.name}

                                    </option>

                                ))}



                            </select>

                        </div>



                        <button

                            id="shipping_btn"

                            type="submit"

                            className="btn btn-block py-3"

                        >

                            CONTINUE

                            </button>

                    </form>

                </div>

            </div>



        </Fragment>

    )

}



export default ServiceShipping

