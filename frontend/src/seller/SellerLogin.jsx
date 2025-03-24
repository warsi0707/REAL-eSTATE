import {Link, useNavigate } from 'react-router-dom'
import { BackendUrl } from '../providers/Provider'
import { memo, useCallback, useRef } from 'react'
import toast from 'react-hot-toast'

function SellerLogin() {
  const usernameRef = useRef()
  const passwordRef = useRef()
  const backendUrl = BackendUrl
  const navigate = useNavigate()

  const Signin =useCallback(async(e)=>{
    e.preventDefault()
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
      const response = await fetch(`${backendUrl}/admin/signin`,{
        method: "POST",
        body: JSON.stringify({username, password}),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      const result = await response.json()
      if(response.ok){
        toast.success(result.message)
        setTimeout(() => {
          navigate("/seller/dashboard")
        }, 2000);
      }else{
       toast.error(result.message)
      }
  },[])
  return (
    <div className='flex items-center justify-center w-screen h-screen  opacity-90 bg-slate-600'>
    <div className='relative p-5 py-5 bg-white opacity-100 w-96'>
        <div className='mt-16 space-y-5'>
        <h1 className='text-xl font-bold text-center'>Seller Login</h1>
            <input ref={usernameRef} className='w-full px-5 py-2 text-xl border border-gray-400 rounded-md' type="text" placeholder='username' />
            <input ref={passwordRef}  className='w-full px-5 py-2 text-xl border border-gray-400 rounded-md' type="password" placeholder='password' />
            <Link to={"/seller/signup"} className=''>Create an acoount</Link>
            <button onClick={Signin} className='w-full py-2 text-xl text-white transition-all duration-300 bg-purple-500 rounded-md hover:cursor-pointer hover:bg-purple-800'>Login</button>
        </div>
    </div>
</div>
  )
}

export default  memo(SellerLogin)