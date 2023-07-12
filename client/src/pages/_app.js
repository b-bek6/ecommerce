import '@/styles/globals.css'
// import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { store } from '../redux/store';
import axios from 'axios';
import { setReduxUser, stopLoading } from '@/redux/slice/userSlice';
import { setCartItems } from '@/redux/slice/cartSlice';
import Navbar from '@/components/Navbar';


function App({ Component, pageProps }) {
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  

  useEffect(()=>{
    if (localStorage.getItem("access_token")) {
      axios.get("https://ecommerce-sagartmg2.vercel.app/api/users/get-user", {
        headers:{
          Authorization: "Bearer " + localStorage.getItem("access_token")
        }
      })
      .then(res => {
        dispatch(setReduxUser(res.data));
      })
      let cart_items = JSON.parse(localStorage.getItem("cart_items"));
        dispatch(setCartItems(cart_items))
    }
    else {
      dispatch(stopLoading())
    }

  }, [])

  return <>
  <Navbar />
    <Component user={user} {...pageProps}  setUser={setUser}/>
  </>
}

//  Higher Order Component (HOC)
/* 
  A component which returns another component
*/


// export default function withRedux ({ Component, pageProps }) {
//   return <>
//     <Provider store={store}>
//       <App Component={Component} pageProps={pageProps} />
//     </Provider>
  
//   </>
// }



const withReducProvider = (App) => {
  function wrapper (props) {
    // const [user, setUser] = useState(null)
    return <>
      <Provider store={store} >
      <App {...props} />
      </Provider>
    </>
  }
  return wrapper
}
export default withReducProvider(App)