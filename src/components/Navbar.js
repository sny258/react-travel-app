import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import axios from 'axios';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import logo from '../logo192.png';

function BasicNavbar({
  link1 = 'Home',
  link2 = 'About',
  //dropdown = '☰',
  //dropdownAction1 = 'username',
  dropdownAction2 = 'Bookings',
  dropdownAction3 = 'Logout' }) {

  // useNavigate hook returns a navigate function that can be used to programmatically navigate to a different route
  const navigate = useNavigate();
  // useLocation hook returns the location object that represents the current URL
  const location = useLocation();
  // useRef hook is mutable object that persists across re-renders.
  const isMounted = useRef(false);

  // offcanvas logic
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  // Use state to store the session username sent by the server
  // which will be passed to navbar props
  const [sessionUser, setSessionUser] = useState(null);

  // Set the default config for axios
  axios.defaults.withCredentials = true;

  // hook to check if user is authenticated and navigate accordingly
  useEffect(() => {
    //Mark the component as mounted
    isMounted.current = true;
    // Skip authentication check if page is not booking
    //if (location.pathname !== '/booking' && localStorage.getItem("user") == null) {
    if (!['/booking', '/managebookings'].includes(location.pathname) && localStorage.getItem("user") == null) {
      console.log('No auth check required !!!');
      // Exit the useEffect hook early
      return; 
    }
    // Function to check if the user is authenticated
    const checkLogin = async () => {
      try {
        const response = await axios.get('http://localhost:5000/isauthenticated', {
          validateStatus: function (status) {
            // Consider any status code less than 500 as a success status.
            return status < 500;
          },
        });
        console.log('Response:', response);
        if (response.data.message === 'Authenticated !!!') {
          // Update the state only if the component is still mounted
          if (isMounted.current) {
            setSessionUser(response.data.username);
          }
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Authentication error:', error.response?.data?.message || error.message);
        navigate('/login');
      } 
    };
    checkLogin();
    // Cleanup function to mark the component as unmounted
    return () => { isMounted.current = false; }
  }, [location.pathname, navigate]);                     // [] will execute hook only once


  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/logout', {}, {
        validateStatus: function (status) {
          // Consider any status code less than 500 as a success status.
          return status < 500;
        },
      });
      console.log('Response:', response);
      if (response.data.message === 'Logout successful') {
        // Clear the local storage user and redirect to login
        localStorage.removeItem("user");
        // Update the sessionUser state to null, so that the navbar can be updated
        setSessionUser(null);
        // if (location.pathname === '/welcome') {
        //   window.location.reload();  // Force a page reload if already on the welcome page
        // } else {
        //   navigate('/welcome');
        // }
        //navigate('/login');
        navigate('/welcome');
      } else {
        console.error('Logout error:', response.data.message);
      }
    } catch (error) {
      console.error('Login error:', error.response?.data?.message || error.message);
      console.error('Logout failed');
    }
  };

  const manageBookings = () => {
    navigate('/managebookings');
  }


  return (
    
    <>
    <Navbar expand="md" className="bg-body-tertiary">
    {/* <Navbar bg="dark" variant="dark" className="basic-navbar"> */}
      
      <Container className='navbar-container-custom'>

        <Navbar.Brand as={Link} to="/welcome">
          <img id="logo" src={logo} alt="Logo" style={{width: '35px', height: '35px'}}></img>
        </Navbar.Brand>

        {/* this will show the hamburger menu once the screen size is reduced */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
          <div className="d-flex align-items-center">
            <Nav className="me-auto">
              {/* <Nav.Link as={Link} to="/welcome">Home</Nav.Link> */}
              <Nav.Link as={Link} to="/welcome">{link1}</Nav.Link>
              {/* <Nav.Link href="#link">{props.link2}</Nav.Link> */}
              <button className="AboutBtn" type='button' style={{background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer'}} onClick={handleShow}>{link2}</button>
            </Nav>
          </div>
          
          {/* show username if logged in, otherwise show login and signup links */}
          <Nav>  
            {sessionUser ? (
              <NavDropdown title={sessionUser} id="basic-nav-dropdown"className="custom-dropdown-toggle">
                <NavDropdown.Item href="#action/3.1">
                  {sessionUser}
                </NavDropdown.Item>
                <NavDropdown.Item onClick={manageBookings}>
                  {dropdownAction2}
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  {dropdownAction3}
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
              </>
            )}

            {/* <NavDropdown title={props.dropdown} id="basic-nav-dropdown" className="custom-dropdown-toggle">
              <NavDropdown.Item href="#action/3.1">{props.dropdownAction1}</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                {props.dropdownAction2}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.3">
                {props.dropdownAction3}
              </NavDropdown.Item>
            </NavDropdown> */}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    <Offcanvas placement="bottom" show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>About Us !!!</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        This is small react application which is created for learning purpose.
        This is an example of offcanva bootstrap module.
      </Offcanvas.Body>
    </Offcanvas>

    </>
  );
}

BasicNavbar.propTypes = {
  link1: PropTypes.string,
  link2: PropTypes.string,
  dropdown: PropTypes.string,
  dropdownAction1: PropTypes.string,
  dropdownAction2: PropTypes.string,
  dropdownAction3: PropTypes.string 
}
  
// BasicNavbar.defaultProps = {
//   link1: 'Home',
//   link2: 'About',
//   dropdown: '☰',
//   dropdownAction1: 'username',
//   dropdownAction2: 'Bookings',
//   dropdownAction3: 'Logout'
// }

export default BasicNavbar;