import React, { useEffect, useState } from "react";
import { loadUser } from "./actions/userActions";
import { Navigate, useRoutes } from 'react-router-dom';
import { useSelector } from "react-redux";

// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
import Layouts from './layouts/dashboard/Layouts';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
// import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import UsersList from './views/user/UsersList';
import AddUser from './views/user/AddUser';
import UpdateUser from './views/user/UpdateUser';
import ProductsList from './views/product/productList';
import AddProduct from './views/product/AddProduct';
import UpdateProduct from './views/product/UpdateProduct';
import Shop from './views/shop/Index';
import ProductDetails from './views/shop/ProductDetails';
import Cart from './views/cart/Cart';
import Shipping from './views/cart/Shipping';
import ConfirmOrder from './views/cart/ConfirmOrder';
import Payment from './views/cart/payment';
import OrderSuccess from './views/cart/orderSuccess.js';
import store from "./store";
import LoginPage from './views/auth/LoginPage';
import RegisterPage from './views/auth/RegisterPage';
import Profile from './views/auth/Profile';
import UpdateProfile from './views/auth/UpdateProfile';
import ListOrders from './views/auth/MyOrders';
import OrderDetails from "./views/auth/OrderDetails";
// ----------------------------------------------------------------------

export default function Router() {

  // useEffect(() => {
  //   store.dispatch(loadUser());
  // }, []);

  // const { user, isAuthenticated, loading } = useSelector((state) => state.auth);

  const routes = useRoutes([

    {
      element: <Layouts />,
      children: [
        { element: <Navigate to="shop" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
        { path: 'shop', element: <Shop /> },
        { path: '/search/:keyword', element: <Shop /> },
        { path: 'productpage', element: <ProductsPage /> },
        { path: 'shop/:id', element: <ProductDetails /> },
        { path: 'cart', element: <Cart /> },
        { path: 'shipping', element: <Shipping /> },
        { path: 'confirm', element: <ConfirmOrder /> },
        { path: 'payment', element: <Payment /> },
        { path: 'success', element: <OrderSuccess /> },
        { path: 'me', element: <Profile /> },
        { path: 'me/update', element: <UpdateProfile /> },
        { path: 'me/orders', element: <ListOrders /> },
        { path: 'order/:id', element: <OrderDetails /> },
     

      ],
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="shop" />, exact: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'users', element: <UsersList />,exact: "true" },
        { path: 'adduser', element: <AddUser />,exact: "true" },
        { path: 'updateuser/:id', element: <UpdateUser />,exact: "true" },
        { path: 'products', element: <ProductsList />,exact: "true" },
        { path: 'addproduct', element: <AddProduct />,exact: "true" },
        { path: 'updateproduct/:id', element: <UpdateProduct />,exact: "true" },
        
       
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <RegisterPage />,
    },
   

   
   
   
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
