import { useEffect, useState } from "react";
import { BackendUrl } from "../providers/Provider";
import axios from "axios";

export default function useOneData(){
    const backendUrl = BackendUrl
    const [oneData, setOneData] = useState([])

    const GetData =async()=>{
        const response = await axios.get(`${backendUrl}/property/one`)
        const data = response.data
        setOneData(data.properties)
    }
    useEffect(()=>{
        GetData()
    },[])
    return oneData
}