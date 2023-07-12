import Image from "next/image"
import chair from '@/assets/chair.png'
import { useEffect, useState } from "react"
import axios from "axios";

export default function Featured(){
  // let [trending, updateTrending] = useState([]);
  // useEffect(()=>{
    // axios.get("https://ecommerce-sagartmg2.vercel.app/api/products/trending")
    // .then(res=>{
    //   console.log(res.data.data)
    //   console.log(res.data.data[0].name)
    //   console.log("above is the res")
    //   updateTrending = res.data.data;
    // })
  // },[])
    const [trending, setTrending] = useState([]);
  useEffect( () =>{
    axios.get("https://ecommerce-sagartmg2.vercel.app/api/products/trending")
    .then (res => {
      setTrending(res.data.data)
    })
  },[])
    return(<>
        <div className='m-10 grid gap-8 align-middle justify-center'>
        <div className='container '>
        <h2 className='text-4xl font-semibold text-header text-center'>Trending Products</h2>
        <div className='flex justify-centers flex-col flex-wrap gap-1 md:flex-row'>
        {
          trending.map( trending => {
            return(
                    <div className=' border shadow-sm items-center flex flex-col'>
                    <Image src={trending.images[0]} className='bg-[#F6F7FB] object-contain aspect-square' height={200} width={200}/>
                    <div className='text-center'>
                      <p className='text-secondary text-xl'>{trending.name}</p>
                      <p className='test-header'>$ {trending.price} </p>
                    </div>
                  </div>

            )
          })
        }
          {/* <div className=' border shadow-sm items-center flex flex-col'>
            <Image src={chair} className='bg-[#F6F7FB]' height={200} width={200}/>
            <div className='text-center'>
              <p className='text-secondary text-xl'>Cantilever Chair</p>
              <p className='test-header'>Code: XYZ</p>
              <p className='test-header'>$ 100 </p>
            </div>
          </div>
          <div className=' border shadow-sm items-center flex flex-col'>
            <Image src={chair} className='bg-[#F6F7FB]' height={200} width={200}/>
            <div className='text-center'>
              <p className='text-secondary text-xl'>Cantilever Chair</p>
              <p className='test-header'>Code: XYZ</p>
              <p className='test-header'>$ 100 </p>
            </div>
          </div>
          <div className=' border shadow-sm items-center flex flex-col'>
            <Image src={chair} className='bg-[#F6F7FB]' height={200} width={200}/>
            <div className='text-center'>
              <p className='text-secondary text-xl'>Cantilever Chair</p>
              <p className='test-header'>Code: XYZ</p>
              <p className='test-header'>$ 100 </p>
            </div>
          </div> */}
        </div>
        </div>
      </div>
        </>)
}