import { FaUser } from 'react-icons/fa';
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';


const Footer = () => {
    return (
        <>
            <div style={{ height: "80px", width: "80%" }} className='d-flex flex-row justify-content-between align-items-center'>
                <div className='d-flex flex-row  align-items-center'>
                    <div className="d-flex flex-row ">
                        {/* logo and title here */}
                        <FaUser size={35} color='black' />
                        <span className='fs-4 ms-3'>Digital Devalaya</span>
                    </div>
                    <div className='ms-5'>Copyright &copy; 2024 Digital Devalaya</div>
                </div>
                <div className='d-flex flex-row'>
                    <FaFacebook size={30} className='me-4' cursor={"pointer"} />
                    <FaTwitter size={30} className='me-4' cursor={"pointer"} />
                    <FaInstagram size={30} cursor={"pointer"} className='me-4' />
                    <FaGithub size={30} cursor={"pointer"} />
                </div>
            </div>
        </>
    )
}

export default Footer