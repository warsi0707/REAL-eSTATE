import {BackendUrl} from "../providers/Provider"
import { createContext, useCallback, useEffect, useState } from "react";

const AuthContext = createContext()

export  function Auth({children}){
    const [isUserLogin, setIsUserLogin] = useState(false)
    const [isAdminLogin, setIsAdminLogin] = useState(false)
    const GetAdmin =useCallback( async()=>{
        try{
            const response = await fetch(`${BackendUrl}/admin/verify`,{
                method: "GET",
                credentials: 'include'
            })
            const result = await response.json()
            if(response.ok){
                if(result.adminAuthenticated == true){
                    setIsAdminLogin(true)
                }else{
                    setIsAdminLogin(false)
                }
            }
        }catch(error){
            console.error(error)
        }
    },[])
    const GetUser =useCallback( async()=>{
        try{
            const response = await fetch(`${BackendUrl}/user/verify`,{
                method: "GET",
                credentials: 'include'
            })
            const result = await response.json()
            if(response.ok){
                if(result.userAuthenticated == true){
                    setIsUserLogin(true)
                   }else{
                    setIsUserLogin(false)
                   }
            }
        }catch(error){
            console.error(error)
        }
    },[])
    useEffect(()=>{
            GetAdmin()
            GetUser()
    },[])
    
    return (
        <div>
            <AuthContext.Provider value={{isUserLogin,isAdminLogin, setIsAdminLogin, setIsUserLogin }} >
                {children}
            </AuthContext.Provider>
        </div>
    )   
}
export default AuthContext