import { SELLER } from '@/const/roles';
import React from 'react'
import { useSelector } from 'react-redux'

export default function SellerComponent({children}) {
    const redux_user = useSelector(store => store.user.value)
    if(redux_user && redux_user.role == SELLER) {
        return (
            <>
          {/* <p>Seller components..</p> */}
          {
              children
            }
          </>
        )
    }
    return null;
}
