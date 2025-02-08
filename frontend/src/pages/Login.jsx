import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { messageAtom, passwordAtom, successAtom, usernameAtom } from '../atom/Atom'
import { BackendUrl } from '../providers/Provider'
import Message from "../components/Message"

export default function Login({open, onClose}) { 
  const [username, setUsername] = useRecoilState(usernameAtom)
  const [password, setPassword] = useRecoilState(passwordAtom)
  const [message, setMessage] = useRecoilState(messageAtom)
  const [success, setSuccess] = useRecoilState(successAtom)
  const navigate = useNavigate()

  
  const UserSignin =async(e)=>{
    e.preventDefault()
    try{
      const response = await fetch(`${BackendUrl}/user/signin`,{
        method: "POST",
        credentials: "include",
        headers : {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({username, password})
      })
      const result = await response.json()
      setUsername("")
      setPassword("")
      console.log(result)
      if(response.ok){
        setMessage(result.message)
        setSuccess(true)
        setTimeout(() => {
          setMessage("")
          navigate("/")
        }, 2000);
      }else{
        setMessage(result.message)
        setSuccess(false)
        setTimeout(() => {
          setMessage("")
        }, 2000);
      }
    }catch(e){
      setMessage(e.message)
      setSuccess(false)
    }
  }
  return (
    <>
    {open && 
    <div>
    <div className='fixed top-0 left-0 flex items-center justify-center w-screen h-screen opacity-90 bg-slate-600'>
    {message && <Message message={message} success={success} />}
        <div className='relative p-5 py-5 bg-white opacity-100 w-96'>
        <button onClick={onClose} className='absolute text-3xl text-black right-5 '><i className="fa-solid fa-xmark"></i></button>
            <div className='mt-16 space-y-5'>
                <input value={username} onChange={(e)=> setUsername(e.target.value)} className='w-full px-5 py-2 text-xl border border-gray-400 rounded-md' type="text" placeholder='username' />
                <input value={password} onChange={(e)=> setPassword(e.target.value)}  className='w-full px-5 py-2 text-xl border border-gray-400 rounded-md' type="password" placeholder='password' />
                <Link to={"/signup"} className='' href="#">Create an acoount</Link>
                <button onClick={UserSignin} className='w-full py-2 text-xl text-white transition-all duration-300 bg-purple-500 rounded-md hover:cursor-pointer hover:bg-purple-800'>Login</button>
            </div>
        </div>
    </div>
    </div>
    }
    </>
  )
}
