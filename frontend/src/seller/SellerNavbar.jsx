import { memo, useCallback, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BackendUrl } from '../providers/Provider'
import AuthContext from '../context/authContext'
import toast from 'react-hot-toast'

 function SellerNavbar() {
  const {isAdminLogin, setIsAdminLogin} = useContext(AuthContext)
  const navigate = useNavigate()

  const Logout =useCallback(async()=>{
    const response = await fetch(`${BackendUrl}/admin/logout`,{
      method: 'POST',
      credentials: 'include'
    })
    const result = await response.json()
    if(response.ok){
      toast.success(result.message)
      setTimeout(() => {
        setIsAdminLogin(false)
        navigate("/")
      }, 2000);
    }else{
      toast.error(result.message)
    }
  },[])
  return (
    <>
    <div className='flex items-center justify-between w-full px-5 py-2 bg-gray-500 md:py-5'>
        <div className='flex md:gap-5'>
            <Link to={"/seller/dashboard"} className='md:text-2xl'>Admin Portal</Link>
            <Link to={"/"} className='md:text-2xl'>Home</Link>
            </div>
        <div className='flex gap-2 md:gap-10 md:text-xl'>
          <Link to={"/seller/contact"} className='flex items-center justify-center transition-all duration-300 border-2 border-green-400 rounded-md md:p-2 hover:bg-green-400 hover:shadow-xl'>Contacts</Link>
          {isAdminLogin&& <>
            <Link className='flex items-center justify-center transition-all duration-300 border-2 border-purple-400 rounded-md md:p-2 hover:bg-purple-400 hover:shadow-xl' to={"/seller/add"}>Publish your property</Link>
            <button onClick={Logout} className='p-2 transition-all duration-300 border border-red-500 rounded-md hover:bg-red-500 hover:shadow-md'>Logout</button>
          </>}
        </div>
    </div>

    </>
  )
}
export default memo(SellerNavbar)