import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { GlobalContext } from '../context/GlobalContext';


function Detail() {
  const { id } = useParams();
  const { fetchProducts } = useContext(GlobalContext);
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

  const fetchDetails = async () => {
    try {
      const response = await axios.get(
       `https://api-project.amandemy.co.id/api/final/products/${id}`
      );
      console.log(response.data.data);
      const product = response.data.data;
      setInput({
        name: product.name,
        harga_display: product.harga_display,
        stock: product.stock,
        image_url: product.image_url,
        is_diskon: product.is_diskon,
        harga_diskon_display: product.harga_diskon_display,
        category: product.category,
        description: product.description,

      })
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetails();
    handleDetail();
  }, [])

  const handleDetail = async () => {
    try {
      const response = await axios.put(
        `https://api-project.amandemy.co.id/api/final/products/${id}`,
        {
            name: input.name,
            harga_display: input.harga_display,
            stock: input.stock,
            harga_diskon_display: input.harga_diskon_display,
            is_diskon: input.is_diskon,
            category: input.category,
            image_url: input.image_url,
            description: input.description,
        }
      );
      console.log(response);
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

    return (
       <div className='mt-40 mx-30'>
        <div className='max-w-6xl h-3/5 rounded-lg overflow-hidden shadow-xl  bg-white mx-auto'>
          <div className='flex justify-start gap-3 text-lg font-semibold text-cyan-500 m-8'>
          <Link to="/">
              <p className=' hover:text-cyan-800'>Home /</p>
            </Link>
            <Link to='/product'>
              <p className=' hover:text-cyan-800'>Products /</p>
            </Link>
            <Link to="/table">
              <p className=' hover:text-cyan-800'>Tabel</p>
            </Link>
          </div>
          <div className='flex gap-8 my-8'>
            <div className='basis-1/2 flex items-center justify-center'>
              <img src={input.image_url} alt="" className='w-64 h-64 object-cover mx-6 mb-10 rounded-lg'/>
            </div>
            <div className='basis-1/2'>
              <h1 className='text-4xl'>{input.name}</h1>
              <p className='text-slate-400 md-2 text-lg mb-5'>{input.category}</p>
              {input.is_diskon === 1 ? (
								<div>
									<p className="text-black text-sm mb-1 line-through">{input.harga_display}</p>
									<p className="text-3xl text-red-500">{input.harga_diskon_display}</p>
								</div>
								) : (
									<p className="text-3xl text-black">{input.harga_display}</p>
								)}
              <p className='text-lg pt-3 mt-5'>{input.description}</p>
              <p className='text-cyan-500 font-bold mt-5'>Stock {input.stock}</p>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Detail