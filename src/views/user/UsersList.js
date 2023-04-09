import React, { Fragment, useEffect } from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import { TextField, FormControl, Button } from "@mui/material";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { Edit, Delete } from '@mui/icons-material';
import MetaData from '../layouts/MetaData'
import SemanticLoader from '../layouts/Loader'
import Swal from 'sweetalert2';
// import EditIcon from '@material-ui/icons/Edit';


import { allUsers,deleteUser} from '../../actions/userActions'

import { DELETE_USER_RESET } from '../../constants/userConstants'



const UsersList = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { loading, error, users } = useSelector(state => state.allUsers);

    const { isDeleted } = useSelector(state => state.user)

    const errMsg = (message = '') => toast.error(message, {

        position: toast.POSITION.BOTTOM_CENTER

    });

    const successMsg = (message = '') => toast.success(message, {

        position: toast.POSITION.BOTTOM_CENTER

    });

    useEffect(() => {

        dispatch(allUsers());

        if (error) {

            errMsg(error);

            // dispatch(clearErrors())

        }



        if (isDeleted) {

            successMsg('User deleted successfully');

            navigate('/dashboard/users');

            dispatch({ type: DELETE_USER_RESET })

        }



    }, [dispatch, alert, error, isDeleted, navigate])

    // }, [dispatch, alert, error, navigate])





    const deleteUserHandler = (id) => {
        // console.log(id)

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
                dispatch(deleteUser(id))
              Swal.fire(
                'Deleted!',
                'User has been deleted.',
                'success'
              )
            }
          })

       

    }



    const setUsers = () => {

        const data = {

            columns: [

                {

                    label: 'User ID',

                    field: 'id',

                    sort: 'asc',
                    
                    className: 'text-uppercase text-secondary text-xxs font-weight-bolder opacity-7'

                },

                {

                    label: 'Name',

                    field: 'name',

                    sort: 'asc',

                  

                },

                {

                    label: 'Email',

                    field: 'email',

                    sort: 'asc',

                   

                },

                {

                    label: 'Role',

                    field: 'role',

                    sort: 'asc',

                    

                },

                {

                    label: 'Actions',

                    field: 'actions',

                },

            ],

            rows: []

        }

        users.forEach(user => {

            data.rows.push({

                id: user._id,

                name: user.name,

                email: user.email,

                role: user.role,

                actions: <>

                    <Link to={`/dashboard/updateuser/${user._id}`} className="btn btn-primary py-1 px-2">

                        {/* <i className="mdi mdi-account-edit"/> */}
                        <Edit/>

                    </Link>

                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteUserHandler(user._id)}>

                        <Delete/>

                    </button>

                   {/* <button className="btn btn-danger py-1 px-2 ml-2">

                        <i className="mdi mdi-delete"/>

                    </button> */}

                </>

            })

        })

        return data;

    }



    return (

        <>

            <MetaData title={'All Users'} />

           
            <Button variant="contained" component={Link} to="/dashboard/adduser">
            Add User
            </Button>
                    <>
       
                {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/MaterialDesign-Webfont/7.2.96/css/materialdesignicons.min.css" /> */}
              {loading ? <SemanticLoader /> : (

    <MDBDataTable

    data={setUsers()}

    className="table table-striped"



    striped

    hover

/>

)}
          

                    
                      

                    </>

                {/* </div>

            </div> */}

        </>

    )

}



export default UsersList

