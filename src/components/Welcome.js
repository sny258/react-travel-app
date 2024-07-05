//import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//import axios from 'axios';

import BasicNavbar from './Navbar';

//import ProgressBar from 'react-bootstrap/ProgressBar';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Welcome() {
  const navigate = useNavigate();

  // Progress Bar JS logic
  // const [progress, setProgress] = useState(0);
  // const handleScroll = () => {
  //   const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
  //   const currentScroll = window.scrollY;
  //   const scrolled = (currentScroll / totalHeight) * 100;
  //   setProgress(scrolled);
  // };
  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);


  // Fetch GIFs from Giphy API
  // const [gifs, setGifs] = useState([]);
  // useEffect(() => {
  //   fetchGifs();
  // }, []);
  // const fetchGifs = async () => {
  //   try {
  //     const response = await fetch('https://api.giphy.com/v1/gifs/trending?api_key=RYt46DnsO1PtMde4tf9oxxxxxxxlimit=20');
  //     const data = await response.json();
  //     console.log(data); // Log the response data
  //     setGifs(data.data);
  //   } catch (error) {
  //     console.error('Error fetching GIFs:', error);
  //   }
  // };


  return (
    
    <div>
      
      {/* <BasicNavbar/> */}
      {/* <BasicNavbar link1="Home" link2="About" dropdown="Explore" dropdownAction1="Products" dropdownAction2="Prices" onHref3Click= {handleLogout2} dropdownAction3="Logout"></BasicNavbar> */}
      <BasicNavbar link1="Home" link2="About" dropdownAction2="Bookings" dropdownAction3="Logout"></BasicNavbar>
      
      {/* Wrap ProgressBar in a div and apply fixed positioning */}
      {/* <div style={{position: 'fixed', top: 0, width: '100%', zIndex: 1000}}>
        <ProgressBar striped variant="success" now={progress} label={`${Math.round(progress)}%`} />
      </div> */}

      <div className='WelcomeContent' style={styles.welcomeContent}>
        <div style={styles.headingContainer}>
          <h2>Where would you like to go ?</h2>
        </div>

        <div style={styles.cardContainer}>
          <Card style={styles.card}>
            <Card.Img
              variant="top"
              style={styles.cardImage}
              src="https://media1.thrillophilia.com/filestore/2e9qkcdyryljx74c1rfbz9p88nua_wanderon-spiti-winter-11.jpg?dpr=1.5&w=1280/"
            />
            <Card.Body>
              <Card.Title>Spiti Valley</Card.Title>
              <Card.Text>
                The beauty of Spiti Valley is located on the northern side of Ladakh. In the east lies Tibet and Kinnaur in the southeast. The north is bordered by Kullu, At an altitude of 12,500 feet above sea level with breathtaking beauty.
              </Card.Text>
              <p>test</p>
              <Button variant="primary" onClick={() => navigate('/spiti')}>Explore</Button>
            </Card.Body>
          </Card>

          <Card style={styles.card}>
            <Card.Img
              variant="top"
              style={styles.cardImage}
              src="https://media1.thrillophilia.com/filestore/8x6uyeud8vsavok04lbe0xs5z8hp_shutterstock_1711483000.jpg?h=238&w=auto&dpr=1.5/100px180"
            />
            <Card.Body>
              <Card.Title>Ladakh</Card.Title>
              <Card.Text>
                Ladakh, often referred to as "The Land of High Passes," is a region located in the northernmost part of India, within the state of Jammu and Kashmir. It is known for its stunning landscapes, unique culture, and spiritual heritage.
              </Card.Text>
              <Button variant="primary">Explore</Button>
            </Card.Body>
          </Card>

          <Card style={styles.card}>
            <Card.Img
              variant="top"
              style={styles.cardImage}
              src="https://as2.ftcdn.net/v2/jpg/05/82/10/05/1000_F_582100502_d8LWRlWFRJqsaD03dHMbrnuc8xZ0uSW5.jpg"
            />
            <Card.Body>
              <Card.Title>Kedarnath</Card.Title>
              <Card.Text>
                Kedarnath is a revered pilgrimage site in the Indian Himalayas, known for its ancient Shiva temple, one of the twelve Jyotirlingas. Nestled amidst breathtaking mountain scenery, offering spiritual solace and stunning natural beauty.
              </Card.Text>
              <Button variant="primary">Explore</Button>
            </Card.Body>
          </Card>

        </div>
      </div>

      {/* Display the GIFs from the Giphy API */}
      {/* <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '5px', border: '1px solid black'}}>

        <h1 style={{margin: '5px', border: '1px solid black'}}>Image Gallery</h1>

        <div className="gif-gallery" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', border: '1px solid black', width: '90%'}}>
          {Array.isArray(gifs) && gifs.map((gif) => (
            <img key={gif.id} src={gif.images.fixed_height.url} alt={gif.title} />
          ))}
        </div>

      </div> */}

    </div>
  );
}


const styles = {
  welcomeContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid black',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    margin: '20px',
  },
  headingContainer: {
    margin: '10px',
    padding: '5px',
    textAlign: 'center',
    borderBottom: '2px solid #ddd',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '5px',
    padding: '5px',
    width: '100%',
    flexWrap: 'wrap',
  },
  card: {
    width: '18rem',
    margin: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
  },
  cardImage: {
    height: '200px',
    objectFit: 'cover',
    borderRadius: '10px 10px 0 0',
  },
};

export default Welcome;