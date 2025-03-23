
import useLogout from '../hooks/useLogout'
import {Link} from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../context/authContext'

export default function Navbar({onClose}) {
  const logout = useLogout()
  const {isUserLogin} = useContext(AuthContext)
  return (
    <>
     <div className='mx-auto bg-blue-500 max-w-[1300px] py-7 rounded-b-full px-10 flex justify-between sticky top-0'>
      <Link to={"/"} className="ml-8 w-28 sm:w-40"><img src="/housing.png" alt="" /></Link>
      <div className="gap-5 mr-10 text-xl text-white sm:flex">
        {isUserLogin? <button onClick={logout} >Logout </button>: <button onClick={onClose}>Login </button>}
      </div>
    </div>   
    </>
  )
}
