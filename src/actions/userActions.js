import axios from "axios";
import Cookies from 'universal-cookie';
import { googleLogout } from '@react-oauth/google';

import {
    
    
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    NEW_USER_FAIL,
    NEW_USER_RESET,
    NEW_USER_SUCCESS,
    NEW_USER_REQUEST,
    CLEAR_ERRORS,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,

    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,

    GOOGLELOGIN_REQUEST,
    GOOGLELOGIN_SUCCESS,
    GOOGLELOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_RESET,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_RESET,
    UPDATE_PASSWORD_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAIL,

  } from "../constants/userConstants";


export const allUsers = () => async (dispatch) => {

    try {
  
  

      
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Credentials": true,
    //     "withCredentials": true,
    //   },
    // };
  
        dispatch({ type: ALL_USERS_REQUEST })
  
  
  
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/admin/users`,{withCredentials:true})
  
  
  
        dispatch({
  
            type: ALL_USERS_SUCCESS,
  
            payload: data.users
  
        })
  
  
  
    } catch (error) {
  
        dispatch({
  
            type: ALL_USERS_FAIL,
  
            payload: error.response.data.message
  
        })
  
    }
  
  }

  export const clearErrors = () => async (dispatch) => {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };

  export const newUser = (userData) => async (dispatch) => {
    try {
      dispatch({ type: NEW_USER_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
  
      console.log(userData)
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/admin/user/new`, userData,  {withCredentials:true},config  );

   
  
      dispatch({
        type: NEW_USER_SUCCESS,
  
        payload: data
      });
    } catch (error) {
      dispatch({
        type: NEW_USER_FAIL,
  
        payload: error.response.data.message,
      });
    }
  };


  export const deleteUser = (id) => async (dispatch) => {
   
    console.log(id)

    try {
  
  
  
        dispatch({ type: DELETE_USER_REQUEST })
  
  
  
        const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/admin/user/${id}`,   {withCredentials:true})
  
  
  
        dispatch({
  
            type: DELETE_USER_SUCCESS,
  
            payload: data.success
  
        })
  
  
  
    } catch (error) {
  
        dispatch({
  
            type: DELETE_USER_FAIL,
  
            payload: error.response.data.message
  
        })
  
    }
  
  }


  export const getUserDetails = (id) => async (dispatch) => {

    try {
  
  
  
        dispatch({ type: USER_DETAILS_REQUEST })
  
  
  
  
  
        const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/admin/user/${id}`,{withCredentials:true},)
  
  
  
        dispatch({
  
            type: USER_DETAILS_SUCCESS,
  
            payload: data.user
  
        })
  
  
  
    } catch (error) {
  
        dispatch({
  
            type: USER_DETAILS_FAIL,
  
            payload: error.response.data.message
  
        })
  
    }
  
  }

  export const updateUser = (id, userData) => async (dispatch) => {

    // for (var [key, value] of userData.entries()) { 
    //         console.log(key, value);
    //        }


    try {
  
  
  
        dispatch({ type: UPDATE_USER_REQUEST })
  
  
  
        const config = {
  
            headers: {
  
                'Content-Type': 'application/json'
  
            }
  
        }
  
  
  
        const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/admin/user/${id}`, userData,{withCredentials:true}, config)
  
  

        // console.log(data);
  
        dispatch({
  
            type: UPDATE_USER_SUCCESS,
  
            payload: data.success
  
        })
  
  
  
    } catch (error) {
  
        dispatch({
  
            type: UPDATE_USER_FAIL,
  
            payload: error.response.data.message
  
        })
  
    }
  
  }


  
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Credentials": true,
    //     "withCredentials": true,
    //   },
    // };

    const cookies = new Cookies();

    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/login`,
      { email, password },
     {withCredentials:true}
    );

    console.log(data)
    // cookies.set('token', data.token, { path: '/' });
    cookies.set('userid', data.user._id, { path: '/' });

    localStorage.setItem("user",JSON.stringify(data.user));
    dispatch({
      type: LOGIN_SUCCESS,

      payload: data.user,

      

    

    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,

      payload: error.response.data.errMessage,
    });
  }
};

export const register = (userData) => async (dispatch) => {
  try {
      dispatch({ type: REGISTER_USER_REQUEST })
      const config = {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      }
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/register`, userData,   {withCredentials:true},config)

      const cookies = new Cookies();
      cookies.set('userid', data.user._id, { path: '/' });
      localStorage.setItem("user",JSON.stringify(data.user));
      dispatch({
          type: REGISTER_USER_SUCCESS,
          payload: data.user
      })
  } catch (error) {
      dispatch({
          type: REGISTER_USER_FAIL,
          payload: error.response.data.message
      })
  }
}



export const googlelogin = (response) => async (dispatch) => {


  console.log(response);
  try {
    dispatch({ type: GOOGLELOGIN_REQUEST });

    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Access-Control-Allow-Credentials": true,
    //     "withCredentials": true,
    //   },
    // };

    const cookies = new Cookies();

    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/googlelogin`,
      { response},
     {withCredentials:true}
    );

    console.log(data)
    // cookies.set('token', data.token, { path: '/' });
    cookies.set('userid', data.user._id, { path: '/' });
    

    localStorage.setItem("user",JSON.stringify(data.user));
    dispatch({
      type:  GOOGLELOGIN_SUCCESS,

      payload: data.user,

      

    

    });
  } catch (error) {
    dispatch({
      type:  GOOGLELOGIN_FAIL,

      payload: error.response.data.errMessage,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.get(`${process.env.REACT_APP_API}/api/v1/logout`,   {withCredentials:true});
    const cookies = new Cookies();
    cookies.remove("userid");
    localStorage.removeItem("user");
    googleLogout();
    dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response.data.errMessage,
    });
  }
};


export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/me`,{withCredentials: true});
    
    

    dispatch({
      type: LOAD_USER_SUCCESS,

      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,

      payload: error.response.data.errMessage,
    });
  }
};

export const updateProfile = (userData) => async (dispatch) => {

    for (var [key, value] of userData.entries()) { 
        console.log(key, value);
       }
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/me/update`, userData,{withCredentials:true}, config);

    console.log(data)

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,

      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,

      payload: error.response.data.errMessage,
    });
  }
};

export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `${process.env.REACT_APP_API}/api/v1/password/update`,
      {withCredentials:true},
      passwords,
      config
    );

    dispatch({
      type: UPDATE_PASSWORD_SUCCESS,

      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,

      payload: error.response.data.errMessage,
    });
  }
};

