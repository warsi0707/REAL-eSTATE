import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { adminAuthenticatedAtom, messageAtom, successAtom } from '../atom/Atom'
import { BackendUrl } from '../providers/Provider'
import Message from '../components/Message'

export default function SellerNavbar() {
  const [isAdminLogin, setIsAdminLogin] = useRecoilState(adminAuthenticatedAtom)
  const [message, setMessage] = useRecoilState(messageAtom)
  const [success, setSuccess] = useRecoilState(successAtom)
  const navigate = useNavigate()

  const Logout =async()=>{
    const response = await fetch(`${BackendUrl}/admin/logout`,{
      method: 'POST',
      credentials: 'include'
    })
    const result = await response.json()
    if(response.ok){
      setMessage(result.message)
      setIsAdminLogin(false)
      setTimeout(() => {
        navigate("/seller/signin")
        setMessage("")
      }, 2000);
    }else{
      setMessage(result.message)
    }
  }
  return (
    <>
    <div className='fixed flex items-center justify-between px-5 py-2 bg-gray-500 md:w-[1300px] left-48 md:py-5'>
        <div className='flex md:gap-5'>
            <Link to={"/seller/dashboard"} className='md:text-2xl'>Admin Portal</Link>
            <Link to={"/"} className='md:text-2xl'>Home</Link>
            </div>
        <div className='flex gap-2 md:gap-10 md:text-xl'>
          {isAdminLogin&& <Link className='flex items-center justify-center transition-all duration-300 border-2 border-purple-400 rounded-md md:p-2 hover:bg-purple-400 hover:shadow-xl' to={"/seller/add"}>Publish your property</Link>}
            <button onClick={Logout} className='p-2 transition-all duration-300 border border-red-500 rounded-md hover:bg-red-500 hover:shadow-md'>Logout</button>
        </div>
    </div>
   {message && <Message message={message} success={success}/>}
    </>
  )
}
