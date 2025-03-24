import { BackendUrl } from "../providers/Provider"
import { useCallback, useContext } from "react"
import AuthContext from "../context/authContext"
import toast from "react-hot-toast"

export default function useLogout(){
    const { setIsUserLogin } = useContext(AuthContext)
    const UserLogout =useCallback( async()=>{
        const response = await fetch(`${BackendUrl}/user/logout`,{
            method :"POST",
            credentials: 'include'
        })
        const result = await response.json()
        if(response.ok){
            setIsUserLogin(false)
            toast.success(result.message)
        }
    },[])
    return UserLogout
}
