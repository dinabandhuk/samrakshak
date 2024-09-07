import React, { useState } from 'react';
import backgroundImage from "../images/background.jpg"
import Preview from '../components/preview';

const Render = () => {
    const [modelUrl, setModelUrl] = useState(null);
    const [show, setShow] = useState(false)

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setModelUrl(url);
            setShow(true)
        }
    };

    return (
        <div>
            {modelUrl && <Preview show={show} setShow={setShow} url={modelUrl} />}
            <div className="d-flex justify-content-center align-items-center flex-column text-light text-center" style={{ height: "100vh", width: "100vw", backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center" }}>

                <div className="h-50 w-75 d-flex flex-column justify-content-center align-items-center">
                    <div>
                        <p className="fs-3">Upload file, Preview 3D model</p>
                        <p>Upload glb file to preview</p>
                    </div>
                    <div
                        className="w-75 text-center text-light d-flex flex-column justify-content-center align-items-center"
                        style={{
                            backgroundColor: "rgba(187, 153, 255, 0.25)",
                            height: "150px",
                            border: "1px dotted black",
                            borderRadius: "10px",
                            cursor: "pointer"
                        }}
                    >
                        <p className="fs-4">Upload GLB File</p>
                        <input
                            type="file"
                            onChange={handleFileUpload}
                            accept=".glb"
                        />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Render;
