import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles.css';
import { toast } from 'react-toastify';

//import BasicNavbar from './Navbar';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';

import p_hide from '../p_hide.png';
import p_show from '../p_show.png';

import config from '../config'; 

function Signup() {
  
  // Using state to toggle the password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);
  // form input states
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      const response = await axios.post(config.API_BASE_URL + '/signup', { firstname, lastname, username, email, password }, {
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
        // toast.success(`You are Onboarded, ${username} 🙂`, {
        //   position: "top-center",
        //   onClose: () => {
        //     navigate('/login')
        //   }  
        // });
        // //navigate to login after toast is closed
        // setTimeout(() => {
        //   navigate('/login');
        // }, 5700);
        setPopupMessage(`You are Onboarded, ${username} 🙂`);
        setButtonText('Login');
        setButtonAction(() => () => navigate('/login'));
        setIsSingUpPopupOpen(true);
      } else {
        toast.error('Username already exists 😬', {position: "top-center"});
        //setPopupMessage('Username already exists 😬');
        //setButtonText('Retry');
        //setButtonAction(() => () => setIsSingUpPopupOpen(false));
      }
    } catch (error) {
      console.error('Signup error:', error.response?.data?.message || error.message);
    }
  };

  return (
    
    <>
    {/* <BasicNavbar link1="Home" link2="About" dropdownAction2="Bookings" dropdownAction3="Logout" /> */}
    {/* <BasicNavbar /> */}
    
    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', border: '1px solid #ccc', height: '80vh', margin: '20px', borderRadius: '20px' }}>

      <div className='SignupContent' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff', width: '40%' }}>
        {/* heading */}
        <div style={{margin: '15px', borderBottom: '2px solid #ddd'}}>
          <h2>Please Signup !!!</h2>
        </div>
        {/* form to take signup details */}
        <form className="signupForm" onSubmit={handleSignup} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', border: '1.5px solid #ccc', width: '70%', borderRadius: '10px', margin: '10px 0 30px 0', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
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
          {/* Password input with show/hide password functionality */}
          <div style={{ width: '100.5%', marginLeft: '-4.5px' }} >
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {/* <span style={{fontSize: '1.3rem', cursor: 'pointer', marginLeft: '-30px', color: '#007bff'}} onClick={() => setPasswordVisible(!passwordVisible)}>
              {passwordVisible ? '🐵' : '🙈'}
            </span> */}
            <span style={{ cursor: 'pointer', marginLeft: '-25px'}} onClick={() => setPasswordVisible(!passwordVisible)}>
              {passwordVisible ? <img src={p_show} alt="show" style={{width: '20px', height: '20px'}} /> : <img src={p_hide} alt="hide" style={{width: '20px', height: '20px'}} />}
            </span>
          </div>
          {/* form submit button */}
          <Button variant="success" type="submit" style={{ marginTop: '15px', width: '30%', padding: '4px' }}>Signup</Button>
        </form> 

      </div>
  
      {/* Popup to show success message */}
      {/* SignUp Popup on condition, this way browser will only render this untill it's required */}

      {isSingUpPopupOpen && (
      <div className="success-popup-backdrop">
        <div className="success-popup" id="successPopup">
  
          {/* <h1 id="successMessage" style={{margin: '15px'}}>Popup</h1> */}
          {/* <button type="button" className="btn-popup" onClick={() => navigate('/login')>Login</    button> */}
          {/* <button type="button" className="btn-popup" onClick={() => window.locationhref = "/  login"}  >Login</button> */}
          {/* on click here will take precedence over the one in handleSignup, so remove it*/}
          {/* <button type="button" id="btn-popup" style={{margin: '15px'}}>Login</button> */}
  
          {/* this code for conditionally showing popup*/}
          < CloseButton style={{position: 'absolute', top: '5px', right: '5px'}} onClick={() => setIsSingUpPopupOpen(false)} />
          <h1 id="successMessage" style={{margin: '15px', fontSize: '1.5rem'}}>{popupMessage}</h1>
          <Button type="button" id="btn-popup" style={{margin: '15px'}} onClick={buttonAction}>  {buttonText}</Button>
        </div>
      </div>
      )} 

    </div>
    </>
  );
}

export default Signup;
