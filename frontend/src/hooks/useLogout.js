import { BackendUrl } from "../providers/Provider"
import { useCallback, useContext } from "react"
import AuthContext from "../context/authContext"
import toast from "react-hot-toast"

export default function useLogout() {
    const { setIsLogin } = useContext(AuthContext)
    const UserLogout = useCallback(async () => {
        try {
            const response = await fetch(`${BackendUrl}/user/logout`, {
                method: "POST",
                credentials: 'include'
            })
            const result = await response.json()
            if (response.ok) {
                setIsLogin(false)
                toast.success(result.message)
            }
        } catch (error) {
            toast.error(error.message)
        }

    }, [])
    return UserLogout
}
