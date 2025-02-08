import { useEffect } from 'react'
import { BackendUrl } from '../providers/Provider'
import {useSetRecoilState } from 'recoil'
import { projectsAtom } from '../atom/Atom'

export default function useProject() {
    const  setProjects = useSetRecoilState(projectsAtom)
    const Projects =async()=>{
        const response = await fetch(`${BackendUrl}/property/three`,{
            method: "GET"
        })
        const result = await response.json()
        console.log(result)
        if(response.ok){
            setProjects(result.data)
        }else{
            return null
        }
    }
    useEffect(()=>{
        Projects()
    },[])
}
