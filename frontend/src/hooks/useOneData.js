import { useCallback, useEffect, useState } from "react";
import { BackendUrl } from "../providers/Provider";
import axios from "axios";
import toast from "react-hot-toast";

export default function useOneData() {
    const backendUrl = BackendUrl
    const [oneData, setOneData] = useState([])

    const GetData = useCallback(async () => {
        try {
            const response = await axios.get(`${backendUrl}/property/one`)
            const data = response.data
            setOneData(data.properties)
        } catch (error) {
            toast.error(error.message)
        }

    }, [])
    useEffect(() => {
        GetData()
    }, [])
    return oneData
}