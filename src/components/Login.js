//import React, { useState, useEffect } from 'react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css';
import BasicNavbar from './Navbar';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
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
    setError('');     // clear the error message when the popup is opened
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
    document.getElementById('reset-message').innerHTML = '';
    // Close the popup by setting the state
    setIsResetPasswordPopupOpen(false);
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
        document.getElementById("reset-message").textContent = 'Password reset successful 🙂';
      } else {
        document.getElementById("reset-message").textContent = 'Invalid details, user not found. 😬';
      }
    } catch (error) {
      console.error('Reset password error:', error.response?.data?.message || error.message);
      document.getElementById("reset-status").textContent = 'Password reset failed';
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
        localStorage.setItem('user', username)
        // navigate to the welcome page
        navigate('/welcome');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Login error:', error.response?.data?.message || error.message);
      setError('Login failed');
    }
  };


  return (
    <>
    <BasicNavbar link1="Home" link2="About" dropdownAction2="Bookings" dropdownAction3="Logout" />

    <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', border: '1px solid black', height: '80vh', margin: '20px', borderRadius: '20px' }}>
      
      {/* div for react svg logo */}
      {/* <div className="revolving-logo">
        <img id="logo" src={logo} alt="Logo" style={{width: '350px', height: '350px'}}></img>
      </div> */}

      <div className='LoginContent' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', border: '1px solid black', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff', borderRadius: '15px', width: '40%' }}>
        {/* Login Header */}
        <div style={{margin: '20px'}}>
          <h2>Please Login !!!</h2>
        </div>

        {/* Login form */}
        <form onSubmit={handleLogin} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', border: '1px solid black', borderRadius: '10px'}}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {/* Login button to subnit the form */}
          <button type="submit" style={{marginTop: '15px', width: '40%'}}>Login</button>

          {/* link to open the forgot password popup, but it throws warning since no link used */}
          {/* <a href="#" id="forgot-password-link" onClick={() => document.getElementById  ('reset-password').style.display = 'flex'}>forgot password ?</a> */}

          {/* button to open the forgot password popup */}
          <button type='button' id='forgot-password-link' style={{background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer'}} onClick={showPopup}>forgot password ?</button>
        </form>

        {/* Signup button */}
        <div style={{marginTop: '20px'}}>
          <button type="submit" style={{width: '100px'}} onClick={() => navigate('/signup')}>Signup</button>
        </div>

        {/* for error message */}
        <div style={{marginTop: '20px', height: '40px'}}>
          {error && <p style={{color: 'red', fontSize: '25px'}}>{error}</p>}
        </div>
      </div>
  
      {/* Reset Password Popup on condition, this way browser will only render this untill it's required, it's styling is present is styles.css */}
      {isResetPasswordPopupOpen && (
      <div id="reset-password" className='resetPassword'>
        {/* Reset Password Header */}
        <div>
          <h1 style={{ marginBottom: '20px' }}>Reset Password</h1>
        </div>

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
          <input
            type="password"
            placeholder="New_Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          {/* Reset Password button */}
          <button type="submit" style={{marginTop: '20px'}}>Reset Password</button>
        </form>

        {/* button to close the reset password form */}
        {/* <button className="close-btn" type="button" style={{margin: '15px'}} onClick={() =>   document.getElementById('reset-password').style.display = 'none'}>Close</button> */}
        <button id="close-btn" type="button" style={{margin: '15px'}} onClick=  {closeResetPasswordPopup}>Close</button>

        {/* reset message */}
        <p id="reset-message" style={{color: 'red', fontSize: '25px', height: '30px'}}></p>
      </div>
    )}

    </div>
    </>
  );
}

export default Login;