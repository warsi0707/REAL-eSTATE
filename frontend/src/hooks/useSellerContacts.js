import React, { useEffect, useState } from 'react'
import { BackendUrl } from '../providers/Provider'

export default function useSellerContacts() {
 const [contacts , setContacts] = useState([])
   try{
     const GetContacts =async()=>{
       const response = await fetch(`${BackendUrl}/admin/contacts`,{
         method : 'GET',
         credentials: 'include'
       })
       const result = await response.json()
       if(response.ok){
        setContacts(result.contacts)
       }else{
        setContacts(null)
       }
     }
     useEffect(()=>{
        GetContacts()
     },[])
   }catch(e){
     console.error(e)
   }
   return contacts
}
