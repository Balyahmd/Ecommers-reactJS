import React from 'react'

function Product({product}) {
  return (
    <div className='h-80 lg:h-auto rounded-xl overflow-hidden shadow-xl flex flex-col bg-white'>
        <img src={product.image_url} className='w-full h-44 lg:h-60 object-cover rounded-t-xl' alt="" />
        <div className='px-4 py-2'>
          <h1 className='font-bold text-lg mb-2'>{product.name}</h1>
            {product.is_diskon === true ? (
              <div>
                <p className="text-black text-sm mb-1 line-through">{product.harga_display}</p>
                <p className="text-xl text-red-500">{product.harga_diskon_display}</p>
              </div>
            ) : (
              <p className="text-xl text-black">{product.harga_display}</p>
            )}
            <p className='text-cyan-500 font-bold'>Stock {product.stock}</p>
        </div>
      </div>
  )
}

export default Product
