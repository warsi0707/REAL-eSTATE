import { Link, useNavigate } from 'react-router-dom'
import { BackendUrl } from '../providers/Provider'
import { memo, useCallback, useContext, useRef } from 'react'
import toast from 'react-hot-toast'
import AuthContext from "../context/authContext"

function Login({open, setopen}) { 
  const { setIsUserLogin} = useContext(AuthContext)
  const usernameRef = useRef()
  const passwordRef = useRef()
  const navigate = useNavigate()

  
  const UserSignin =useCallback( async(e)=>{
    e.preventDefault()
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
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
      if(response.ok){
        setIsUserLogin(true)
        toast.success(result.message)
        setTimeout(() => {
          setopen(false)
          navigate("/")
        }, 2000);
      }else{
        toast.error(result.message)
      }
    }catch(e){
      toast.error(e.message)
    }
  },[])
  return (
    <>
    {open && 
    <div>
    <div className='fixed top-0 left-0 flex items-center justify-center w-screen h-screen opacity-90 bg-slate-600'>
        <div className='relative p-5 py-5 bg-white opacity-100 w-96'>
        <button onClick={()=> setopen(!open)} className='absolute text-3xl text-black right-5 '><i className="fa-solid fa-xmark"></i></button>
            <div className='mt-16 space-y-5'>
                <input ref={usernameRef} className='w-full px-5 py-2 text-xl border border-gray-400 rounded-md' type="text" placeholder='username' />
                <input ref={passwordRef}  className='w-full px-5 py-2 text-xl border border-gray-400 rounded-md' type="password" placeholder='password' />
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
export default  memo(Login)