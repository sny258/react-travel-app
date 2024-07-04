import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css';
//import { Link } from 'react-router-dom';

import BasicNavbar from './Navbar';

function Signup() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Set the default config for axios
  axios.defaults.withCredentials = true;
  
  // Using state to toggle the reset password popup
  // this way page will not render the reset password popup when the state is false
  // use this fucntion at line 145 to show the reset password popup
  const [isSingUpPopupOpen, setIsSingUpPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [buttonAction, setButtonAction] = useState(() => () => {});

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/signup', { firstname, lastname, username, email, password }, {
        validateStatus: function (status) {
          // Consider any status code less than 500 as a success status.
          return status < 500;
        }
      });
      console.log(response.data.message);

      // Redirect to login page after successful signup, this is non-ideal way to do it
      // if (response.data.message === 'User registered successfully') {
      //   // show the popup with success message
      //   document.getElementById("successMessage").textContent = 'You are Onboarded 🙂';
      //   var button = document.getElementById("btn-popup");
      //   button.innerText = 'Login ->';
      //   document.getElementById("successPopup").style.display = "block";
      //   button.onclick = () => navigate('/login');
      //   //navigate('/login');
      // } else {
      //   setIsSingUpPopupOpen(true);
      //   // show the popup with error message
      //   document.getElementById("successMessage").textContent = 'Username already exists. Please choose a different one 😬';
      //   var button1 = document.getElementById("btn-popup");
      //   button1.innerText = 'Retry';
      //   document.getElementById("successPopup").style.display = "block";
      //   button1.onclick = function() { 
      //       document.getElementById("successPopup").style.display = "none";
      //   };
      //   //setError(response.data.message);

      // JS logic to show the popup conditionally
      if (response.data.message === 'User registered successfully') {
        setPopupMessage('You are Onboarded 🙂');
        setButtonText('Login ->');
        setButtonAction(() => () => navigate('/login'));
      } else {
        setPopupMessage('Username already exists. Please choose a different one😬');
        setButtonText('Retry');
        setButtonAction(() => () => setIsSingUpPopupOpen(false));
      }
      setIsSingUpPopupOpen(true);
    } catch (error) {
      console.error('Signup error:', error.response?.data?.message || error.message);
      setError(error.response?.data?.message || 'Signup failed');
    }
  };

  return (
    
    <>
    <BasicNavbar link1="Home" link2="About" dropdownAction2="Bookings" dropdownAction3="Logout" />
    
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', border: '1px solid black', height: '80vh', margin: '20px', borderRadius: '20px' }}>

      <div className='SignupContent' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '1px solid black', width: '35%', borderRadius: '15px', background: '#fff' }}>
        {/* heading */}
        <div style={{margin: '15px'}}>
          <h2>Please Signup !!!</h2>
        </div>
        {/* form to take signup details */}
        <form className="signupForm" onSubmit={handleSignup} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', border: '1px solid black', width: '70%', borderRadius: '10px', marginBottom: '10px'}}>
          <input
            type="text"
            placeholder="Firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" style={{marginTop: '15px', width: '40%'}}>Signup</button>
        </form>
        {/* error message will be displayed at bottom on div */}
        <div style={{marginTop: '20px'}}>
          {error && <p style={{color: 'red', fontSize: '25px'}}>{error}</p>}
        </div> 
      </div>
  
      {/* Popup to show success message */}
      {/* SignUp Popup on condition, this way browser will only render this untill it's required */}
      {isSingUpPopupOpen && (
      <div className="success-popup" id="successPopup">

        {/* <h1 id="successMessage" style={{margin: '15px'}}>Popup</h1> */}
        {/* <button type="button" className="btn-popup" onClick={() => navigate('/login')>Login</  button> */}
        {/* <button type="button" className="btn-popup" onClick={() => window.locationhref = "/  login"}>Login</button> */}
        {/* on click here will take precedence over the one in handleSignup, so remove it*/}
        {/* <button type="button" id="btn-popup" style={{margin: '15px'}}>Login</button> */}

        {/* this code for conditionally showing popup*/}
        <h1 id="successMessage" style={{margin: '15px', fontSize: '1.8rem'}}>{popupMessage}</h1>
        <button type="button" id="btn-popup" style={{margin: '15px'}} onClick={buttonAction}>{buttonText}</button>

      </div>
      )}

    </div>
    </>
  );
}

export default Signup;
