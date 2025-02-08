import { Link } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { messageAtom, passwordAtom, successAtom, usernameAtom } from '../atom/Atom'
import {BackendUrl} from "../providers/Provider"
import Message from '../components/Message'
import { useNavigate } from 'react-router-dom'

export default function SellerSignup() {
  const [username, setUsername] = useRecoilState(usernameAtom)
  const [password, setPassword] = useRecoilState(passwordAtom)
  const [message, setMessage] = useRecoilState(messageAtom)
  const [success, setSuccess] = useRecoilState(successAtom)
  const backendUrl = BackendUrl
  const navigate = useNavigate()


  const Signup =async(e)=>{
    e.preventDefault()
    const response = await fetch(`${backendUrl}/admin/signup`,{
      method: "POST",
      body: JSON.stringify({username, password}),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const result =await response.json()
    if(response.ok){
      setMessage(result.message)
      setSuccess(true)
      setUsername("")
      setPassword("")
      setTimeout(() => {
        setMessage("")
        navigate("/seller/signin")
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
    <div>
       <div className='fixed top-0 left-0 flex items-center justify-center w-screen h-screen gap-5 opacity-90 bg-slate-600'>
        <div className='relative p-5 py-5 bg-white opacity-100 w-96'>
            <div className='mt-16 space-y-5'>
            <h1 className='text-xl font-bold text-center'>Seller Signup</h1>
            <form  className='space-y-3' >
                <input value={username} onChange={(e)=> setUsername(e.target.value)} className='w-full px-5 py-2 text-xl border border-gray-400 rounded-md' type="text" placeholder='username' />
                <input value={password} onChange={(e)=> setPassword(e.target.value)} className='w-full px-5 py-2 text-xl border border-gray-400 rounded-md' type="password" placeholder='password' />
                  <h1  className='flex my-3'><p>Already A User? </p><Link to={"/seller/signin"} className='underline underline-offset-2'>Login</Link></h1>
                <button type='submit' onClick={Signup} className='w-full py-2 text-xl text-white transition-all duration-300 bg-purple-500 rounded-md hover:cursor-pointer hover:bg-purple-800'>Signup</button>
                </form>
            </div>
            
        </div>
        {message &&
        <div >
          <Message message={message} success={success}/>
        </div>
        }
    </div>
    
    </div>
   
  )
}
