import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useUser } from '../../context/UserProvider';

export default function NavBar() {
  const { logout, user } = useUser();

  return (
    <Navbar
      bg='light'
      expand='lg'
    >
      <Container fluid>
        <LinkContainer to='/'>
          <Navbar.Brand>Accueil</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls='navbarResponsive' />
        <Navbar.Collapse id='navbarResponsive'>
          <Nav className='me-auto'>
            {user && user.token ? (
              <>
                <LinkContainer to='/dashboard'>
                  <Nav.Link>Espace personnelle</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/add'>
                  <Nav.Link>Ajout journal</Nav.Link>
                </LinkContainer>

                <Button
                  variant='light'
                  onClick={logout}
                >
                  Déconnecter
                </Button>
              </>
            ) : (
              <>
                <LinkContainer to='/login'>
                  <Nav.Link>Se connecter</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/register'>
                  <Nav.Link>S'abonner</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
