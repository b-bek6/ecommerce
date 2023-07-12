import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

export default function ProtectedPage( PageComponent, role ) {
    // let redux_user = useSelector((redux_store) => { 
    //     return redux_store.user.value
    //   })
    function Wrapper () {
      let {isLoading, value:redux_user} = useSelector((redux_store) => { 
        return redux_store.user
      })
        let router = useRouter()
      
        if(isLoading){
          return <>Loading... </>
        } else if(!redux_user){
          router.push("/login")
        } else if(role && redux_user.role !== role){
          return <><p>Forbidden </p></>
        }

        // useEffect(() => {   
          if(!redux_user){
          }
        // },[])
    return <>
    < PageComponent  />
    </>
  }
  return Wrapper
}
