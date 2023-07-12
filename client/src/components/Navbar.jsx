import { AiOutlineSearch } from "react-icons/ai"
import Link from "next/link"
import SocialNavBar from "./SocialNavBar"
import { useRouter } from "next/router"
import { useSelector } from "react-redux"
import SellerComponent from "./SellerComponent"

export default function Navbar({user, setUser}){
    const redux_user = useSelector(redux_store => {
        return redux_store.user.value
    })
    const router = useRouter() // for navigation
    function handleSearch(e) {
        e.preventDefault()
        router.push("/products?search_term="+e.target.search_term.value)
    }
    return (
        <>
            {/* <header className="p-2 gap-2 bg-[#EEEFFB]  items-center justify-around h-[78px]"> */}
            <header >
                <SocialNavBar user={user} setUser={setUser}/>
                <div className="p-2 flex justify-center">
                    <div className="container py-2 gap-2 flex flex-col justify-between items-center md:flex-row ">
                    <div>
                    <logo href={"/"} className='text-4xl font-bold text-[#0D0E43]'>Heko</logo>
                </div>
                <div>
                    <nav>
                        <ul className="flex p-2 justify-center align-middle gap-[4vw] font-light">
                            <li><Link href={"/"}>Home </Link></li>
                            <li>Pages</li>
                            
                            {/* <ProtectedComponent role = 'buyer'>

                            </ProtectedComponent> */}

                            <SellerComponent >
                                <li><Link href={"/seller/products"}>Seller Products</Link></li>
                            </SellerComponent>
                            {
                                redux_user?.role == "buyer" 
                                &&
                                <>
                                <li><Link href={"/products"}>Products</Link></li>
                                  <li><Link href={"/cart"}>Cart</Link></li>
                                <li><Link href={"/order"}>Order</Link></li>
                                </>
                            }
                            <li>Contact</li>
                        </ul>
                    </nav>
                </div>
                <form className="flex mt-3" onSubmit={handleSearch}>
                    <input type="text" name="search_term" className="border w-full outline-none px-2" />
                    {/* value={router.query.search_term} */}
                    <button className="bg-secondary text-white p-2 inline">
                        <AiOutlineSearch className="inline"/>
                    </button>
                </form>
                    </div>
                </div>
            </header>
        </>
    )
}