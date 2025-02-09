import { useEffect, useState } from "react";
import { BackendUrl } from "../providers/Provider";

export default function useProjects(){
    const [projects, setProjects] = useState([])
    const FetchProjects =async()=>{
        const response = await fetch(`${BackendUrl}/property/projects`,{
            method: 'GET'
        })
        const result = await response.json()
        if(response.ok){
            setProjects(result.properties)
        }else{
            setProjects(null)
        }
    }
    useEffect(()=>{
        FetchProjects()
    },[])
    return projects
}