import React from 'react'
import { useSelector } from 'react-redux'


export default function useAuthenticate() {
    const redux_user = useSelector(store => store.user.value)
    return (cb) => {
        if(!redux_user){
            alert("login required")
            return;
        } else {
            cb();
        }
    }
//     return (
//     <div>useAuthenticate</div>
//   )
}
