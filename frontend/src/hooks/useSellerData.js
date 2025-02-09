import { useEffect } from 'react'
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
        if(response.ok){
            setData(result.data)
        }
    }
    useEffect(()=>{
        FetchData()
    },[])
   return data
  
}


