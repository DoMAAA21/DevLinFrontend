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
import OrdersList from "./views/order/OrdersList";
import ProcessOrder from "./views/order/ProcessOrder";
import ProtectedRoute from "./ProtectedRoute";
import ProductReviews from "./views/reviews/ProductReviews";
import ServicesList from "./views/service/ServiceList";
import AddService from "./views/service/AddService";
import UpdateService from  "./views/service/UpdateService";
import ServiceIndex from "./views/serviceshop/Index"
import ServiceDetails from "./views/serviceshop/ServiceDetails"
import ServiceCart from "./views/servicecart/ServiceCart"
import ServiceShipping from "./views/servicecart/ServiceShipping"
import ServiceSuccess from "./views/servicecart/ServiceSuccess"
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
        { path: 'services', element: <ServiceIndex /> },
        { path: 'service/:id', element: <ServiceDetails /> },
        { path: 'servicecart', element: <ServiceCart /> },
        { path: 'serviceshipping', element: <ServiceShipping /> },
        { path: 'servicesuccess', element: <ServiceSuccess /> },

     

      ],
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="shop" />, exact: true },
        { path: 'app', element:<ProtectedRoute isAdmin={true} > <DashboardAppPage /> </ProtectedRoute >},
        { path: 'user', element:<ProtectedRoute isAdmin={true} > <UserPage />  </ProtectedRoute>},
        { path: 'blog', element: <ProtectedRoute isAdmin={true} > <BlogPage />  </ProtectedRoute>},
        { path: 'users', element: <ProtectedRoute isAdmin={true} > <UsersList /> </ProtectedRoute>,exact: "true" },
        { path: 'adduser', element: <ProtectedRoute isAdmin={true} ><AddUser /></ProtectedRoute>,exact: "true" },
        { path: 'updateuser/:id', element: <ProtectedRoute isAdmin={true} > <UpdateUser /></ProtectedRoute>,exact: "true" },
        { path: 'products', element: <ProtectedRoute isAdmin={true} ><ProductsList /></ProtectedRoute>,exact: "true" },
        { path: 'addproduct', element: <ProtectedRoute isAdmin={true} ><AddProduct /></ProtectedRoute>,exact: "true" },
        { path: 'updateproduct/:id', element: <ProtectedRoute isAdmin={true} ><UpdateProduct /></ProtectedRoute>,exact: "true" },
        { path: 'orders', element: <ProtectedRoute isAdmin={true} ><OrdersList /></ProtectedRoute>,exact: "true" },
        { path: 'order/:id', element: <ProtectedRoute isAdmin={true} ><ProcessOrder /></ProtectedRoute>,exact: "true" },
        { path: 'reviews', element: <ProtectedRoute isAdmin={true} ><ProductReviews /></ProtectedRoute>,exact: "true" },
        { path: 'services', element: <ProtectedRoute isAdmin={true} > <ServicesList /> </ProtectedRoute>,exact: "true" },
        { path: 'addservice', element: <ProtectedRoute isAdmin={true} > <AddService /> </ProtectedRoute>,exact: "true" },
        { path: 'updateservice/:id', element: <ProtectedRoute isAdmin={true} > <UpdateService /></ProtectedRoute>,exact: "true" },
        
       
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
