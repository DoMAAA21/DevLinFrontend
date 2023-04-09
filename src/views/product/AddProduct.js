import React, { Fragment, useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import {TextField, Button,Select,InputLabel,MenuItem} from "@mui/material";

import { useDispatch, useSelector } from 'react-redux'

import { newProduct, clearErrors } from '../../actions/productActions'

import { NEW_PRODUCT_RESET } from '../../constants/productConstants'

const notifys = (message = "") =>
toast.success(message, {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
});


const AddProduct = () => {

    const [name, setName] = useState('');

    const [price, setPrice] = useState(0);

    const [description, setDescription] = useState('');

    const [category, setCategory] = useState('');

    const [stock, setStock] = useState(0);

    const [seller, setSeller] = useState('');

    const [images, setImages] = useState([]);

    const [imagesPreview, setImagesPreview] = useState([])



    const categories = [

        "Peripherals",
        "Cameras",
        "Laptops",
        "Accessories",
        "Headphones",
        "PCs",
        "PC parts",
        "Components"
    ]



    const dispatch = useDispatch();

    let navigate = useNavigate()



    const { loading, error, success } = useSelector(state => state.newProduct);

    const message = (message = '') => toast.success(message, {

        position: toast.POSITION.BOTTOM_CENTER

    });

    useEffect(() => {



        if (error) {

            dispatch(clearErrors())

        }

        if (success) {

            navigate('/dashboard/products');

            message('Product created successfully');

            dispatch({ type: NEW_PRODUCT_RESET })

        }



    }, [dispatch, error, success,navigate])



    const submitHandler = (e) => {

        e.preventDefault();



        const formData = new FormData();

        formData.set('name', name);

        formData.set('price', price);

        formData.set('description', description);

        formData.set('category', category);

        formData.set('stock', stock);

        formData.set('seller', seller);



        images.forEach(image => {

            formData.append('images', image)

        })


        // for (var [key, value] of formData.entries()) { 
        //     console.log(key, value);
        //    }
        dispatch(newProduct(formData))

    }

    const onChange = e => {

        const files = Array.from(e.target.files)

        setImagesPreview([]);

        setImages([])

        files.forEach(file => {

            const reader = new FileReader();

            reader.onload = () => {

                if (reader.readyState === 2) {

                    setImagesPreview(oldArray => [...oldArray, reader.result])

                    setImages(oldArray => [...oldArray, reader.result])

                }

            }

            reader.readAsDataURL(file)

        })

    }

    return (


        <React.Fragment>
        <form onSubmit={submitHandler} encType='multipart/form-data'>
            <h2>Add Product</h2>
                <TextField 
                    label="Name"
                    name="name"
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    onChange={e => setName(e.target.value)}
                    value={name}
                    sx={{mb: 3}}
                    fullWidth
                 />
                  <TextField 
                    label="Price"
                    name="price"
                    required
                    variant="outlined"
                    color="secondary"
                    type="number"
                    onChange={e => setPrice(e.target.value)}
                    value={price}
                    sx={{mb: 3}}
                    fullWidth
                 />
                 <TextField 
                    label="Description"
                    name="description"
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    onChange={e => setDescription(e.target.value)}
                    value={description}
                    fullWidth
                    sx={{mb: 3}}
                 />

                <InputLabel >Category</InputLabel>
                <Select
                label="Category"
                name="category" 
                required 
                    value={category}
                    variant="outlined"
                    color="primary"
                    onChange={e => setCategory(e.target.value)}
                    fullWidth         
                    sx={{mb: 3}}
                >

                    {categories.map(category => (

                      <MenuItem key={category} value={category}>{category}</MenuItem>
                    

                    ))}
                </Select>

                <TextField 
                    label="Stock"
                    name="stock"
                    required
                    variant="outlined"
                    color="secondary"
                    type="number"
                    onChange={e => setStock(e.target.value)}
                    value={stock}
                    fullWidth
                    sx={{mb: 3}}
                 />

                 
                <TextField 
                    label="Seller"
                    name="seller"
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    onChange={e => setSeller(e.target.value)}
                    value={seller}
                    fullWidth
                    sx={{mb: 3}}
                 />
                 

                 
                    
                 <div className='form-group'>

                <label>Images</label>



                <div className='custom-file'>

                <input

                    type='file'

                    name='images'

                    className='custom-file-input'

                    id='customFile'

                    onChange={onChange}

                    multiple

                />

                <label className='custom-file-label' htmlFor='customFile'>

                    Choose Images

                </label>

                </div>



                {imagesPreview.map(img => (

                    <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />

                ))}



                </div>
                 


                
                 <Button variant="outlined" color="secondary" type="submit">Submit</Button>
             
        </form>
       
        </React.Fragment>

    )

}

export default AddProduct



