import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import GlbLoader from "../components/glbLoader";
import backgroundImage from "../images/background.jpg";
import MyModal from "../components/modal";
import _ from 'lodash';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";


const CreateModel = () => {
    const [url, setUrl] = useState(null);
    const [show, setShow] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) navigate("/login")

        const data = jwtDecode(token)
        if (data.role !== "admin") navigate("/notFound")
    }, [])

    const handleOnInitate = async () => {
        const response = await axios.post(`${import.meta.env.VITE_ODM_BASE_URL}/task/new/init`);
        return response.data.uuid;
    };

    const handleOnChange = async (event) => {
        const selectedFiles = event.target.files;

        try {
            const uuid = await handleOnInitate();
            await handleOnUpload(uuid, selectedFiles);
        } catch (error) {
            console.log("Error on uploading");
        }
    };

    const handleOnUpload = async (uid, files) => {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append("images", files[i]);
        }

        await axios.post(`${import.meta.env.VITE_ODM_BASE_URL}/task/new/upload/${uid}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        await axios.post(`${import.meta.env.VITE_ODM_BASE_URL}/task/new/commit/${uid}`);
    };

    // Debounce the handleOnChange function
    const debouncedHandleOnChange = _.debounce(handleOnChange, 300);

    return (
        <>
            {show && <MyModal show={show} setShow={setShow} />}
            <div className="d-flex justify-content-center align-items-center flex-column text-light text-center" style={{ height: "100vh", width: "100vw", backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                <div className="h-50 w-75 d-flex flex-column justify-content-center align-items-center">
                    <div>
                        <p className="fs-3">Upload file, Create 3D model</p>
                        <p>Upload image file to create 3D models</p>
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
                        <p className="fs-4">Initiate Task</p>
                        <input
                            type="file"
                            multiple
                            onChange={debouncedHandleOnChange}
                            accept="image/*"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateModel;
