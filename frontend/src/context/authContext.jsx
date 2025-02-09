import {BackendUrl} from "../providers/Provider"
import { createContext, useEffect } from "react";
import { useRecoilState } from "recoil";
import { adminAuthenticatedAtom, userAuthenticatedAtom } from "../atom/Atom";

const AuthContext = createContext()

export  function Auth({children}){
    const [isUserLogin, setIsUserLogin] = useRecoilState(userAuthenticatedAtom)
    const [isAdminLogin, setIsAdminLogin] = useRecoilState(adminAuthenticatedAtom)
    const GetAdmin =async()=>{
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
    }
    const GetUser =async()=>{
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
    }
    useEffect(()=>{
        setInterval(()=>{
            GetAdmin()
            GetUser()
        },1000)
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