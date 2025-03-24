import SellerNavbar from './SellerNavbar'
import SellerCard from './SellerCard'
import { BackendUrl } from '../providers/Provider'
import toast from 'react-hot-toast'
import { memo } from 'react'

function SellerHome({data}) {
  
  const Delete =async(id)=>{
    const response = await fetch(`${BackendUrl}/admin/property/${id}`,{
      method :'DELETE',
      credentialsl: 'include'
    })
    const result = await response.json()
    if(response.ok){
      toast.success(result.message)
    }else{
      toast.error(result.message)
    }
  }
  if(data.length ===0){
    return (
      <div className='w-full h-screen'>
        <SellerNavbar/>
       <h1 className='mt-20 text-3xl font-bold text-center'>Data Not found</h1>
      </div>
    )
  }
  return (
    <div className='w-full '>
      <SellerNavbar/>
     {data.map((item)=>(
        <div key={item._id} className='mx-auto my-10'>
          <SellerCard title={item.title}  price={item.price} location={item.location} image={item.image} id={item._id} ondelete={Delete} />
        </div>
      ))}
    </div>
  )
}
export default memo(SellerHome)