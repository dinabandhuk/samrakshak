import useAxios from "../utils/useAxios"
import { useState, useEffect } from "react"
import GlbLoader from "../components/glbLoader"
import BufferToBlob from "../utils/blob"


const Test = () => {

    const axios = useAxios()
    const [glbData, setGlbData] = useState(null)
    const [image, setImage] = useState(null)
    const [antique, setAntique] = useState({})

    useEffect(() => {
        const fetchImage = async () => {
            const antiqueResponse = await axios.get("/getAntique/66d9dbcf6fae07f137a2305f");
            setAntique(antiqueResponse.data)

            const imageResponse = await axios.get(`/getImage/${antiqueResponse.data.image}`, { responseType: "blob" })

            const imageUrl = URL.createObjectURL(imageResponse.data)
            setImage(imageUrl)


            const glbResponse = await axios.get(`/getGLB/${antiqueResponse.data.glbData}`, { responseType: "arraybuffer" })
            console.log(glbResponse)
            const url = BufferToBlob(glbResponse)
            setGlbData(url)
            console.log(url)


        }

        fetchImage()
    }, [])

    return (
        <>
            <img src={`${image}`} alt="database image" />
            {
                glbData &&
                <GlbLoader url={glbData} />
            }
        </>
    )
}

export default Test