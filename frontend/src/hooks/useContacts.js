import { useCallback, useRef } from 'react'
import { BackendUrl } from '../providers/Provider'
import toast from 'react-hot-toast'

export default function useContacts() {
    const nameRef = useRef()
    const emailRef = useRef()
    const phoneRef = useRef()
  
    const Contacts =useCallback(async(e)=>{
        e.preventDefault()
        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const phone = phoneRef.current.value
        const response = await fetch(`${BackendUrl}/user/contact`,{
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({name, email, phone})
        })
        const result = await response.json()
        if(response.ok){
            toast.success(result.message)
        }else{
            toast.error(result.message)
        }
    },[])
    return {nameRef, emailRef, phoneRef, Contacts}
}