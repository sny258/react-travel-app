import React from 'react';
import './styles.css';

function Home() {
  return (
    <div>

      <div className='Header' style={{border: '1px solid black', textAlign: 'center'}}>
        <h1>Home Page</h1>
        <p>Welcome to the Home Page</p>        
      </div>

      <div className='Content' style={{border: '1px solid black', margin: '20px', textAlign: 'center'}}>
          <p>Welcome Page Content</p>
      </div>

    </div>
  );
}

export default Home;
