import { legacy_createStore as createStore ,combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { newOrderReducer,myOrdersReducer,orderDetailsReducer,allOrdersReducer,orderReducer   } from './reducers/orderReducers'
import {
  productsReducer,
  newReviewReducer,
  newProductReducer,
  productReducer,
  productDetailsReducer
//  productReviewsReducer, reviewReducer
} from "./reducers/productReducers";
import {

  allUsersReducer,
  newUserReducer,
  userReducer,
  userDetailsReducer,
  authReducer,
  
} from "./reducers/userReducers";

import { cartReducer } from './reducers/cartReducers'
const reducer = combineReducers({

allUsers: allUsersReducer,
newUser: newUserReducer,
user: userReducer,
userDetails: userDetailsReducer,
products: productsReducer,
product : productReducer,
newProduct: newProductReducer,
productDetails: productDetailsReducer,
auth: authReducer,
newReview: newReviewReducer,
cart: cartReducer,
newOrder: newOrderReducer,
myOrders: myOrdersReducer,
orderDetails: orderDetailsReducer,
allOrders: allOrdersReducer,
order: orderReducer,




});

let initialState = {

  cart: {

      cartItems: localStorage.getItem('cartItems')

          ? JSON.parse(localStorage.getItem('cartItems'))

          : [],

      shippingInfo: localStorage.getItem('shippingInfo')

           ? JSON.parse(localStorage.getItem('shippingInfo'))

          : {}

  },

  auth :
  {
    user: localStorage.getItem('user') 
    ? JSON.parse(localStorage.getItem('user'))
  
   : null,
  
  }

}

const middlware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlware))
);

export default store;
