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
// import EditIcon from '@material-ui/icons/Edit';
import { Edit, Delete } from '@mui/icons-material';


import { getAdminProducts, deleteProduct, clearErrors } from '../../actions/productActions'
import { DELETE_PRODUCT_RESET } from 'src/constants/productConstants';
// import { allUsers,deleteUser} from '../../actions/userActions'

// import { DELETE_USER_RESET } from '../../constants/userConstants'



const ProductsList = () => {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { loading, error, products } = useSelector(state => state.products);

    const { error: deleteError, isDeleted } = useSelector(state => state.product)

    const errMsg = (message = '') => toast.error(message, {

        position: toast.POSITION.BOTTOM_CENTER

    });

    const successMsg = (message = '') => toast.success(message, {

        position: toast.POSITION.BOTTOM_CENTER

    });

    useEffect(() => {

        dispatch(getAdminProducts());

        if (error) {

            errMsg(error);

            // dispatch(clearErrors())

        }



        if (isDeleted) {

            successMsg('User deleted successfully');

            navigate('/dashboard/products');

            dispatch({ type: DELETE_PRODUCT_RESET })

        }



    }, [dispatch, alert, error, isDeleted, navigate])

    // }, [dispatch, alert, error, navigate])





    const deleteProductHandler = (id) => {

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
                dispatch(deleteProduct(id))

              Swal.fire(
                'Deleted!',
                'Product has been deleted.',
                'success'
              )
            }
          })
       
    }


    const setProducts = () => {

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

                    label: 'Price',

                    field: 'price',

                    sort: 'asc'

                },

                {

                    label: 'Stock',

                    field: 'stock',

                    sort: 'asc'

                },

                {

                    label: 'Actions',

                    field: 'actions',

                },

            ],

            rows: []

        }



        products.forEach(product => {

            data.rows.push({

                id: product._id,

                name: product.name,

                price: `$${product.price}`,

                stock: product.stock,

                actions: <Fragment>

                    <Link to={`/dashboard/updateproduct/${product._id}`} className="btn btn-primary py-1 px-2">

                      <Edit/>
                    </Link>

                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteProductHandler(product._id)}>

                        <Delete/>

                    </button>

                </Fragment>

            })

        })



        return data;

    }



    return (

        <>

            <MetaData title={'All Products'} />

           
            <Button variant="contained" component={Link} to="/dashboard/addproduct">
            Add Product
            </Button>
                    <>
       
                
              {loading ? <SemanticLoader /> : (

                <MDBDataTable

                    data={setProducts()}

                    className="table table-striped"



                    striped

                    hover

                />

                )}
          

                    
                      

                    </>

              

        </>

    )

}



export default ProductsList

