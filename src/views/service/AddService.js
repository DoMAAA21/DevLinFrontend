import React, { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import {TextField, Button,Box} from "@mui/material";
import { useForm } from "react-hook-form";
import MetaData from '../layouts/MetaData'
import {  newService ,clearErrors } from '../../actions/serviceActions'
import { NEW_SERVICE_RESET } from '../../constants/serviceConstants'

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


const AddService = () => {


    
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [images, setImages] = useState([]);

    const [imagesPreview, setImagesPreview] = useState([])


  

    const dispatch = useDispatch();

    const navigate = useNavigate()



    const { loading, error, success } = useSelector(state => state.newService);
 
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
       description: description,
        price: price

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

            navigate('/dashboard/services');

            message('Service created successfully');

            dispatch({ type: NEW_SERVICE_RESET })

        }



    }, [dispatch, error, success,navigate])



    const submitHandler = (data) => {

      
    
        const formData = new FormData();

        formData.set('name',data.name);
        formData.set('description', data.description);

        formData.set('price', data.price);

        images.forEach(image => {

            formData.append('images', image)

        })

       

    dispatch(newService(formData))

    }

    const onChange = (e) => {
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
      };

    return (

        

        <React.Fragment>
            <MetaData title={"Add User"} />
           <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css"/>
        <form onSubmit={handleSubmit(submitHandler)} encType='multipart/form-data'>
            <h2>Add Service</h2>
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
                    label="Description"
                    name="description"
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    onChange={e => setDescription(e.target.value)}
                   
                    sx={{mb: 3}}
                    fullWidth
                    {...register("description", {
                      required: "Description is required.",
                     
                    })}
                 />

              {errors.description && <Box component="div" sx={{ display: 'block' , color:'red'}}>{errors.description.message}</Box>}
                 
                 <TextField 
                    label="Price"
                    name="price"
                    required
                    variant="outlined"
                    color="secondary"
                    type="number"
                    onChange={e => setPrice(e.target.value)}
               
                    fullWidth
                    sx={{mb: 3}}
                    {...register("price", {
                      required: "Price is required.",
                    
                    })}
                 />
                  {errors.price && <Box component="div" sx={{ display: 'block' , color:'red' }}>{errors.price.message}</Box>}
                 
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
                 

            {errors.image && <Box component="div" sx={{ display: 'block' , color:'red' }}>{errors.image.message}</Box>}
                
                 <Button variant="outlined" color="secondary" type="submit">Submit</Button>
             
        </form>
       
        </React.Fragment>

    )

}

export default AddService
