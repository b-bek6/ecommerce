import React from 'react'
import axios from 'axios'
import Navbar from '@/components/Navbar'
import Image from 'next/image'
import NoImage from '@/assets/Image_not_available.png'
import SocialNavBar from '@/components/SocialNavBar'
import Link from 'next/link'
import { AiOutlineOrderedList } from 'react-icons/ai'
import { BsFillGrid1X2Fill } from 'react-icons/bs'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { addToCart } from '@/redux/slice/cartSlice'
import AllProducts from '@/components/Products'
export default function Products(props) {
    const router = useRouter();
    const dispatch = useDispatch();
  return (
    <AllProducts {...props}/>
  )
}

export async function getServerSideProps(ctx) { //appContext = ctx
    // let url = `https://ecommerce-sagartmg2.vercel.app/api/products?per_page=${ctx.query.per_page}&search_term=${ctx.query.search_term}`;
    let url = `https://ecommerce-sagartmg2.vercel.app/api
    /products?`;
    let params = Object.entries(ctx.query);
    params.forEach(parameter => {
        url += `${parameter[0]}=${parameter[1]}&`
    })
    
      let res = await axios.get(url)

      let categories_res = await axios.get("https://ecommerce-sagartmg2.vercel.app/api/products/categories")
      return {
        props:{
          products: res.data.data[0].data,
          metadata: res.data.data[0].metadata[0],
          categories: categories_res.data,
        }
      }
    }