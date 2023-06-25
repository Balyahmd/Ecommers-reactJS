import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function GuestRoute() {
    if(localStorage.getItem('token')) {
        return <Navigate to={'/table'} replace/> 
      }
    return (
      <div>
          <Outlet/>
      </div>
    )
}

export default GuestRoute