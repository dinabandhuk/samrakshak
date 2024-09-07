import axios from "axios"
import { useState } from "react"
// import { extractGlbFilesFromZip } from "../utils/zip"
import GlbLoader from "../components/glbLoader"
import backgroundImage from "../images/background.jpg"
import MyModal from "../components/modal"

const CreateModel = () => {
    const [uid, setUid] = useState(null)
    const [files, setFiles] = useState([])
    const [url, setUrl] = useState(null)
    const [show, setShow] = useState(false)

    const handleOnInitate = async () => {
        const response = await axios.post(`${import.meta.env.VITE_ODM_BASE_URL}/task/new/init`)
        setUid(response.data.uuid)
    }

    const handleOnChange = (event) => {
        const selectedFiles = event.target.files;
        setFiles(selectedFiles);
    }

    const handleOnCheck = async () => {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append("images", files[i]);
        }

        const response = await axios.post(`${import.meta.env.VITE_ODM_BASE_URL}/task/new/upload/${uid}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        await axios.post(`${import.meta.env.VITE_ODM_BASE_URL}/task/new/commit/${uid}`)
    }

    const handleOnStatus = async () => {
        const response = await axios.get(`${import.meta.env.VITE_ODM_BASE_URL}/task/${uid}/output`)
        console.log(response)
    }

    const handleOnDownload = async () => {
        const response = await axios.get(`${import.meta.env.VITE_ODM_BASE_URL}/task/cf282d89-3480-4611-afa4-64e8606b7eec/download/all.zip`, { responseType: 'arraybuffer' })
        // const glbFile = await extractGlbFilesFromZip(response.data)
        console.log(glbFile)
        setUrl(glbFile[0].content)

    }

    const handleOnStart = async () => {

        setShow(true)
        handleOnInitate()
    }

    return (
        <>
            {
                show && (<MyModal show={show} setShow={setShow} />)
            }
            <div className="d-flex justify-content-center align-items-center flex-column text-light text-center" style={{ height: "100vh", width: "100vw", backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                <div className="h-50 w-75 d-flex flex-column justify-content-center align-items-center">
                    <div>
                        <p className="fs-3">Upload file, Create 3D model</p>
                        <p>Upload image file to create 3D models</p>
                    </div>
                    <div
                        className="w-75 text-center text-light d-flex flex-column justify-content-center align-items-center"
                        style={{
                            backgroundColor: "rgba(187, 153, 255, 0.25)", // Semi-transparent background color
                            height: "150px",
                            border: "1px dotted black",
                            borderRadius: "10px",
                            cursor: "pointer"
                        }}
                        onClick={handleOnStart}
                    >
                        <p className="fs-4">Initate Task</p>
                        <p>(Create task to upload files)</p>
                    </div>

                </div>

                <div>
                    <input type="file" multiple onChange={handleOnChange} accept="image/*" />
                    <button onClick={handleOnCheck}>Check</button>
                    <button onClick={handleOnStatus}>Status</button>
                    <button onClick={handleOnDownload}>Download</button>
                </div>

                {
                    url && (<GlbLoader url={url} />)
                }
            </div>
        </>
    )
}

export default CreateModel;
