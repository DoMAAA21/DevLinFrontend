import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import { TextField, FormControl, Button } from "@mui/material";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../layouts/MetaData'
import SemanticLoader from '../layouts/Loader'
import Swal from 'sweetalert2';

import { Edit, Delete } from '@mui/icons-material';


import { getAdminServices,deleteService } from '../../actions/serviceActions'
import { DELETE_SERVICE_RESET } from '../../constants/serviceConstants'



const ServicesList = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { loading, error, services } = useSelector(state => state.allservices);


    const { error: deleteError, isDeleted } = useSelector(state => state.service)

    const errMsg = (message = '') => toast.error(message, {

        position: toast.POSITION.BOTTOM_CENTER

    });

    const successMsg = (message = '') => toast.success(message, {

        position: toast.POSITION.BOTTOM_CENTER

    });

    useEffect(() => {

        dispatch(getAdminServices());


        if (error) {

            errMsg(error);

            dispatch(clearErrors())

        }



        if (isDeleted) {

            successMsg('Service deleted successfully');

            navigate('/dashboard/services');

            dispatch({ type: DELETE_SERVICE_RESET })

        }



    }, [dispatch, alert, error, isDeleted, navigate])







    const deleteServiceHandler = (id) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteService(id))

              Swal.fire(
                'Deleted!',
                'Service has been deleted.',
                'success'
              )
            }
          })
       
    }


    const setServices = () => {

        const data = {

            columns: [

                {

                    label: 'ID',

                    field: 'id',

                    sort: 'asc'

                },

                {

                    label: 'Name',

                    field: 'name',

                    sort: 'asc'

                },

                {

                    label: 'Description',

                    field: 'description',

                    sort: 'asc'

                },

                {

                    label: 'Price',

                    field: 'price',

                    sort: 'asc'

                },

                {

                    label: 'Actions',

                    field: 'actions',

                },

            ],

            rows: []

        }



        services.map(service => {

            data.rows.push({

                id: service._id,

                name: service.name,

                price: `$${service.price}`,

                description: service.description,

                actions: <Fragment>

                    <Link to={`/dashboard/updateservice/${service._id}`} className="btn btn-primary py-1 px-2">

                      <Edit/>
                    </Link>

                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteServiceHandler(service._id)}>

                        <Delete/>

                    </button>

                </Fragment>

            })

        })



        return data;

    }



    return (

        <>

            <MetaData title={'All Services'} />

           
            <Button variant="contained" component={Link} to="/dashboard/addservice">
            Add Service
            </Button>
                    <>
       
                
              {loading ? <SemanticLoader /> : (

                <MDBDataTable

                    data={setServices()}

                    className="table table-striped"



                    striped

                    hover

                />

                )}
          

                    
                      

                    </>

              

        </>

    )

}



export default ServicesList

