import "@google/model-viewer"
import { useState, useEffect } from "react"
import useAxios from "../utils/useAxios"
import BufferToBlob from "../utils/blob"

const AR = () => {
    const [glbData, setGlbData] = useState(null)
    const axios = useAxios()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/getGLB/66dc68304c30dc5ea398a6d7`, { responseType: "arraybuffer" })
                // console.log(response)
                const url = BufferToBlob(response)
                setGlbData(url)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])

    return (
        <>
            {
                glbData &&
                <model-viewer alt="3D model" src={`${glbData}`} camera-controls touch-action="pan-y" shadow-intensity="1"></model-viewer >
            }
        </>
    )
}

export default AR