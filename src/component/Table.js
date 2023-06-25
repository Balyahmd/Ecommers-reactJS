import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
function Table() {
  const { products, fetchProducts, loading } = useContext(GlobalContext);
  const [filterArr, setFilterArr] = useState([]);
  const [filter, setFilter] = useState({
    category: "",
    search: "",
  });

  const onDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://api-project.amandemy.co.id/api/final/products/${id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
      );
      Swal.fire({
        title: 'Apakah Kamu yakin?',
        text: "Anda tidak akan dapat mecari product ini lagi!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Product Telah Berhasil Dihapus.',
            'success',
            fetchProducts(),
          )
        }
      })
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: 'Maaf Product gagal dihapus',
        icon: 'error',
      })
    }
  };

  const handleChange = (event) => {
    if(event.target.name === 'category'){
      setFilter({...filter, category: event.target.value});
    } else if(event.target.name === 'search'){
      setFilter({...filter, search: event.target.value});
    }
  }

  const handleSearch = () => {
    let productArr = structuredClone(products);
    if(filter.category !== ''){
      productArr = productArr.filter((item)=>{
        return item.category.toString() === filter.category;
      });
    };
    
    if(filter.search !== ''){
      productArr = productArr.filter((item)=>{
        return item.name.toLowerCase().includes(filter.search.toLowerCase());
      });
    }
    setFilterArr(productArr);
  };

  const onReset = () => {
    setFilter({
      category: "",
      search: "",
    });
    setFilterArr(products);
  }

  useEffect(()=> {
    fetchProducts();
  },[]);

  useEffect(()=> {
    setFilterArr(products);
  },[products]);

  return (
    < div className="max-w-full mx-auto w-full my-4">
      {loading === true ? (
        <h1 className="text-center text-3xl font-bold text-cyan-500">Loading ...</h1>
      ) : (
        <div>
        <div className='flex justify-end gap-4 mb-3'>
        <select onChange={handleChange} id="" class="py-2 px-2 rounded-md bg-white border border-gray-400 w-48" name="category" value={filter.category}>
            <option value="" disabled="">Filter kategori</option>
            <option value="teknologi">Teknologi</option>
            <option value="makanan">Makanan</option>
            <option value="minuman">Minuman</option>
            <option value="hiburan">Hiburan</option>
            <option value="kendaraan">Kendaraan</option>
        </select>
        <input onChange={handleChange} type="text" name="search" class="col-span-full border-2 rounded-lg px-2 py-1" placeholder="Search" value={filter.search}/>
        <button onClick={handleSearch} className='text-white border-2 border-cyan-500 bg-cyan-500 rounded-lg px-5 py-2'>Search</button>
        <button onClick={onReset} className='text-white border-2 border-red-500 bg-red-500 rounded-lg px-5 py-2'>Reset</button>
      </div>
        <table className="border border-gray-500 w-full text-lg">
          <thead>
            <tr>
              <th className="border border-gray-500 p-2">ID</th>
              <th className="border border-gray-500 p-2">Nama</th>
              <th className="border border-gray-500 p-2">Keaktifan Diskon</th>
              <th className="border border-gray-500 p-2">Harga</th>
              <th className="border border-gray-500 p-2">Harga Diskon</th>
              <th className="border border-gray-500 p-2">Kategori</th>
              <th className="border border-gray-500 p-2">Gambar</th>
              <th className="border border-gray-500 p-2">Dibuat Oleh</th>
              <th className="border border-gray-500 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filterArr.map((product) => {
              return (
                <tr>
                  <td className="border border-gray-500 p-2">{product.id}</td>
                  <td className="border border-gray-500 p-2">{product.name}</td>
                  <td className="border border-gray-500 p-2">
                    {product.is_diskon === true ? "Aktif" : "Tidak aktif"}
                  </td>
                  <td className="border border-gray-500 p-2">{product.harga_display}</td>
                  <td className="border border-gray-500 p-2">{product.harga_diskon_display}</td>
                  <td className="border border-gray-500 p-2">{product.category}</td>
                  <td className="border border-gray-500 p-2">
                    <img src={product.image_url} alt="" className="w-64" />
                  </td>
                  <td className="border border-gray-500 p-2">
                    {product.user !== null ? product.user.name : "-"}
                  </td>
                  <td className="border border-gray-500 p-2">
                  <div className="flex gap-2">
                      <Link to={`/edit/${product.id}`}>
                      <button
                        className="rounded-lg px-4 py-2 bg-yellow-600 text-white">Update
                      </button>
                      </Link>    
                      <button
                        onClick={() => onDelete(product.id)}
                        className="rounded-lg px-4 py-2 bg-red-600 text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
      )}
      </div>
  );
}
export default Table;
