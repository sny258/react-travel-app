//import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import axios from 'axios';

//import BasicNavbar from './Navbar';
//import Footer from './Footer';

//import ProgressBar from 'react-bootstrap/ProgressBar';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

//import { FaMapMarkerAlt } from "react-icons/fa";
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Map from '../maps.png';




function AllPackages() {
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

  // Global modal logic to show the map image
  const [show, setShow] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = (imageUrl) => {
    setModalImageUrl(imageUrl);
    setShow(true);
  };
  


  return (
    
    <div>

      {/* <BasicNavbar link1="Home" link2="About" dropdownAction2="Bookings" dropdownAction3="Logout"></BasicNavbar> */}
      {/* <BasicNavbar /> */}
      
      {/* Wrap ProgressBar in a div and apply fixed positioning */}
      {/* <div style={{position: 'fixed', top: 0, width: '100%', zIndex: 1000}}>
        <ProgressBar striped variant="success" now={progress} label={`${Math.round(progress)}%`} />
      </div> */}

      {/* Modal to show the map image */}
      <Modal show={show} onHide={handleClose}>
        <img src={modalImageUrl} alt="map" style={{ width: '100%' }} />
      </Modal>

      <div className='WelcomeContent' style={styles.welcomeContent}>
        {/* <div style={styles.headingContainer}>
          <h2>Where would you like to go ?</h2>
        </div> */}

        <div style={styles.cardContainer}>
          <Card style={styles.card}>
            <div>
              <Card.Img
                variant="top"
                style={styles.cardImage}
                src="https://media1.thrillophilia.com/filestore/2e9qkcdyryljx74c1rfbz9p88nua_wanderon-spiti-winter-11.jpg?dpr=1.5&w=1280/"
              />
              {/* <img src={Map} alt="Map" onClick={() => handleShow("https://i0.wp.com/tripologer.com/wp-content/uploads/2016/09/Spiti-Circuit-Map-Spiti-Valley-Circuit-Route-Map.jpg?w=1200&ssl=1")} style={styles.mapIcon} /> */}
            </div>
            <div style={styles.tourDetails}>
              <p>7 days & 6 nights</p>
              <p>₹ 25,000</p>
              {/* <img src={Map} alt="Map" onClick={() => handleShow("https://i0.wp.com/tripologer.com/wp-content/uploads/2016/09/Spiti-Circuit-Map-Spiti-Valley-Circuit-Route-Map.jpg?w=1200&ssl=1")} style={styles.mapIcon2} /> */}
            </div>
            <Card.Body>
              <Card.Title> 
                Spiti Valley
                <img src={Map} alt="Map" onClick={() => handleShow("https://i0.wp.com/tripologer.com/wp-content/uploads/2016/09/Spiti-Circuit-Map-Spiti-Valley-Circuit-Route-Map.jpg?w=1200&ssl=1")} style={styles.mapIcon2} />
              </Card.Title>
              <Card.Text>
                The beauty of Spiti Valley is located on the northern side of Ladakh. In the east lies Tibet and Kinnaur in the southeast. The north is bordered by Kullu, At an altitude of 12,500 feet above sea level with breathtaking beauty.
              </Card.Text>
              <Button variant="primary" onClick={() => navigate('/spiti')}>Explore</Button>
            </Card.Body>
          </Card>

          <Card style={styles.card}>
            <div>
              <Card.Img
                variant="top"
                style={styles.cardImage}
                src="https://media1.thrillophilia.com/filestore/8x6uyeud8vsavok04lbe0xs5z8hp_shutterstock_1711483000.jpg?h=238&w=auto&dpr=1.5/100px180"
              />
            </div>
            <div style={styles.tourDetails}>
              <p>7 days & 6 nights</p>
              <p>₹ 20,000</p>
              {/* <img src={Map} alt="Map" onClick={() => handleShow("https://miro.medium.com/v2/resize:fit:1100/format:webp/1*PqEDqqj1gVV4kA5cO0jYeA.png")} style={styles.mapIcon2} /> */}
            </div>
            <Card.Body>
              <Card.Title>
                Ladakh
                <img src={Map} alt="Map" onClick={() => handleShow("https://miro.medium.com/v2/resize:fit:1100/format:webp/1*PqEDqqj1gVV4kA5cO0jYeA.png")} style={styles.mapIcon2} />
              </Card.Title>
              <Card.Text>
                Ladakh, often referred to as "The Land of High Passes" is a region located in the northernmost part of India, within the state of Jammu and Kashmir. It is known for its stunning landscapes, unique culture, and spiritual heritage.
              </Card.Text>
              <Button variant="primary" onClick={() => navigate('/ladakh')}>Explore</Button>
            </Card.Body>
          </Card>

          <Card style={styles.card}>
            <Card.Img
              variant="top"
              style={styles.cardImage}
              src="https://as2.ftcdn.net/v2/jpg/05/82/10/05/1000_F_582100502_d8LWRlWFRJqsaD03dHMbrnuc8xZ0uSW5.jpg"
            />
            <div style={styles.tourDetails}>
              <p>5 days & 4 nights</p>
              <p>₹ 12,000</p>
              {/* <img src={Map} alt="Map" onClick={() => handleShow("https://rishikeshdaytour.com/blog/wp-content/uploads/2022/06/Rishikesh-to-Kedarnath.jpg")} style={styles.mapIcon2} /> */}
            </div>
            <Card.Body>
              <Card.Title>
                Kedarnath
                <img src={Map} alt="Map" onClick={() => handleShow("https://rishikeshdaytour.com/blog/wp-content/uploads/2022/06/Rishikesh-to-Kedarnath.jpg")} style={styles.mapIcon2} />
              </Card.Title>
              <Card.Text>
                Kedarnath is a revered pilgrimage site in the Indian Himalayas, known for its ancient Shiva temple, one of the twelve Jyotirlingas. Nestled amidst breathtaking mountain scenery, offering spiritual solace and stunning natural beauty.
              </Card.Text>
              <Button variant="primary" onClick={() => navigate('/kedarnath')}>Explore</Button>
            </Card.Body>
          </Card>

          <Card style={styles.card}>
            <Card.Img
              variant="top"
              style={styles.cardImage}
              src="https://images.unsplash.com/photo-1699214101660-df4e21fbabcd?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <div style={styles.tourDetails}>
              <p>3 days & 2 nights</p>
              <p>₹ 10,000</p>
            </div>
            <Card.Body>
              <Card.Title>Tungnath</Card.Title>
              <Card.Text>
                At astonishing elevation of 3680 metres above sea level, this temple is the highest Shiva temple in the world. Chandrashila AKA the Moon Peak is the peak situated above the Tungnath Temple, offers majestic view of the Himalayas.
              </Card.Text>
              <Button variant="primary">Explore</Button>
            </Card.Body>
          </Card>

          <Card style={styles.card}>
            <Card.Img
              variant="top"
              style={styles.cardImage}
              src="https://plus.unsplash.com/premium_photo-1697730334419-fba83fe143b7?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <div style={styles.tourDetails}>
              <p>4 days & 3 nights</p>
              <p>₹ 15,000</p>
            </div>
            <Card.Body>
              <Card.Title>Munnar</Card.Title>
              <Card.Text>
                Munnar is a hill station situated about 1600m above sea level at the confluence of three mountain streams Muthirapuzha, Nallathanni and Kundala. Munnar is renowned for its scenic tea plantations, lush green hills, and serene lakes.
              </Card.Text>
              <Button variant="primary">Explore</Button>
            </Card.Body>
          </Card>

          <Card style={styles.card}>
            <Card.Img
              variant="top"
              style={styles.cardImage}
              src="https://images.unsplash.com/photo-1642922835816-e2ac68db5c42?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <div style={styles.tourDetails}>
              <p>6 days & 5 nights</p>
              <p>₹ 25,000</p>
            </div>
            <Card.Body>
              <Card.Title>Goa</Card.Title>
              <Card.Text>
              Goa, on India's southwest coast, is famous for its beaches, nightlife, and Portuguese heritage. Panaji and Old Goa feature colonial architecture and historic churches. Goa's diverse cuisine and festive vibe make it a top destination.
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
    //border: '1px solid black',
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
    flexWrap: 'wrap'
  },
  card: {
    width: '18rem',
    margin: '10px 10px 100px 10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
  },
  cardImage: {
    height: '200px',
    objectFit: 'cover',
    borderRadius: '10px 10px 0 0',
  },
  tourDetails: {
    display: 'flex',
    justifyContent: 'space-between',
    color: '#777',
    padding: '5px 10px 0px 10px'
  },
  mapIcon: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    //fontSize: '1.5em',
    //color: '#0599fb',
    cursor: 'pointer',
    width: '25px',
    height: '25px',
    backgroundColor: 'white',     // Added white background
    borderRadius: '50%',
    padding: '1px'
  },
  mapIcon2: {
    //color: '#0599fb',
    cursor: 'pointer',
    marginLeft: '10px',
    width: '22px',
    height: '22px',
    paddingBottom: '0px',
    verticalAlign: 'top'
  }
};

export default AllPackages;