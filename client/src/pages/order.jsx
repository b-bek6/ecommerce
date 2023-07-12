import ProtectedPage from '@/components/ProtectedPage'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

function order() {
    let redux_user = useSelector((redux_store) => { 
        return redux_store.user.value
      })
      let router = useRouter()
    
      useEffect(() => {   
        if(!redux_user){
          router.push("/login")
        }
      },[])
  return (
    <div>order</div>
  )
}

export default ProtectedPage(Order, "buyer")