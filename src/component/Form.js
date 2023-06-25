import React, { useContext, useState } from 'react';
import axios from 'axios';
import { GlobalContext } from '../context/GlobalContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
function Form() {
  
    const { fetchProducts } = useContext(GlobalContext)
    const navigate = useNavigate()

    const [input, setInput] = useState({
      name: "",
      harga: "",
      stock: "",
      image_url: "",
      is_diskon: false,
      harga_diskon: "",
      category: "",
      description: ""
    });

    const handleChange = (event) => {
      if(event.target.name === "name"){
          setInput({...input, name: event.target.value});
      }else if(event.target.name === "harga"){
          setInput({...input, harga: event.target.value});
      }else if(event.target.name === "stock"){
          setInput({...input, stock: event.target.value});
      }else if(event.target.name === "image_url"){
          setInput({...input, image_url: event.target.value});
      }else if(event.target.name === "is_diskon"){
          setInput({...input, is_diskon: event.target.checked});
      }else if(event.target.name === "harga_diskon"){
          setInput({...input, harga_diskon: event.target.value});
      }else if(event.target.name === "description"){
        setInput({...input, description: event.target.value});
      }else if(event.target.name === "category"){
        setInput({...input, category: event.target.value});
      }
    };

    const handleSubmit = async() => {
      try {
        const response = await axios.post(
          'https://api-project.amandemy.co.id/api/final/products', 
          {
            name: input.name,
            harga: input.harga,
            stock: input.stock,
            harga_diskon: input.harga_diskon,
            is_diskon: input.is_diskon,
            category: input.category,
            image_url: input.image_url,
            description: input.description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
        );
        console.log(response);
        fetchProducts();
            setInput({
              name : "",
              harga: "",
              stock: "",
              image_url : "",
              is_diskon: true,
              harga_diskon: "",
              category: "",
              description: "",
            });
            Swal.fire({
              title: 'Product berhasil dibuat',
              icon: 'success',
            })
            navigate('/table')
      } catch (error) {
        Swal.fire({
          title: 'Product gagal dibuat',
          icon: 'error',
        })
        console.log(error);
      }
    };

  return (
       <div className='mt-40'>
        <div className='max-w-6xl rounded-md overflow-hidden shadow-lg mx-auto my-20 p-9 bg-slate-200'>
       <h1 className='text-3xl font-bold text-cyan-500'>Create Product</h1>
        <div className='grid grid-cols-5 gap-x-6 gap-y-4 my-2'>
          <div className='col-span-3'>
            <label className='block mb-1 font-bold' htmlFor="name">Nama Barang</label>
            <input onChange={handleChange} className='block w-full py-1 px-2 text-sm rounded-md bg-white border border-gray-400' type="text" id="name" name="name" placeholder="Masukkan Nama Barang" value={input.name} />
          </div>

          <div className='col-span-2'>
            <label className='block mb-1 font-bold' htmlFor="stock">Stock Barang</label>
            <input onChange={handleChange} className='block w-full py-1 px-2 text-sm rounded-md bg-white border border-gray-400'type="text" id="stock" name="stock" placeholder="0" value={input.stock}/>
          </div>

            <div className='col-span-2'>
              <label className='block mb-1 font-bold' htmlFor="stock">Harga Barang</label>
              <input onChange={handleChange} className='block w-full py-1 px-2 text-sm rounded-md bg-white border border-gray-400' type="text" id="harga" name="harga" placeholder="0" value={input.harga}/>
            </div>
            <div className='flex items-center justify-center mt-4 gap-3'>
              <input onChange={handleChange} type="checkbox" id="is_diskon" name="is_diskon" className='w-4' checked= {input.is_diskon} />
              <label className='px-2 font-semibold' htmlFor="is_diskon">Status Diskon</label>
            </div>
            
            <div className='col-span-2'>
              {input.is_diskon && (
              <div>
                <label className=' block mb-1 font-bold' htmlFor="harga_diskon">Harga Diskon</label>
                <input onChange={handleChange} className='block w-full py-1 px-2 text-sm rounded-md bg-white border border-gray-400' type="text" id="harga_diskon" name="harga_diskon" placeholder="Masukkan" value={input.harga_diskon}/>
              </div>
              )}
            </div>

          <div className='col-span-2'>
            <label className=' block mb-1 font-bold' htmlFor="category">Pilihan Kategori</label>
              <select onChange={handleChange} name='category' className='block w-full py-1 px-2 text-sm rounded-md bg-white border border-gray-400'>
                <option value="" disabled="">
                  Pilihan Kategori
                </option>
                <option value="teknologi">Teknologi</option>
                <option value="makanan">Makanan</option>
                <option value="inuman">Minuman</option>
                <option value="hiburan">Hiburan</option>
                <option value="kendaraan">Kendaraan</option>
              </select>
          </div>

          <div className='col-span-3'>
            <label className=' block mb-1 font-bold' htmlFor='image_url'>Gambar Barang</label>
            <input onChange={handleChange} className='block w-full py-1 px-2 text-sm rounded-md bg-white border border-gray-400' type="text" id="image_url" name="image_url" placeholder="Masukkan Image URL" value={input.image_url} />
          </div>
          </div>
          <div className='col-span-5'>
            <label htmlFor="description" className='font-bold'>Deskripsi</label>
            <textarea onChange={handleChange} className='w-full py-1 px-2 my-2 rounded-sm bg-white border-gray-400' id="description" name="description" rows="6" value={input.description}></textarea>
          </div>

          <div className='flex justify-end gap-5'>
            <Link to="/table">
              <button className='bg-transparent hover:bg-cyan-500 text-cyan-700 font-semibold hover:text-white border border-cyan-500 hover:border-transparent rounded-lg px-4 py-2'>Cancel</button>
            </Link>
            <button onClick={handleSubmit} className='bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-6 rounded-lg'>Create</button>
          </div>
       </div>
       </div>
  )
}
export default Form