import React, { Fragment } from 'react'

import { Link } from 'react-router-dom'

import MetaData from '../layouts/MetaData'
import { Button} from "@mui/material";
import Receipt from './Receipt';
import { PDFDownloadLink } from "@react-pdf/renderer";

const OrderSuccess = () => {
    let cart = JSON.parse(sessionStorage.getItem("cart"));;
    let shipinfo = JSON.parse(sessionStorage.getItem("shipinfo"));
    let orderinfo =  JSON.parse(sessionStorage.getItem('orderInfo'));
    let customer = JSON.parse(localStorage.getItem("user"));
    console.log(orderinfo)
    console.log(cart)
    const invoice = {
        date: new Date().toLocaleDateString(),
        customer: customer.name,
        total: orderinfo.totalPrice,
        items: cart,
        address :shipinfo.address,
        city : shipinfo.city,
        country : shipinfo.country,
        phone : shipinfo.phoneNo,
        postal : shipinfo.postalCode,
        tax: orderinfo.taxPrice,
        shipping: orderinfo.shippingPrice,
        subtotal: orderinfo.itemsPrice
      };
    return (

        <Fragment>



            <MetaData title={'Order Success'} />



            <div className="row justify-content-center">

                <div className="col-6 mt-5 text-center">

                    <img className="my-5 img-fluid d-block mx-auto" src="https://static.vecteezy.com/system/resources/previews/002/743/514/original/green-check-mark-icon-in-a-circle-free-vector.jpg" alt="Order Success" width="200" height="200" />



                    <h2>Your Order has been placed successfully.</h2>



                    <Link to="/me/orders">Go to Orders</Link>

                    <br/>
                    <PDFDownloadLink document={<Receipt invoice={invoice}/>} filename="receipt">
        {({loading}) => (loading ? <Button variant="contained">Loading Document...</Button> : <Button variant="contained">Download Receipt</Button> )}
                </PDFDownloadLink>

                </div>
             
               
              
               
             



            </div>



        </Fragment>

    )

}



export default OrderSuccess