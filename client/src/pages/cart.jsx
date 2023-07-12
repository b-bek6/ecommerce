import ProtectedPage from '@/components/ProtectedPage'
import React, { useEffect } from 'react'

function Cart() {
  return (
    <>
      <selection>
        List of cart items
       </selection>

    </>
  )
}

// hoc 
export default ProtectedPage(Cart,"buyer")