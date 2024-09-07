import Modal from 'react-bootstrap/Modal';
import GlbLoader from './glbLoader';

function Preview({ show, setShow, url }) {

    const handleShow = () => {
        setShow(true);
    };

    return (
        <>
            {/* Modal component */}
            <Modal show={show} fullscreen={true} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>3D Preview</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <GlbLoader url={url} />
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Preview;
