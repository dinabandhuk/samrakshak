import Modal from 'react-bootstrap/Modal';
import { useState, useEffect } from 'react';
import BufferToBlob from '../utils/blob';
import GlbLoader from './glbLoader';
import { FaUser } from 'react-icons/fa';
import useAxios from '../utils/useAxios';

function MyModal({ show, setShow, antiqueData }) {
    const [modelUrl, setModelUrl] = useState(null);
    const axios = useAxios();

    const fetchGlb = async (id) => {
        try {
            const response = await axios.get(`/getGLB/${id}`, { responseType: "arraybuffer" });
            return response;
        } catch (error) {
            console.log("Error while fetching glb file from server");
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            if (antiqueData) {
                const glbData = await fetchGlb(antiqueData.glbData);
                const url = BufferToBlob(glbData);
                setModelUrl(url);
            }
        };
        fetchData();
    }, [antiqueData]);

    return (
        <>
            <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>3D Preview</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ overflowY: "auto", maxHeight: "calc(100vh - 100px)" }}>
                    <div className='container-fluid p-0 d-flex flex-column'>
                        <div className='d-flex flex-row row'>
                            <div className='col-9'>
                                <GlbLoader url={modelUrl} />

                                {antiqueData.antiqueName && (
                                    <div>
                                        <div className='d-flex flex-column mt-4'>
                                            <p className='m-0 fs-3'>{antiqueData.antiqueName}</p>
                                            <span>3D View</span>
                                        </div>

                                        <div className='d-flex flex-row w-100 justify-content-between mt-4'>
                                            <div className='d-flex flex-row align-items-end'>
                                                <FaUser size={40} cursor={"pointer"} className='me-4' />
                                                <p className='fs-4 m-0'>{antiqueData.userId.userName}</p>
                                            </div>
                                            <div>Download</div>
                                        </div>

                                        <div className='mt-5'>
                                            <p className='m-0 fs-3'>Monument Description</p>
                                            <div>{antiqueData.description}</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className='col-3'>Others</div>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default MyModal;
