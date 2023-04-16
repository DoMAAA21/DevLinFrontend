import React, { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {TextField, Button,Select,InputLabel,MenuItem,Box} from "@mui/material";
import { useForm } from "react-hook-form";
import MetaData from '../layouts/MetaData'
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



    const submitHandler = (data) => {

        


        const formData = new FormData();

        formData.set('name',data.name);

        formData.set('price', data.price);

        formData.set('description', data.description);

        formData.set('category', data.category);

        formData.set('stock', data.stock);

        formData.set('seller', data.seller);

        images.forEach(image => {

            formData.append('images', image)

        })

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
            <MetaData title={"Add Product"} />
        <form onSubmit={handleSubmit(submitHandler)} encType='multipart/form-data'>
            <h2>Add Product</h2>
                <TextField 
                    label="Name"
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
                 {errors.name && <Box component="div" sx={{ display: 'block' , color:'red' }}>{errors.name.message}</Box>}
                  <TextField 
                    label="Price"
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
                 {errors.price && <Box component="div" sx={{ display: 'block' , color:'red' }}>{errors.price.message}</Box>}
                 <TextField 
                    label="Description"
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
                  {errors.description && <Box component="div" sx={{ display: 'block' , color:'red' }}>{errors.description.message}</Box>}

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
                {errors.category && <Box component="div" sx={{ display: 'block' , color:'red' }}>{errors.category.message}</Box>}

                <TextField 
                    label="Stock"
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
                 {errors.stock && <Box component="div" sx={{ display: 'block' , color:'red' }}>{errors.stock.message}</Box>}
                 
                <TextField 
                    label="Seller"
                    name="seller"
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    onChange={e => setSeller(e.target.value)}
                    fullWidth
                    sx={{mb: 3}}
                    {...register("seller", {
                        required: "Description is required."
                      })}
                 />

                {errors.seller && <Box component="div" sx={{ display: 'block' , color:'red' }}>{errors.seller.message}</Box>}
                 

                 
                    
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



