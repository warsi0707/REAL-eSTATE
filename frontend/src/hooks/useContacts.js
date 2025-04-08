import { useCallback, useRef } from 'react'
import { BackendUrl } from '../providers/Provider'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'

export default function useContacts() {
    const nameRef = useRef()
    const messageRef = useRef()
    const phoneRef = useRef()
    const { id } = useParams()
    
    const Contacts = useCallback(async (e) => {
        e.preventDefault()
        const name = nameRef.current.value;
        const message = messageRef.current.value;
        const phone = phoneRef.current.value
        try {
            const response = await fetch(`${BackendUrl}/property/contact/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json'
                },
                body: JSON.stringify({ name, message, phone })
            })
            const result = await response.json()
            if (response.ok) {
                toast.success(result.message)
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            toast.error(error.message)
        }

    }, [])
    return { nameRef, messageRef, phoneRef, Contacts }
}