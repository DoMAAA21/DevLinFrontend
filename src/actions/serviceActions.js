import axios from "axios";
import {
    ADMIN_SERVICES_REQUEST,
    ADMIN_SERVICES_SUCCESS,
    ADMIN_SERVICES_FAIL,
    CLEAR_ERRORS,
    NEW_SERVICE_REQUEST,
    NEW_SERVICE_SUCCESS,
    NEW_SERVICE_FAIL,
    NEW_SERVICE_RESET,
    DELETE_SERVICE_REQUEST,
    DELETE_SERVICE_SUCCESS,
    DELETE_SERVICE_FAIL,
    DELETE_SERVICE_RESET,
    SERVICE_DETAILS_REQUEST,
    SERVICE_DETAILS_SUCCESS,
    SERVICE_DETAILS_FAIL,
    UPDATE_SERVICE_REQUEST,
    UPDATE_SERVICE_SUCCESS,
    UPDATE_SERVICE_FAIL,
    UPDATE_SERVICE_RESET,
    ALL_SERVICES_REQUEST,
    ALL_SERVICES_SUCCESS,
    ALL_SERVICES_FAIL
   
  } from "../constants/serviceConstants";

export const getAdminServices = () => async (dispatch) => {

    try {
  
  
  
        dispatch({ type: ADMIN_SERVICES_REQUEST })
  
  
  
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/admin/services`,{withCredentials: true})

        // console.log(data)
  
  
  
        dispatch({
  
            type: ADMIN_SERVICES_SUCCESS,
  
            payload: data.services
  
        })
  
  
  
    } catch (error) {
  
  
  
        dispatch({
  
            type: ADMIN_SERVICES_FAIL,
  
            payload: error.response.data.message
  
        })
  
    }
  
}

export const newService = (serviceData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_SERVICE_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
  
      console.log(serviceData)
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/admin/service/new`, serviceData,  {withCredentials:true},config  );

   
  
      dispatch({
        type: NEW_SERVICE_SUCCESS,
  
        payload: data
      });
    } catch (error) {
      dispatch({
        type: NEW_SERVICE_FAIL,
  
        payload: error.response.data.message,
      });
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({
      type: CLEAR_ERRORS,
    });
};

export const deleteService = (id) => async (dispatch) => {

    try {



        dispatch({ type: DELETE_SERVICE_REQUEST })



        const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/admin/service/${id}`,{withCredentials: true})



        dispatch({

            type: DELETE_SERVICE_SUCCESS,

            payload: data.success

        })



    } catch (error) {

        dispatch({

            type: DELETE_SERVICE_FAIL,

            payload: error.response.data.message

        })

    }

}

export const getServiceDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: SERVICE_DETAILS_REQUEST });
  
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/admin/service/${id}`,   {withCredentials:true});
      console.log(data)
  
      dispatch({
        type: SERVICE_DETAILS_SUCCESS,
        payload: data.service,
      });
    } catch (error) {
      dispatch({
        type: SERVICE_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  export const getoneServiceDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: SERVICE_DETAILS_REQUEST });
  
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/service/${id}`,   {withCredentials:true});
      console.log(data)
  
      dispatch({
        type: SERVICE_DETAILS_SUCCESS,
        payload: data.service,
      });
    } catch (error) {
      dispatch({
        type: SERVICE_DETAILS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const updateService = (id, serviceData) => async (dispatch) => {
    // for (var [key, value] of productData.entries()) { 
    //     console.log(key, value);
    //    }

    try {
  
  
  
        dispatch({ type: UPDATE_SERVICE_REQUEST })
  
  
  
        const config = {
  
            headers: {
  
                'Content-Type': 'application/json'
  
            }
  
        }
  
  
  
        const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/admin/service/${id}`, serviceData,{withCredentials:true}, config,)
  
  
  
        dispatch({
  
            type: UPDATE_SERVICE_SUCCESS,
  
            payload: data.success
  
        })
  
  
  
    } catch (error) {
  
        dispatch({
  
            type: UPDATE_SERVICE_FAIL,
  
            payload: error.response.data.message
  
        })
  
    }
  
  }
/////SERVICES ////

export const getServices =
(keyword = "", currentPage = 1, price, category = "") =>
async (dispatch) => {
  try {
    dispatch({
      type: ALL_SERVICES_REQUEST,
    });
    // let link = `${process.env.REACT_APP_API}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}`;
    let link = `${process.env.REACT_APP_API}/api/v1/services`;

    // if (category) {
    //   link = `${process.env.REACT_APP_API}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[lte]=${price[1]}&price[gte]=${price[0]}&category=${category}`;
    // }

    const { data } = await axios.get(link);
    console.log(data);
    console.log(link);
    dispatch({
      type: ALL_SERVICES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_SERVICES_FAIL,
      payload: error.response.data.message,
    });
  }
};

