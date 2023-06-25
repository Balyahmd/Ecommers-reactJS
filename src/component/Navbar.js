import React from 'react'
import logoNav from '../img/logoNav.svg'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';

function Navbar() {
  const navigate = useNavigate();
  const onLogout = async() => {
    try {
      const response = await axios.post(
        'https://api-project.amandemy.co.id/api/final/Logout', 
        {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
      );
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: 'Logout gagal',
        icon: 'error',
      })
    } finally {
      //remove localstorega
      Swal.fire({
        title: 'Apakah kamu mau keluar',
        text: "Kamu yakin mau keluar?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Logout Berhasil!',
            'Anda Telah Berhasil Logout,',
            'success',
            localStorage.removeItem('token'),
            localStorage.removeItem('username'),
            navigate('/login'),
          )
        }
      })
    }
  }
  return (
    <div className='relative'>
    <div className='fixed top-0 left-0 right-0 flex w-full items-center justify-between bg-white py-4 text-cyan-500  font-semibold shadow-md'>
        <div className='flex ml-16'>
            <img src={logoNav} alt="Logo" />
        </div>
        <div className='flex justify-start items-center gap-7 text-xl font-normal'>
            <Link to="/">
              <p className=' hover:text-cyan-800'>Home</p>
            </Link>
            <Link to='/product'>
              <p className=' hover:text-cyan-800'>Products</p>
            </Link>
            <Link to="/table">
              <p className=' hover:text-cyan-800'>Tabel</p>
            </Link>
        </div>
        {
          localStorage.getItem("token") ?
           (
           <div className='flex gap-4 px-8 items-center'>
              <div className='text-cyan-500 text-xl'>
                Hai, {localStorage.getItem("username")}
              </div>
              <button onClick={onLogout} className='text-red-500 border-2 border-red-500 rounded-lg px-6 py-2 hover:bg-red-500 hover:text-white transition-all delay-75 flex items-center gap-2'>Logout</button>
            </div> 
            ) : (
              <div className='flex gap-6 px-10'>
              <Link to="/register">
                <button className='bg-cyan-500 border-2 text-white px-4 py-2 rounded-lg'>Register</button>
              </Link>
              <Link to="/login">
                <button className='bg-white border-2 border-cyan-500 text-cyan-900 px-4 py-2 rounded-lg'>Login</button>
              </Link>
          </div>
          )
        }
    </div>
    </div>
  )
}

export default Navbar