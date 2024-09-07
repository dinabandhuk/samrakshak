import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode"
import { useNavigate } from 'react-router-dom';
import logout from '../utils/logout';


function MyNavbar() {

    const [role, setRole] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            navigate("/login")
        }
        const data = jwtDecode(token)
        setRole(data.role)
    }, [])

    const handleOnLogout = () => {
        logout()
        navigate("/login")
    }

    return (
        <Navbar expand="lg" className="bg-body-light">
            <Container>
                <Navbar.Brand as={NavLink} to="/">Digital Devalaya</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                        {
                            role === "admin" &&
                            <Nav.Link as={NavLink} to="/create">Create 3D</Nav.Link>
                        }
                        <button onClick={handleOnLogout}>Logout</button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavbar;
