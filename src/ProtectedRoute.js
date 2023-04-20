import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from './views/layouts/Loader';

const ProtectedRoute = ({ children, isAdmin = false }) => {
   
    const { isAuthenticated, loading, user } = useSelector(state => state.auth);
     console.log(user)
    
        if (isAuthenticated === false) {
            return <Navigate to='/login' />
        }
        if (user === null) {
            return <Navigate to='/login' />
        }
        
        if (isAdmin === true && user.role !== 'admin') {
            return <Navigate to='/' />
        }
        return children
   
    return <Loader />;

};

export default ProtectedRoute;