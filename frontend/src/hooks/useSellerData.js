import React, { useEffect, useState } from 'react'
import { BackendUrl } from '../providers/Provider'
import { useRecoilState } from 'recoil'
import { sellerDataAtom } from '../atom/Atom'

export default function useSellerData() {
    const [data, setData] = useRecoilState(sellerDataAtom)
    const FetchData =async()=>{
        const response = await fetch(`${BackendUrl}/admin/properties`,{
            method :'GET',
            credentials: 'include'
        })
        const result = await response.json()
        console.log(result)
        if(response.ok){
            setData(result.data)
        }
        console.log(result)
    }
    useEffect(()=>{
        FetchData()
    },[])
   return data
  
}


