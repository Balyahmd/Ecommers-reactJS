import React, { useContext, useEffect } from 'react'
import Navbar from '../component/Navbar';
import { GlobalContext } from '../context/GlobalContext';
import Product from '../component/Product';
import { Link } from 'react-router-dom';

function ProductsPage() {
    const { products, setProducts, fetchProducts, loading } = useContext(GlobalContext);

    useEffect(()=> {
        fetchProducts();
    },[]);

  return (
    <div>
        <Navbar/>
        <div div className='mt-40 mx-10'>
        {loading === true ? (
                <h1 className='text-center text-2xl font-bold text-cyan-500'>Loading .....</h1>
             ):(
                <div className='mx-auto max-w-7xl'>
                <h1 className='text-3xl font-bold text-cyan-500 mt-20'>Catalog Product</h1>    
                <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-8 items-stretch overflow-hidden'>
                    {products.map((item, index) => {
                        return (
                            <Link to={`/detail/${item.id}`}>
                                <Product product={item}/>
                            </Link>
                            );
                        })
                        }
                </div>
                </div>
            )}
        </div>
    </div>
  )
}

export default ProductsPage