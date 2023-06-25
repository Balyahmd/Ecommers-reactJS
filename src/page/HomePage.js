import React, {useContext, useEffect} from 'react';
import { GlobalContext } from '../context/GlobalContext';
import Product from '../component/Product';
import Navbar from '../component/Navbar';
import Bg from '../img/combineBg.webp';
import { Link } from 'react-router-dom';

function HomePage() {
    const { products, setProducts, fetchProducts, loading } = useContext(GlobalContext);

    useEffect(()=> {
        fetchProducts();
    },[]);

    return (
    <div>
        <Navbar/>
        <div className='mt-40 mx-10'>
            <img src={Bg} alt=""  className='rounded-xl h-96 w-full mx-auto max-w-6xl'/>
             {loading === true ? (
                <h1 className='text-center text-2xl font-bold text-cyan-500'>Loading .....</h1>
             ):(
                <div className='mx-auto max-w-7xl'>
                <div className='flex justify-between mt-20'>
                 <h1 className='text-3xl font-bold text-cyan-500'>Catalog Product</h1>    
                    <Link to={'/product'}>
						<button className="text-cyan-500 border-2 border-cyan-500 rounded-lg px-6 py-2 hover:bg-cyan-500 hover:text-white transition-all delay-75 items-center">
							See More
						</button>
				</Link>
                </div>
                <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-8 items-stretch overflow-hidden'>
                    {products.slice(0, 4).map((item, index) => {
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

export default HomePage