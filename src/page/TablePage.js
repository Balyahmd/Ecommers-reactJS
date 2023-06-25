import React, { useContext, useEffect, useState } from 'react'
import Table from '../component/Table'
import Navbar from '../component/Navbar';
import { Link } from 'react-router-dom';

function TablePage() {
  return (
    <div>
        <Navbar/>
        <div className='my-40 mx-20'>
        <h1 className='text-3xl font-bold text-center text-cyan-500 max-w-full mx-auto '>Table Products</h1>
        <div className='flex justify-end max-w-full mx-auto w-full mt-5'>
            <Link to='/create'>
            <button class="text-cyan-500 border-2 border-cyan-500 rounded-lg px-6 py-2 hover:bg-cyan-500 hover:text-white transition-all delay-75 flex items-center gap-2">
              Create Products <span class="text-4xl mb-2 leading-5">+</span></button>
            </Link>
            <div>
      </div>
        </div>
        <Table/>
        </div>
    </div>
  )
}

export default TablePage