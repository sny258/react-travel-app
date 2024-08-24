//import React, { useState, useEffect } from 'react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css';
import { toast } from 'react-toastify';

//import BasicNavbar from './Navbar';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton';

import p_hide from '../p_hide.png';
import p_show from '../p_show.png';


function Login() {
  
  // Using state to toggle the password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //const [error, setError] = useState('');
  const navigate = useNavigate();

  const [resetUsername, setResetUsername] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  // Set the default config for axios
  axios.defaults.withCredentials = true;

  // // close the Reset password popup when clicked outside the div
  // useEffect(() => {
  //   // Function to hide reset password modal if clicked outside of it
  //   const handleClickOutside = (event) => {
  //     const resetPasswordModal = document.getElementById('reset-password');
  //     if (resetPasswordModal && !resetPasswordModal.contains(event.target)) {
  //       //closeResetPasswordPopup();
  //       // Reset the form fields when closing the form
  //       setResetUsername('');
  //       setNewPassword('');
  //       // Also clear the reset message
  //       document.getElementById('reset-message').innerHTML = '';
  //       // Close the popup by setting the state
  //       setIsResetPasswordPopupOpen(false);
  //     }
  //   };
  //   // Add event listener when the component mounts
  //   document.addEventListener('mousedown', handleClickOutside);
  //   // Return function to be called when component unmounts
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []);       // Empty dependency array means this effect runs only once on mount


  // Using state to toggle the reset password popup
  // this way page will not render the reset password popup when the state is false
  // use this fucntion at line 145 to show the reset password popup
  const [isResetPasswordPopupOpen, setIsResetPasswordPopupOpen] = useState(false);
  const showPopup = () => { 
    setIsResetPasswordPopupOpen(!isResetPasswordPopupOpen);     // make true to false and vice-versa
    //setError('');     // clear the error message when the popup is opened
    setPassword('');   // clear the password field when the popup is opened
  }

  //reset password Popups and JS logic
  // const showResetPasswordPopup = () => {
  //   var popup = document.getElementById("reset-password");
  //   popup.style.display = "flex";
  // }
  const closeResetPasswordPopup = () => {
    //document.getElementById('reset-password').style.display = 'none';
    // Reset the form fields when closing the form
    setResetUsername('');
    setResetEmail('');
    setNewPassword('');
    // Also clear the reset message
    //document.getElementById('reset-message').innerHTML = '';
    // Close the popup by setting the state
    setIsResetPasswordPopupOpen(false);
    // close the toast if it's open
    toast.dismiss();
  }

  const resetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/reset-password', { resetUsername, resetEmail, newPassword }, {
        validateStatus: function (status) {
          // Consider any status code less than 500 as a success status.
          return status < 500;
        }
      });
      console.log('Response:', response);
      if (response.data.message === 'Password reset successful') {
        //document.getElementById("reset-message").textContent = 'Password reset successful 🙂';
        toast.success('Password reset successful 🙂', {
          position: "top-center",
          onClose: () => {
            closeResetPasswordPopup();  // Close the popup when the toast is closed
          }
        });
        // close the reset password popup once toast is gone
        setTimeout(() => {
          closeResetPasswordPopup();
        }, 5700);
      } else if (response.data.message === 'New password cannot be the same as the old password') {
        toast.error('New password cannot be the same as the old password 😬', {position: "top-center"});
      } else {
        //document.getElementById("reset-message").textContent = 'Invalid details, user not found. 😬';
        toast.error('Invalid details, user not found. 😬', {position: "top-center"});
      }
    } catch (error) {
      console.error('Reset password error:', error.response?.data?.message || error.message);
      //document.getElementById("reset-status").textContent = 'Password reset failed';
      toast.error('Password reset failed', {position: "top-center"});
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password }, {
        validateStatus: function (status) {
          // Consider any status code less than 500 as a success status.
          return status < 500;
        }
      });
      console.log('Response:', response);
      if (response.data.message === 'Login successful') {
        // store the user in localStorage, sessionStorage has scope till the tab is open
        //username = response.data.username;
        localStorage.setItem('user', username)
        // navigate to the welcome page
        navigate('/welcome');
      } else {
        //setError(response.data.message);
        toast.error(response.data.message, {position: "top-center"});
      }
    } catch (error) {
      console.error('Login error:', error.response?.data?.message || error.message);
      //setError('Login failed');
      toast.error('Login failed', {position: "top-center"});
    }
  };


  return (
    <>
    {/* <BasicNavbar link1="Home" link2="About" dropdownAction2="Bookings" dropdownAction3="Logout" /> */}
    {/* <BasicNavbar /> */}

    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', border: '1px solid #ccc', height: '80vh', margin: '20px', borderRadius: '20px' }}>
      
      {/* div for react svg logo */}
      {/* <div className="revolving-logo">
        <img id="logo" src={logo} alt="Logo" style={{width: '350px', height: '350px'}}></img>
      </div> */}

      <div className='LoginContent' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff', width: '40%', position: 'absolute' }}>
        {/* Login Header */}
        <div style={{margin: '20px', borderBottom: '2px solid #ddd'}}>
          <h2>Please Login !!!</h2>
        </div>

        {/* Login form */}
        <form className="loginForm" onSubmit={handleLogin} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '20px', border: '1.5px solid #ccc', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '53%'}}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          {/* Password field with toggle visibility */}
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
          {/* Login button to subnit the form */}
          <Button type="submit" style={{marginTop: '20px', width: '40%', padding: '3px'}}>Login</Button>
          {/* button to open the forgot password popup, link throws warning since no link used */}
          <button type='button' id='forgot-password-link' style={{background: 'none', border: 'none', color: 'purple', textDecoration: 'underline', cursor: 'pointer'}} onClick={showPopup}>forgot password ?</button>
        </form>

        {/* Signup button */}
        <div style={{marginTop: '20px'}}>
          <Button variant="success" type="submit" style={{width: '100px', padding: '4px', marginBottom: '30px'}} onClick={() => navigate('/signup')}>Signup</Button>
        </div>
        {/* for error message */}
        {/* <div style={{marginTop: '20px', height: '40px'}}>
          {error && <p style={{color: 'red', fontSize: '25px'}}>{error}</p>}
        </div> */}
      </div>
  
      {/* Reset Password Popup on condition, this way browser will only render this untill it's required, it's styling is present is styles.css */}
      {isResetPasswordPopupOpen && (
      <div id="reset-password" className='resetPassword'>
        {/* Reset Password Header */}
        <div>
          <h1 style={{ marginBottom: '20px', borderBottom: '2px solid #ddd' }}>Reset Password !!!</h1>
        </div>
        <CloseButton onClick={() => closeResetPasswordPopup()} style={{position: 'absolute', top: '5px', right: '5px' }} />
        {/* form forreset password */}
        <form id="reset-password-form" className='resetPasswordForm' onSubmit={resetPassword}>
          <input
            type="text"
            placeholder="Username"
            value={resetUsername}
            onChange={(e) => setResetUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            required
          />
          {/* Password field with toggle visibility */}
          <div style={{ width: '100.5%', marginLeft: '-4.5px' }} >
            <input
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            {/* <span style={{fontSize: '1.3rem', cursor: 'pointer', marginLeft: '-33px', color: '#007bff'}} onClick={() => setPasswordVisible(!passwordVisible)}>
              {passwordVisible ? '🐵' : '🙈'}
            </span> */}
            <span style={{ cursor: 'pointer', marginLeft: '-25px'}} onClick={() => setPasswordVisible(!passwordVisible)}>
              {passwordVisible ? <img src={p_show} alt="show" style={{width: '20px', height: '20px'}} /> : <img src={p_hide} alt="hide" style={{width: '20px', height: '20px'}} />}
            </span>
          </div>
          {/* Reset Password button */}
          <Button type="submit" style={{margin: '20px 20px 0 20px', width: '60%', padding: '4px'}}>Reset Password</Button>
        </form>

        {/* button to close the reset password form */}
        {/* <button className="close-btn" type="button" style={{margin: '15px'}} onClick={() =>   document.getElementById('reset-password').style.display = 'none'}>Close</button> */}
        {/* <Button variant="secondary" type="button" style={{margin: '15px', width: '18%', padding: '4px'}} onClick=  {closeResetPasswordPopup}>Close</Button> */}

        {/* reset message */}
        {/* <p id="reset-message" style={{color: 'red', fontSize: '25px', height: '30px'}}></p> */}
      </div>
      )}

    </div>
    </>
  );
}

export default Login;