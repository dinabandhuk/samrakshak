import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState , useEffect } from 'react';
import {jwtDecode} from "jwt-decode"


function MyNavbar() {

    const [user , setUser] = useState(null)

    useEffect(()=>{
        const token = localStorage.getItem("token")

        if(!token) 
        const data = jwtDecode(token)
        setUser(data)
        
    },[])

    return (
        <Navbar expand="lg" className="bg-body-light">
            <Container>
                <Navbar.Brand as={NavLink} to="/">Digital Devalaya</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/create">Create 3D</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MyNavbar;
