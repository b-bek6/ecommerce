import Navbar from '@/components/Navbar'
import axios from 'axios';
import React, { useState } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { setReduxUser } from '@/redux/slice/userSlice';
import { useDispatch } from 'react-redux';

export default function Login({user, setUser}) {
    const dispatch = useDispatch()
    const router = useRouter();
    let [email, setEmail] = useState("")
    // let [field_errors, setFieldErrors] = useState({}) 

  const [isSubmitting, setIsSubmitting] = useState(false)

    let [error, setErrors] = useState("") // invalid credentials
    function handleSubmit(event){
        event.preventDefault(); 
        /* 
            check if our form datas are valid
            if()
        */

        let temp = {} // temp = { name: "required, email:" required}
        let validation = true
        // if(!email){
        //     temp.email = 'required'
        //     let validation = false
        // }

        // setErrors(temp);
        
      //  if(!event.target.name.value) {
      //   document.getElementById 
      //   return
      //  }
       if(validation){
        setIsSubmitting(true);
        axios.post("https://ecommerce-sagartmg2.vercel.app/api/users/login", {
          "password": event.target.password.value,
          "email": email
        })
           .then(res => {
            dispatch(setReduxUser(res.data.user))
            // setUser(res.data.user);
            setIsSubmitting(false) 
            // router.push('/')
            localStorage.setItem("access_token", res.data.access_token);
            
          })
          .catch(err => {
              setIsSubmitting(false)
               console.log(err);
            //    let arr = res.data.errors;
            //    console.log(arr);
              //  let temp = {}
              setErrors(err.response.data.msg)
           })
       }
    }
  return (
    <>

        <div className='flex justify-center'>
            <form className='container' onSubmit={handleSubmit}>
              {
                error 
                &&
                <p className='bg-red-200 p-3'>{error}</p>
              }
            <div class="mb-6">
                <label htmlFor="email" class="form-label">Your email</label>
                <input type="email" name="email" value={email} onChange={(e)=>{
                    setEmail(e.target.value);
                }} class="form-control" placeholder="name@flowbite.com"  />
               
            </div>
            <div class="mb-6">
                <label htmlFor="password" class="form-label">Your password</label>
                <input type="password" name="password" class="form-control"  />
                
            </div>
            <button type="submit" disabled={isSubmitting} class="text-white disabled:bg-blue-100 bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600  dark:focus:ring-blue-800">{isSubmitting && "spinner.."} Submit</button>
            {/* {
              isSubmitting
              &&
              <span>Loading...</span>
            } */}
                <p>Not a user <Link href={"/signup"}>  SignUP</Link></p>
            </form>
        </div>
    </>
    
  )
}
