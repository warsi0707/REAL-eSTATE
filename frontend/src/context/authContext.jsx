import {BackendUrl} from "../providers/Provider"
import { createContext, useCallback, useEffect, useState } from "react";

const AuthContext = createContext()

export  function Auth({children}){
    const [isLogin, setIsLogin] = useState(false)
    const GetUser =useCallback( async()=>{
        try{
            const response = await fetch(`${BackendUrl}/user/verify`,{
                method: "GET",
                credentials: 'include'
            })
            const result = await response.json()
            if(response.ok){
                if(result.authenticated == true){
                    setIsLogin(true)
                   }else{
                    setIsLogin(false)
                   }
            }
        }catch(error){
            console.error(error)
        }
    },[])
    useEffect(()=>{
            GetUser()
    },[])
    
    return (
        <div>
            <AuthContext.Provider value={{isLogin, setIsLogin }} >
                {children}
            </AuthContext.Provider>
        </div>
    )   
}
export default AuthContext