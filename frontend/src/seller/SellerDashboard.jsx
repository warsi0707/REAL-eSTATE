import { memo, useCallback, useEffect, useState } from 'react'
import SellerHome from './SellerHome'
import { BackendUrl } from '../providers/Provider'

 function SellerDashboard() {
   const [data, setData] = useState([])
      const FetchData =useCallback(async()=>{
          const response = await fetch(`${BackendUrl}/admin/properties`,{
              method :'GET',
              credentials: 'include'
          })
          const result = await response.json()
          if(response.ok){
              setData(result.data)
          }
      },[])
      useEffect(()=>{
          FetchData()
      },[FetchData])
  return (
    <div>
     {/* <SellerNavbar/> */}
     <div className='flex gap-2 '>
      <SellerHome data={data}/>
     </div>
    </div>
  )
}

export default memo(SellerDashboard)