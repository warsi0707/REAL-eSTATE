import { useCallback, useEffect, useState } from 'react'
import { BackendUrl } from '../providers/Provider'


export default function useProject() {
    const  [projects, setProjects]= useState([])
    const Projects =useCallback( async()=>{
        const response = await fetch(`${BackendUrl}/property/three`,{
            method: "GET"
        })
        const result = await response.json()
        if(response.ok){
            setProjects(result.data)
        }else{
            return null
        }
    },[])
    useEffect(()=>{
        Projects()
    },[])
}
