import React, { Fragment } from 'react'

import { Link } from 'react-router-dom'

import MetaData from '../layouts/MetaData'

import Receipt from './Receipt';
import { PDFDownloadLink } from "@react-pdf/renderer";

const OrderSuccess = () => {

    return (

        <Fragment>



            <MetaData title={'Order Success'} />



            <div className="row justify-content-center">

                <div className="col-6 mt-5 text-center">

                    <img className="my-5 img-fluid d-block mx-auto" src="https://www.pinterest.ph/pin/792070653214326890/" alt="Order Success" width="200" height="200" />



                    <h2>Your Order has been placed successfully.</h2>



                    <Link to="/me/orders">Go to Orders</Link>

                </div>
                <PDFDownloadLink document={<Receipt />} filename="FORM">
      {({loading}) => (loading ? <button>Loading Document...</button> : <button>Download</button> )}
      </PDFDownloadLink>



            </div>



        </Fragment>

    )

}



export default OrderSuccess