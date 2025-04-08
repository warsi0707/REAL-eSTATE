import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { BackendUrl } from "../providers/Provider";
import toast from "react-hot-toast";

export default function useThreeData() {
    const [threeData, setThreeData] = useState([])
    const backendUrl = BackendUrl

    const GetThreeData = useCallback(async () => {
        try {
            const response = await axios.get(`${backendUrl}/property/three`)
            const data = response.data
            setThreeData(data.properties)
        } catch (error) {
            toast.error(error.message)
        }

    }, [])
    useEffect(() => {
        GetThreeData()
    }, [])
    return threeData

}
