import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';

const NavbarComponent: React.FC = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="px-3">
            <Navbar.Brand href="#">Atlantis</Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link as={Link} to="/">Clientes</Nav.Link>
                <Nav.Link as={Link} to="/hospedagem">Hospedagem</Nav.Link>
                <Nav.Link as={Link} to="/acomodacoes">Acomodações</Nav.Link>
            </Nav>
        </Navbar>
    );
};

export default NavbarComponent;
