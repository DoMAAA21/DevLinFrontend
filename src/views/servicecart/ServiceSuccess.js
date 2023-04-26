import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layouts/MetaData'

const ServiceSuccess = () => {
  
    return (

        <Fragment>



            <MetaData title={'Service Success'} />



            <div className="row justify-content-center">

                <div className="col-6 mt-5 text-center">

                    <img className="my-5 img-fluid d-block mx-auto" src="https://static.vecteezy.com/system/resources/previews/002/743/514/original/green-check-mark-icon-in-a-circle-free-vector.jpg" alt="Order Success" width="200" height="200" />



                    <h2>Your Service Order has been placed successfully.</h2>



                    <Link to="/me/orders">Go to Orders</Link>

                    <br/>
                   

                </div>
             
               
              
               
             



            </div>



        </Fragment>

    )

}



export default ServiceSuccess