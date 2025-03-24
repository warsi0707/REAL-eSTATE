import {useNavigate } from 'react-router-dom'
import { BackendUrl } from '../providers/Provider'
import { memo, useCallback, useRef } from 'react'
import toast from 'react-hot-toast'


 function Signup() {
   const usernameRef = useRef()
    const passwordRef = useRef()
  const navigate = useNavigate()

  
  const UserSignup =useCallback( async(e)=>{
      e.preventDefault()
      const username = usernameRef.current.value;
      const password = passwordRef.current.value;
      try{
        const response = await fetch(`${BackendUrl}/user/signup`,{
          method: "POST",
          credentials: "include",
          headers : {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({username, password})
        })
        const result = await response.json()
        if(response.ok){
         toast.success(result.message)
          setTimeout(()=>{
            navigate("/")
          },2000)
        }else{
          toast.error(result.message)
        }
      }catch(e){
        toast.error(e.message)
      }
    },[])
  return (
    <div className='flex items-center justify-center h-screen bg-gray-300'>
        <div className='relative p-5 py-5 bg-white opacity-100 w-96'>
            <div className='mt-16 space-y-5'>
                <input ref={usernameRef} className='w-full px-5 py-2 text-xl border border-gray-400 rounded-md' type="text" placeholder='username' />
                <input ref={passwordRef} className='w-full px-5 py-2 text-xl border border-gray-400 rounded-md' type="password" placeholder='password' />
                <button onClick={UserSignup} className='w-full py-2 text-xl text-white transition-all duration-300 bg-purple-500 rounded-md hover:cursor-pointer hover:bg-purple-800'>Signup</button>
            </div>
        </div>
     
    </div>
  )
}
export default memo(Signup)