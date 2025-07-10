import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

const ProtectedRoute = ({children,requireAdmin = true}) => {
    const user = useAuth()
    console.log("9",user)
    if(!user) return <Navigate to = '/login'/>
    if(requireAdmin && user.user.role !== 'admin') return <Navigate to ='/' />
  return children
}

export default ProtectedRoute