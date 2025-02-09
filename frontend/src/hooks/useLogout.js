import { useSetRecoilState } from "recoil"
import { BackendUrl } from "../providers/Provider"
import { messageAtom, userAuthenticatedAtom } from "../atom/Atom"

export default function useLogout(){
    const setUserLogin = useSetRecoilState(userAuthenticatedAtom)
    const { setMessage} = useSetRecoilState(messageAtom)
    const UserLogout =async()=>{
        const response = await fetch(`${BackendUrl}/user/logout`,{
            method :"POST",
            credentials: 'include'
        })
        const result = await response.json()
        if(response.ok){
            setUserLogin(false)
            setMessage(result.message)
        }
    }
    return UserLogout
}
