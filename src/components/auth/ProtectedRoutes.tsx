import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated } from '../../utils/auth'

const ProtectedRoutes = () => {
    return isAuthenticated() ? <Outlet /> : <Navigate to='/retailer/login' />
}

export default ProtectedRoutes