import {
    
    
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    CLEAR_ERRORS,
    NEW_USER_SUCCESS,
    NEW_USER_REQUEST,
    NEW_USER_RESET,
    NEW_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_RESET,
    DELETE_USER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_USER_RESET,

    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,

    GOOGLELOGIN_REQUEST,
    GOOGLELOGIN_SUCCESS,
    GOOGLELOGIN_FAIL,

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
    USER_SALES_REQUEST,
    USER_SALES_SUCCESS,
    USER_SALES_FAIL,
   


  } from "../constants/userConstants";

  export const allUsersReducer = (state = { users: [] }, action) => {

    switch (action.type) {
  
  
  
        case ALL_USERS_REQUEST:
  
            return {
  
                ...state,
  
                loading: true,
  
            }
  
  
  
        case ALL_USERS_SUCCESS:
  
            return {
  
                ...state,
  
                loading: false,
  
                users: action.payload
  
            }
  
  
  
        case ALL_USERS_FAIL:
  
            return {
  
                ...state,
  
                loading: false,
  
                error: action.payload
  
            }
  
  
  
        case CLEAR_ERRORS:
  
            return {
  
                ...state,
  
                error: null
  
            }
  
  
  
        default:
  
            return state;
  
    }
  
  }

  const initialState = {
    name : "",
    email: "",
    password: "",
        avatar: null,
  };

  export const newUserReducer = (state ={ users : initialState} , action) => {

    switch (action.type) {
  
        case 'UPDATE_FIELD':
         return {
        ...state,
        [action.payload.name]: action.payload.value
         };
  
        case NEW_USER_REQUEST:
  
            return {
  
                ...state,
  
                loading: true
  
            }
  
  
  
        case NEW_USER_SUCCESS:
  
            return {
  
                loading: false,
  
                success: action.payload.success,
  
                product: action.payload.product
  
            }
  
  
  
        case NEW_USER_FAIL:
  
            return {
  
                ...state,
  
                error: action.payload
  
            }
  
  
  
        case NEW_USER_RESET:
  
            return {
  
                ...state,
  
                success: false
  
            }
  
  
  
        case CLEAR_ERRORS:
  
            return {
  
                ...state,
  
                error: null
  
            }
  
  
  
        default:
  
            return state
  
    }
  
  }

  export const userReducer = (state = {}, action) => {

    switch (action.type) {
  
  
  
        case UPDATE_PROFILE_REQUEST:
  
        case UPDATE_PASSWORD_REQUEST:
  
        case UPDATE_USER_REQUEST:
  
        case DELETE_USER_REQUEST:
  
            return {
  
                ...state,
  
                loading: true
  
            }
  
  
  
        case UPDATE_PROFILE_SUCCESS:
  
        case UPDATE_PASSWORD_SUCCESS:
  
        case UPDATE_USER_SUCCESS:
  
            return {
  
                ...state,
  
                loading: false,
  
                isUpdated: action.payload
  
            }
  
  
  
        case DELETE_USER_SUCCESS:
  
            return {
  
                ...state,
  
                loading: false,
  
                isDeleted: action.payload
  
            }
  
  
  
        case UPDATE_PROFILE_RESET:
  
        case UPDATE_PASSWORD_RESET:
  
        case UPDATE_USER_RESET:
  
            return {
  
                ...state,
  
                isUpdated: false
  
            }
  
  
  
        case DELETE_USER_RESET:
  
            return {
  
                ...state,
  
                isDeleted: false
  
            }
  
  
  
        case UPDATE_PROFILE_FAIL:
  
        case UPDATE_PASSWORD_FAIL:
  
        case UPDATE_USER_FAIL:
  
        case DELETE_USER_FAIL:
  
            return {
  
                ...state,
  
                loading: false,
  
                error: action.payload
  
            }
  
  
  
        case CLEAR_ERRORS:
  
            return {
  
                ...state,
  
                error: null
  
            }
  
  
  
        default:
  
            return state;
  
    }
  
  }

  export const userDetailsReducer = (state = { user: {} }, action) => {

    switch (action.type) {
  
  
  
        case USER_DETAILS_REQUEST:
  
            return {
  
                ...state,
  
                loading: true,
  
            }
  
  
  
        case USER_DETAILS_SUCCESS:
  
            return {
  
                ...state,
  
                loading: false,
  
                user: action.payload
  
            }
  
  
  
        case USER_DETAILS_FAIL:
  
            return {
  
                ...state,
  
                loading: false,
  
                error: action.payload
  
            }
  
  
  
        case CLEAR_ERRORS:
  
            return {
  
                ...state,
  
                error: null
  
            }
  
  
  
        default:
  
            return state;
  
    }
  
  }

  export const authReducer = (state = { user: {} }, action) => {
    switch (action.type) {
      case LOGIN_REQUEST:
      case GOOGLELOGIN_REQUEST:
      case REGISTER_USER_REQUEST:
      case LOAD_USER_REQUEST:
        return {
          ...state,
          loading: true,
  
          isAuthenticated: false,
        };
  
      case LOGIN_SUCCESS:
      case GOOGLELOGIN_SUCCESS:
      case REGISTER_USER_SUCCESS:
      case LOAD_USER_SUCCESS:
        return {
          ...state,
  
          loading: false,
  
          isAuthenticated: true,
  
          user: action.payload,
          
        };
  
      case LOGIN_FAIL:
      case GOOGLELOGIN_FAIL:
      case REGISTER_USER_FAIL:
      case LOAD_USER_FAIL:
        return {
          ...state,
  
          loading: false,
  
          isAuthenticated: false,
  
          user: null,
  
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
  
          error: null,
        };
  
      case LOGOUT_SUCCESS:
        return {
          loading: false,
  
          isAuthenticated: false,
  
          user: null,
        //   ...state,
        };
  
      case LOGOUT_FAIL:
        return {
          ...state,
  
          error: action.payload,
        };

        
  
      default:
        return state;
    }
  };

  export const customerSalesReducer = (state = { customerSales: [] }, action) => {
    switch (action.type) {
        case USER_SALES_REQUEST:
            return {
                ...state,
                loading: true
            }

        case USER_SALES_SUCCESS:
            return {
                ...state,
                loading: false,
                customerSales: action.payload
            }
        case USER_SALES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }

}

 
  
  