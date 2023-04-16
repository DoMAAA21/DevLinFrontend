import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom';
import {TextField, Button,Select,InputLabel,MenuItem,Box} from "@mui/material";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MetaData from '../layouts/MetaData'
import { updateProduct, getProductDetails, clearErrors } from '../../actions/productActions'
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants'



const UpdateProduct = () => {

    const [name, setName] = useState('');

    const [price, setPrice] = useState(0);

    const [description, setDescription] = useState('');

    const [category, setCategory] = useState('');

    const [stock, setStock] = useState(0);

    const [seller, setSeller] = useState('');

    const [images, setImages] = useState([]);

    const [oldImages, setOldImages] = useState([]);

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

    const { error, product } = useSelector(state => state.productDetails)

    const { loading, error: updateError, isUpdated } = useSelector(state => state.product);

    let { id } = useParams();

    let navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors }
      } = useForm(
        { mode:"onChange",
         defaultValues:
         {
          name: name,
          price: price,
          description : description,
          category : category,
          stock : stock,
          seller : seller,
  
         }
  
        }
      );

    const errMsg = (message = '') => toast.error(message, {

        position: toast.POSITION.BOTTOM_CENTER

    });

    const successMsg = (message = '') => toast.success(message, {

        position: toast.POSITION.BOTTOM_CENTER

    });

    useEffect(() => {

        if (product && product._id !== id) {

            dispatch(getProductDetails(id));

        } else {

            setValue('name', product.name)
            setValue('price',product.price)
            setValue('description',product.description)
            setValue('category',product.category)
            setValue('seller',product.seller)
            setValue('stock',product.stock)

            setOldImages(product.images)

        }

        if (error) {

            errMsg(error)

            dispatch(clearErrors())

        }

        if (updateError) {

            errMsg(updateError);

            dispatch(clearErrors())

        }



        if (isUpdated) {

            navigate('/dashboard/products');

            successMsg('Product updated successfully');

            dispatch({ type: UPDATE_PRODUCT_RESET })

        }



    }, [dispatch, error, isUpdated, navigate, updateError, product, id])





    const submitHandler = (data) => {


        const formData = new FormData();

        formData.set('name', data.name);

        formData.set('price', data.price);

        formData.set('description', data.description);

        formData.set('category', data.category);

        formData.set('stock', data.stock);

        formData.set('seller', data.seller);

        images.forEach(image => {

            formData.append('images', image)

        })


        dispatch(updateProduct(product._id, formData))

    }



    const onChange = e => {

        const files = Array.from(e.target.files)

        setImagesPreview([]);

        setImages([])

        setOldImages([])

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
            <MetaData title={"Update Product"} />
        <form onSubmit={handleSubmit(submitHandler)} encType='multipart/form-data'>
            <h2>Update Product</h2>

            <InputLabel >Name</InputLabel>
                <TextField 
                    name="name"
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    onChange={e => setName(e.target.value)}
                    sx={{mb: 3}}
                    fullWidth
                    {...register("name", {
                        required: "Name is required."
                      })}
                 />
                  <InputLabel >Price</InputLabel>
                  <TextField 
                    name="price"
                    required
                    variant="outlined"
                    color="secondary"
                    type="number"
                    onChange={e => setPrice(e.target.value)}
                    sx={{mb: 3}}
                    fullWidth
                    {...register("price", {
                        required: "Price is required."
                      })}
                 />
                    <InputLabel >Description</InputLabel>
                 <TextField 
                    name="description"
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    onChange={e => setDescription(e.target.value)}
                    fullWidth
                    sx={{mb: 3}}
                    {...register("description", {
                        required: "Description is required."
                      })}
                 />

                <InputLabel >Category</InputLabel>
                <Select
                    label="Category"
                    name="category" 
                    required 
                    variant="outlined"
                    color="primary"
                    onChange={e => setCategory(e.target.value)}
                    fullWidth         
                    sx={{mb: 3}}
                    {...register("category", {
                        required: "Category is required."
                      })}
                >

                    {categories.map(category => (

                      <MenuItem key={category} value={category}>{category}</MenuItem>
                    

                    ))}
                </Select>

                <InputLabel >Stock</InputLabel>

                <TextField 
            
                    name="stock"
                    required
                    variant="outlined"
                    color="secondary"
                    type="number"
                    onChange={e => setStock(e.target.value)}
                    fullWidth
                    sx={{mb: 3}}
                    {...register("stock", {
                        required: "Stock is required."
                      })}
                 />

                <InputLabel >Seller</InputLabel>
                <TextField 
                    name="seller"
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    onChange={e => setSeller(e.target.value)}
                    fullWidth
                    sx={{mb: 3}}
                    {...register("seller", {
                        required: "Seller is required."
                      })}
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

                {oldImages && oldImages.map(img => (

                    <img key={img.url} src={img.url} alt={img.url} className="mt-3 mr-2" width="55" height="52" />

                ))}



                {imagesPreview.map(img => (

                    <img src={img} key={img} alt="Images Preview" className="mt-3 mr-2" width="55" height="52" />

                ))}

            </div>
                 


                
                 <Button variant="outlined" color="secondary" type="submit">Submit</Button>
             
        </form>
       
        </React.Fragment>

    )

}



export default UpdateProduct