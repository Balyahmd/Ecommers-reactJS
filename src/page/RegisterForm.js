import React from 'react'
import Navbar from '../component/Navbar'
import { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function RegisterForm() {
  const navigate = useNavigate()
    const [input, setInput] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const handleChange = (event) => {
        if(event.target.name === "name"){
            setInput({...input, name: event.target.value});
        }else if(event.target.name === "username"){
            setInput({...input, username: event.target.value});
        }else if(event.target.name === "email"){
            setInput({...input, email: event.target.value});
        }else if(event.target.name === "password"){
            setInput({...input, password: event.target.value});
        }else if(event.target.name === "password_confirmation"){
            setInput({...input, password_confirmation: event.target.value});
        }
      };

      const handleSubmit = async() => {
        try {
          const response = await axios.post(
            'https://api-project.amandemy.co.id/api/register', 
            {
                name: input.name,
                username: input.username,
                email: input.email,
                password: input.password,
                password_confirmation: input.password_confirmation,
          });  
          Swal.fire({
            title: 'Register berhasil',
            icon: 'success',
          })
          navigate("/login")
        } catch (error) {
          Swal.fire({
            title: 'Sorry Register Gagal',
            icon: 'error',
          })
          console.log(error);
        }
      };

  return (
    <div className='mt-40 mx-40'>
        <Navbar/>
        <div className='overflow-hidden shadow-lg my-20 p-9 bg-white rounded-lg max-w-2xl mx-auto'>
            <h2 className='text-center text-2xl font-bold mb-10 text-cyan-500 text-3xl font-medium '>REGISTER FORM</h2>
            <div className='grid grid-cols-12 gap-y-4'>
                <label className='col-span-4' htmlFor=''>Nama</label>
                <p>:</p>
                <input onChange={handleChange} type="text" name='name' className='col-span-7 border-2 px-2 py-1' placeholder='Masukkan Nama Pengguna'/>
                
                <label className='col-span-4' htmlFor=''>Username</label>
                <p>:</p>
                <input onChange={handleChange} type="text" name='username' className='col-span-7 border-2 px-2 py-1' placeholder='Masukkan Username Pengguna'/>
                
                <label className='col-span-4' htmlFor=''>Email</label>
                <p>:</p>
                <input onChange={handleChange} type="text" name='email' className='col-span-7 border-2 px-2 py-1' placeholder='Masukkan Email Pengguna'/>
                
                <label className='col-span-4' htmlFor=''>Password</label>
                <p>:</p>
                <input onChange={handleChange} type="password" name='password' className='col-span-7 border-2 px-2 py-1' placeholder='Masukkan Password'/>
                
                <label className='col-span-4' htmlFor=''>Konfirmasi Password</label>
                <p>:</p>
                <input onChange={handleChange} type="password" name='password_confirmation' className='col-span-7 border-2 px-2 py-1' placeholder='Masukkan Konfirmasi Password'/>
            
                <button onClick={handleSubmit} className='col-span-12 bg-cyan-600 text-center py-1 text-white rounded-lg mt-5'>Register</button>
            </div>
        </div>
    </div>
  )
}

export default RegisterForm