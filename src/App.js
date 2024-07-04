import './App.css';
//import { useState } from 'react';
//import { Link } from 'react-router-dom';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Login from './components/Login';
import Signup from './components/Signup';
import Welcome from './components/Welcome';
import Spiti from './components/Spiti';
import Booking from './components/Booking';


function App() {

  return (
    <>
    
    {/* href reloads the pages when rendered */} 
    {/* <div className='Header' style={{border: '1px solid black', margin: '20px', textAlign: 'center', padding: '15px'}}>
      <h1>React Auth Application</h1>
      <a href="/login">Login</a>
      <a href="/signup" style={{marginLeft: '15px'}}>Signup</a>
      <a href="/welcome" style={{marginLeft: '15px'}}>Welcome</a>
    </div> */}
    {/* <div className='Content' style={{border: '1px solid black', margin: '20px'}}>
      <nav>
        <ul>
          <li><a href="/login">Login</a></li>
          <li><a href="/signup">Signup</a></li>
          <li><a href="/welcome">Welcome</a></li>
        </ul>
      </nav>
    </div> */}

    <Router>

      {/* link doesn't reload the pages when rendered, but works inside router block only */}  
      {/* <div className='Header' style={{border: '1px solid black', margin: '20px', textAlign: 'center', padding: '15px'}}>
        <h1>React Application</h1>  
        <Link to="/login" style={{marginRight: '15px'}}>Login</Link>
        <Link to="/signup" style={{marginRight: '15px'}}>Signup</Link>
        <Link to="/welcome">Welcome</Link>
      </div> */}
        
      <Routes>
  
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/" element={<Navigate to="/welcome" />} />
        <Route path="/spiti" element={<Spiti />} />
        <Route path="/booking" element={<Booking />} />

      </Routes>

    </Router>

    </>
  );
}

export default App;



