import axios from "axios";
import { useEffect, useState } from "react";
import { BackendUrl } from "../providers/Provider";

export default function useThreeData() {
    const [threeData, setThreeData] = useState([])
    const backendUrl = BackendUrl

    const GetThreeData =async()=>{
        const response = await axios.get(`${backendUrl}/property/three`)
        const data = response.data
        setThreeData(data.properties)
    }
    useEffect(()=>{
        GetThreeData()
    },[])

    return threeData

}
