import React from 'react'
import Image from 'next/image'
import chair from '@/assets/chair.png'
import NoImage from '@/assets/Image_not_available.png'
import {AiOutlineShoppingCart} from "react-icons/ai"
export default function LatestProducts(props) {
    let {name, price, images } = props.product
  return (
    <div>
        <div className=' border shadow relative hover:border-primary group'>
            {/* <Image  src={`${images.length == 0 ? NoImage : images[0] }`} alt='' className='bg-[#F6F7FB] w-full object-contain, aspect-square' height={200} width={200}/> */}
            {
              images.length == 0 ?
              <Image  src={NoImage} alt='' className='bg-[#F6F7FB] w-full object-contain, aspect-square' height={200} width={200}/>
              :
              <Image  src={images[0]} alt='' className='bg-[#F6F7FB] w-full object-contain, aspect-square' height={200} width={200}/>
            }
            <div className='p-2 absolute top-[50%] group-hover:flex  hidden flex rounded-xl bg-primary-tint  h-8 w-8 justify-center items-center'>
            <AiOutlineShoppingCart/>
            </div>

            <div className='flex justify-between' >
            <p className='text-secondary text-xl'>{name}</p>
            <p className='test-header'>$ {props.product.price} </p>
            </div>
        </div>
    </div>
  )
}
