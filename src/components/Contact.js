import React, { useState } from 'react';

function Contact() {
  const [showPopup, setShowPopup] = useState(false);

  const handleClick = () => {
    setShowPopup(true);
  };

  const handleClose = () => {
    setShowPopup(false);
  };

  const goHome = () => {
    window.location.href = '/Home';
  };

  const popupStyle = {
    border: '1px solid black',
    padding: '10px',
    marginTop: '20px',
    'text-align': 'center'
    // ,'display': 'inline-block'
  };

  return (
    <div>
      <div className='Contnent' style={{padding: '20px', 'text-align': 'center', border: '1px solid black'}}>
        <h1>Contact Page</h1>
      </div >
      
      <div className='Contnent' style={{padding: '20px', 'margin-top': '20px', 'text-align': 'center', border: '1px solid black'}}>
        <p>Welcome to Contact Page !!!</p>
        <button className="btn btn-primary" onClick={handleClick} style={{marginTop: '10px'}}>Home</button>
      </div >
      
      {showPopup && 
        <div className="popup" style={popupStyle}>
          <p>Visit Home Page ? </p>
          <button onClick={goHome}>Yes</button>
          <br></br>
          <button onClick={handleClose} style={{marginTop: '5px'}}>Close</button>
        </div>
      }
    </div>

  );
}

export default Contact;