import Navbar from '@/components/Navbar'
import Image from 'next/image'
import Home1 from '@/components/home1'
import Featured from '@/components/featured'
import LatestProducts from '@/components/LatestProducts'
import axios from 'axios'
import { useEffect, useState } from 'react'
import SocialNavBar from '@/components/SocialNavBar'
export default function Home( {user, products} ) {
  // const [products, setProducts] = useState([]);
  // useEffect( () =>{
  //   axios.get("https://ecommerce-sagartmg2.vercel.app/api/products")
  //   .then (res => {
  //     console.log(res.data.data[0].data)
  //     setProducts(res.data.data[0].data)
  //   })

  // },[])
  return (
    <>

      <Home1 />
      <Featured />
      <div className='m-10 grid gap-8 align-middle justify-center'>
        <div className='container '>
        <h2 className='text-3xl font-semibold text-header text-center'>Latest Products</h2>
        {/* <div className='shadow-sm' style={{
              display:"grid",
              gridTemplateColumns:"1fr 1fr 1fr",
              gap:"1rem"
            }}> */}
            {products.length == 0 && <p>loading....</p>}
          <div className='grid grid-cols-1 md:grid-cols-3 gap-2 '>
            {
              products.map(product => {
                return <LatestProducts product={product} key={product._id} />
              })
            }
          {/* <LatestProducts />
          <LatestProducts />
          <LatestProducts />
          <LatestProducts /> */}
        </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps() {
// export async function getStaticProps() {
  let res = await axios.get("https://ecommerce-sagartmg2.vercel.app/api/products?per_page=6")
  return {
    props:{
      products: res.data.data[0].data
    }
  }
}
