import React from 'react'
import Image from 'next/image'
import NoImage from '@/assets/Image_not_available.png'
import Link from 'next/link'
import { AiOutlineOrderedList } from 'react-icons/ai'
import { BsFillGrid1X2Fill } from 'react-icons/bs'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '@/redux/slice/cartSlice'
import SellerComponent from './SellerComponent'

export default function Products({products, categories, metadata, user}) {
    const router = useRouter();
    const dispatch = useDispatch();
    const redux_user = useSelector((redux_store)=> {
        return redux_store.user.value
    })
    // let addProductComponent = <div className='container'>
    // <Link href="/seller/products/create">Add Products</Link>
    // </div>
  return (
    <>
    {/* bread crump */}
    <div className='py-24 bg-primary-tint flex justify-center'>
        <div className='container'>
            <p className='text-3xl font-bold text-header'> Shop Left Sidebar</p>
            <p>
                <Link rel="stylesheet" href="/" >Home  </Link>  &gt; <Link rel="stylesheet" href="/products" > Products  </Link> &gt; sidebar
            </p>
        </div>
        </div>
        <SellerComponent>
            <div className='container'>
            <Link href="/seller/products/create">Add Products</Link>
            </div>
        </SellerComponent>
        <div className='flex justify-center py-24'>
        <div className='container flex flex-col md:flex-row justify-between items-center text-center gap-4'>
            <div>
                <p className='font-bold text-2xl text-header'>Ecommerce Acceories & Fashion item</p>
                <p>Total - {metadata.total}</p>
            </div>
            <form className='flex flex-wrap gap-3'>
                <div>
                    <label > Per Page</label>
                    <select onChange={(e) => {
                        e.preventDefault();


                        let url = router.route + "?";

                        router.query.per_page = e.target.value

                        let arr = Object.entries(router.query)

                        arr.forEach(el => {
                            url+=  `${el[0]} = ${el[1]}&`
                        })
                        router.push(url)



                        // router.per_page = e.target.vlaue
                        // router.push(`${router.route}?per_page=${e.target.value}`)
                    }}>
                        <option value="3">3</option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                    </select>
                </div>
                <div>
                    <label>
                    Sort By:
                    </label>
                    <select onChange={(e) => {
                        e.preventDefault();
                        router.push(`${router.route}?sort=${e.target.value}`)
                    }}>
                        <option value="nameasc">Name Asc</option>
                        <option value="namedesc">Name Desc</option>
                        <option value="priceasc">Price Asc</option>
                        <option value="pricedesc">Price Desc</option>
                    </select>
                </div>
                <div>
                    View:
                    <AiOutlineOrderedList className='inline ml-3'/>
                    <BsFillGrid1X2Fill className='inline ml-3' />
                </div>
            </form>
        </div>
        </div>
        <div className='flex justify-center'>
        <div className="container md:grid md:grid-cols-4">
            <div>
                <div>
                    <p>Categories</p>
                    {
                        categories.map((cat, index) => {
                            return <>
                            <div>
                                <input onChange={(e) => {
                                router.push(`${router.route}?search_term=${e.target.name}`)
                                }} type='checkbox' id={`${cat}-${index}`} name={`${cat}`} /> <label htmlFor={`${cat}-${index}`} >{cat}</label>
                            </div>
                            </>
                        })
                    }
                </div>
            </div>
            <div className=' grid gap-2 col-start-2 col-end-5'>
                <div className='bg-primary p-3'>
                    <p>Products</p>
                </div>
                {
                    products.map(product =>{
                        return (
                            <>
                            <Link href={`products/${product._id}`}>
                            <div className='border p-3 flex gap-2 shadow-md'>
                                { 
                                    product.images.length == 0 ?
                                    <Image className='w-1/4' src={NoImage} width={1000} height={1000}/>
                                    :
                                    <Image className='w-1/4' src={product.images[0]} width={1000} height={1000}/>
                                }
                                <div>
                                    <p className='uppercase text-2xl'>{product.name}</p>
                                    <p>Price: $ {product.price}</p>
                                    <p>{product.description}</p>

                                        {
                                            redux_user?.role != "seller"
                                            &&
                                            <button onClick={(e) => {
                                                e.preventDefault();
                                                dispatch(addToCart(product))
                                                
                                            }} className='border bg-secondary text-white'>Add to Cart</button>

                                        }

                                        <SellerComponent>
                                            <Link href={`/seller/products/edit/${product._id}`}> Edit</Link>
                                            <button>Delete</button>
                                        </SellerComponent>

                                </div>
                            </div>
                            </Link>
                            </>
                        )
                    })
                }
            </div>
        </div>
        </div>
    </>
  )
}