import SellerNavbar from './SellerNavbar'
import SellerCard from './SellerCard'
import useSellerData from '../hooks/useSellerData'
import { useRecoilState } from 'recoil'
import { messageAtom, successAtom } from '../atom/Atom'
import { BackendUrl } from '../providers/Provider'
import Message from '../components/Message'

export default function SellerHome() {
  const data =useSellerData()
  const [message, setMessage] = useRecoilState(messageAtom)
  const [success, setSuccess] = useRecoilState(successAtom)
  
  const Delete =async(id)=>{
    const response = await fetch(`${BackendUrl}/admin/property/${id}`,{
      method :'DELETE',
      credentialsl: 'include'
    })
    const result = await response.json()
    if(response.ok){
      setMessage(result.message)
      setSuccess(true)
    }else{
      setMessage(result.message)
      setSuccess(false)
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
     {message && <Message message={message} success={success}/>}
     {data.map((item)=>(
        <div key={item._id} className='mx-auto my-10'>
          <SellerCard title={item.title}  price={item.price} location={item.location} image={item.image} id={item._id} ondelete={Delete} />
        </div>
      ))}
    </div>
  )
}
