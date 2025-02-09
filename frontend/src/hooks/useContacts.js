import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { BackendUrl } from '../providers/Provider'
import { messageAtom, successAtom } from '../atom/Atom'

export default function useContacts() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [message, setMesage] = useRecoilState(messageAtom)
    const [success, setSuccess] = useRecoilState(successAtom)
  
    const Contacts = async(e)=>{
        e.preventDefault()
        const response = await fetch(`${BackendUrl}/user/contact`,{
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({name, email, phone})
        })
        const result = await response.json()
        if(response.ok){
            setMesage(result.message)
            setSuccess(true)
            setName("")
            setEmail("")
            setPhone("")
            setTimeout(() => {
                setMesage("")
            }, 2000);
        }else{
            setMesage(result.message)
            setSuccess(false)
            setTimeout(() => {
                setMesage("")
            }, 2000);
        }
    }
    return {name, email, phone, Contacts,message,success, setName, setEmail, setPhone}
}