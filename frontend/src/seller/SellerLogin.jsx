import {Link, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { messageAtom, passwordAtom, successAtom, usernameAtom } from '../atom/Atom'
import { BackendUrl } from '../providers/Provider'

import Message from '../components/Message'
export default function SellerLogin() {
  const [password, setPassword] = useRecoilState(passwordAtom)
  const [username, setUsername] = useRecoilState(usernameAtom)
  const [message, setMessage] = useRecoilState(messageAtom)
  const [success, setSuccess] = useRecoilState(successAtom)
  const backendUrl = BackendUrl
  const navigate = useNavigate()

  const Signin =async(e)=>{
    e.preventDefault()
      const response = await fetch(`${backendUrl}/admin/signin`,{
        method: "POST",
        body: JSON.stringify({username, password}),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include"
      })
      const result = await response.json()
      console.log(result)
      if(response.ok){
        setUsername("")
        setPassword("")
        setSuccess(true)
        setMessage(result.message)
        setTimeout(() => {
          setMessage("")
          navigate("/seller/dashboard")
        }, 3000);
      }else{
        setSuccess(false)
        setMessage(result.message)
        setTimeout(() => {
          setMessage("")
        }, 3000);
      }
  }
  return (
    <div className='fixed top-0 left-0 flex items-center justify-center w-screen h-screen opacity-90 bg-slate-600'>
    <div className='relative p-5 py-5 bg-white opacity-100 w-96'>
        <div className='mt-16 space-y-5'>
        <h1 className='text-xl font-bold text-center'>Seller Login</h1>
            <input value={username} onChange={(e)=> setUsername(e.target.value)} className='w-full px-5 py-2 text-xl border border-gray-400 rounded-md' type="text" placeholder='username' />
            <input value={password} onChange={(e)=> setPassword(e.target.value)}  className='w-full px-5 py-2 text-xl border border-gray-400 rounded-md' type="password" placeholder='password' />
            <Link to={"/seller/signup"} className=''>Create an acoount</Link>
            <button onClick={Signin} className='w-full py-2 text-xl text-white transition-all duration-300 bg-purple-500 rounded-md hover:cursor-pointer hover:bg-purple-800'>Login</button>
        </div>
    </div>
    {message &&<Message message={message} success={success}/>}
</div>
  )
}
