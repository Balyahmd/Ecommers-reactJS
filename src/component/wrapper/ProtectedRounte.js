import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function ProtectedRounte() {
    if(localStorage.getItem('token') === null) {
      return <Navigate to={'/login'} replace/> 
    }
  return (
    <div>
        <Outlet/>
    </div>
  )
}

export default ProtectedRounte