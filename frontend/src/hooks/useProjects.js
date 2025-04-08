import { useCallback, useEffect, useState } from "react";
import { BackendUrl } from "../providers/Provider";
import toast from "react-hot-toast";

export default function useProjects() {
    const [projects, setProjects] = useState([])
    const FetchProjects = useCallback(async () => {
        try {
            const response = await fetch(`${BackendUrl}/property`, {
                method: 'GET'
            })
            const result = await response.json()
            if (response.ok) {
                setProjects(result.properties)
            } else {
                setProjects(null)
            }
        } catch (error) {
            toast.error(error.message)
        }

    }, [])
    useEffect(() => {
        FetchProjects()
    }, [])
    return projects
}