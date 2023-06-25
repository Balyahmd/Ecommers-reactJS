import React from 'react'
import Navbar from '../component/Navbar'
import { useState } from 'react'
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function LoginForm() {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    if(event.target.name === "email"){
      setInput({...input, email: event.target.value});
    }else if(event.target.name === "password"){
      setInput({...input, password: event.target.value});
    }
  };

  const handleSubmit = async() => {
    try {
      const response = await axios.post(
        'https://api-project.amandemy.co.id/api/login', 
        {
            email: input.email,
            password: input.password,
      });
        localStorage.setItem("username", response.data.data.user.username);  
        localStorage.setItem("token", response.data.data.token);
        Swal.fire({
          title: 'Login Berhasil',
          text: 'Welcome to Balya Shop',
          icon: 'success',
        })
        navigate('/table');
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Do you want to continue',
        icon: 'error',
        confirmButtonText: 'ok'
      })
      console.log(error);
    }
  };

  return (
    <div className='mt-40 mx-40'>
        <Navbar/>
        <div className='overflow-hidden shadow-lg mt-12 py-16 px-12 bg-white rounded-lg max-w-2xl mx-auto'>
            <h2 className='text-center text-2xl font-bold mb-10 text-cyan-500 text-3xl font-medium'>LOGIN FORM</h2>
            <div className='grid grid-cols-12 gap-y-3'>
                <label className='col-span-4' htmlFor=''>Email</label>
                <input  onChange={handleChange} type="text" name='email' className='col-span-7 border-2 px-2 py-1 rounded-md'  placeholder='Masukkan Email Pengguna'/>
                
                <label className='col-span-4' htmlFor=''>Password</label>
                <input  onChange={handleChange} type="password" name='password' className='col-span-7 border-2 px-2 py-1 rounded-md'  placeholder='Masukkan Password'/>
            
                <button  onClick={handleSubmit} className='col-span-12 bg-cyan-600 text-center py-1 text-white rounded-lg mt-5'>Login</button>
            </div>
        </div>
    </div>
  )
}

export default LoginForm