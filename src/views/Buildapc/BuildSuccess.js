import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layouts/MetaData'
import {Card, CardHeader, CardContent,Typography,m} from "@mui/material";


const pc = JSON.parse(localStorage.getItem('pcbuild'))

const BuildSuccess = () => {
  
    return (

        <Fragment>



            <MetaData title={'Build Success'} />



            <div className="row justify-content-center">

                <div className="col-6 mt-5 text-center">

                    <img className="my-5 img-fluid d-block mx-auto" src="https://previews.123rf.com/images/kokandr/kokandr1409/kokandr140900044/31399822-computer-fix-sign.jpg" alt="Order Success" width="200" height="200" />



                    <h2>Enjoy your new Pc.</h2>

                    <Card>
      <CardHeader title="PC Details" />
      <CardContent>
        <Typography variant="body1"><b>Processor:</b> {pc.processor}</Typography>
        <Typography variant="body1"><b>Graphics:</b> {pc.gcard}</Typography>
        <Typography variant="body1"><b>Memory:</b> {pc.memory}</Typography>
        <Typography variant="body1"><b>MotherBoard:</b>{pc.motherboard}</Typography>
        <Typography variant="body1"><b>RAM:</b>{pc.ram}</Typography>
        <Typography variant="body1"><b>Fan:</b> {pc.Fan}</Typography>
      </CardContent>
    </Card>
                 

                    <br/>
                   

                </div>
             
               
              
               
             



            </div>



        </Fragment>

    )

}



export default BuildSuccess