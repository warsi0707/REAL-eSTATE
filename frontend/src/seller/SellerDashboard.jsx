import React from 'react'
import SellerNavbar from './SellerNavbar'
import SellerHome from './SellerHome'
import Sidebar from './Sidebar'
import AddProperty from './AddProperty'

export default function SellerDashboard() {
  return (
    <div>
     {/* <SellerNavbar/> */}
     <div className='flex gap-2 '>
      <Sidebar/>
      <SellerHome/>
     </div>
    </div>
  )
}
