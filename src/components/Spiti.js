import React, { useState, useEffect } from 'react';
//import BasicNavbar from './Navbar';
import { useNavigate } from 'react-router-dom';

import Carousel from 'react-bootstrap/Carousel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';

import './styles.css';
import ImageStack from './ImageStack';


const Spiti = () => {
  
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [emailphone, setEmailPhone] = useState('');
  const [query, setQuery] = useState('');

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    // show modal
    setShow(true);
    // Reset form fields
    setName('');
    setEmailPhone('');
    setQuery('');
  };

  const [showBooking, setShowBooking] = useState(false);
  const handleBookingClose = () => setShowBooking(false);
  const handleBooking = () => {
    if (localStorage.getItem("user") == null) {
      setShowBooking(true);
    } else {
      navigate('/booking');
    }
  };

  // Scroll to top on page, since react router routes to new page on the same position as the parent page. Thats a drawback of react router since it doesn't reload child page.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const images1 = [
    "https://images.unsplash.com/photo-1712758178352-2a2651153bf3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1677820915366-27d887c9b872?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1652543393354-2056fc3e9551?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ];
  const images2 = [
    "https://images.unsplash.com/photo-1657452924934-5d7626640f07?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1655470062377-ef3f5161960a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG1hbmFsaXxlbnwwfHwwfHx8MA%3D%3D",
    "https://images.unsplash.com/photo-1571677465484-2dd540924245?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fG1hbmFsaXxlbnwwfHwwfHx8MA%3D%3D"
  ];
  const images3 = [
    "https://images.unsplash.com/photo-1651319487316-c661cd4a7cb9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1651319478024-a5bc4349b2c7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1692719058797-2954b100c8fe?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ];
  const images4 = [
    "https://images.unsplash.com/photo-1681798805445-2b24c2cb8f64?q=80&w=2008&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1698753935263-0eca2103d2db?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1598429725052-bbd6eca769d1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fG1hbmFsaXxlbnwwfHwwfHx8MA%3D%3D"
  ];
  const images5 = [
    "https://images.unsplash.com/photo-1706439380633-d1c19e0b9b4b?q=80&w=1990&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://plus.unsplash.com/premium_photo-1661963083312-8adde31d9900?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEj6_Gp0taur6z7BVka6-kd6TOI3w6Njs0IXzQ-NnajF02oJmqZNZEWGHJcRe9XILk5jh8qR6me-9OyOtNA_qMVOhaNLtzoCJHqNFyCAKdvcbpeqauhb9-qX-HP6OlnJw-isF1e5FM7SGMY/s640/IMG_1461.JPG"
  ];
  const images6 = [
    "https://images.unsplash.com/photo-1619282401041-56e69dcc5335?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://media1.thrillophilia.com/filestore/djrv9m3ejfeio6oqk89bww3kwqvq_shutterstock_679406089.jpg?dpr=1.5&w=1280",
    "https://images.unsplash.com/photo-1631139946993-b29d3b5c00a9?q=80&w=1846&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ];
  const images7 = [
    "https://images.unsplash.com/photo-1670758553990-c46cece80aa8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1605649487212-47bdab064df7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1642474620281-1343d25b18f8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ];

  return (
    <div>

      {/* <BasicNavbar link1="Home" link2="About" dropdownAction2="Bookings" dropdownAction3="Logout" /> */}
      {/* <BasicNavbar /> */}

      <div className="Spiti" style={styles.itinerary}>
        <div className="Heading" style={styles.heading}>
          <h1 style={styles.title}>Spiti Valley</h1>
          <p style={styles.subtitle}>Enjoy the beauty of Spiti Valley with us.</p>
        </div>
        <Carousel className="Carousel" style={styles.carousel}>
          <Carousel.Item>
            <img
              style={styles.image}
              src="https://media1.thrillophilia.com/filestore/2e9qkcdyryljx74c1rfbz9p88nua_wanderon-spiti-winter-11.jpg?dpr=1.5&w=1280/"
              alt="img-1"
            />
            <Carousel.Caption style={styles.caption}>
              <h3>Langza Buddha Statue</h3>
              <p>Lord Buddha's iconic statue localted Langza village of Spiti valley</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              style={styles.image}
              src="https://media1.thrillophilia.com/filestore/2e2jk8u5jhn1fhm7ogkczahuli72_snapedit_1697441789958.png?dpr=1.5&w=1280"
              alt="img-2"
            />
            <Carousel.Caption style={styles.caption}>
              <h3>Key Monestry</h3>
              <p>A centuries-old Tibetan Buddhist monastery situated majestically in the Spiti Valley </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              style={styles.image}
              src="https://media1.thrillophilia.com/filestore/kccxfelb04fndkur10u9h4bsf7qj_hxt6odbxvxvxc7rd693f6ymwzk65_shutterstock_2005336715.jpeg?dpr=1.5&w=1280"
              alt="img-3"
            />
            <Carousel.Caption style={styles.caption}>
              <h3>Hikkim Post Office</h3>
              <p>located at 3,657 meters in the Spiti Valley, is one of the highest post offices in the world.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              style={styles.image}
              src="https://media1.thrillophilia.com/filestore/djrv9m3ejfeio6oqk89bww3kwqvq_shutterstock_679406089.jpg?dpr=1.5&w=1280"
              alt="img-4"
            />
            <Carousel.Caption style={styles.caption}>
              <h3>Chandratal Lake</h3>
              <p>A mesmerizing high-altitude gem in Himachal Pradesh, India.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      <div className="AboutItinerary" style={{display: 'flex', flexDirection: 'column', padding: '30px 50px 20px 50px', margin: '20px', borderRadius: '15px', border: '1px solid #ccc', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#f9f9f9'}}>
        <div>
          <h3 style={{marginBottom: '20px', borderBottom: '2px solid #ddd'}}>About the Tour</h3>
        </div>
        <div>
          <p>Imagine starting your journey in Delhi, leaving behind the city's chaos, and entering the serene landscapes of Manali and Spiti Valley, where rugged mountains meet clear blue skies. Kaza, Tabo, Dhankar, Pin Valley, and the shimmering Chandra Tal Lake will be your playgrounds, each offering a unique flavor of Spiti's natural beauty and ancient monasteries. This journey is a rare opportunity to explore remote high-altitude villages and ancient monasteries and connect with the warm-hearted locals.</p>
        </div>
        <div>
          <h4 style={{marginTop: '10px', marginBottom: '20px', borderBottom: '2px solid #ddd'}}>Quick Info</h4>
          <ul style={{marginLeft: '10px'}}>
            <li><span style={{fontWeight: '600'}}>Route:</span> Delhi - Manali - Kaza - Tabo - Dhankar - Pin Valley - Chandra Tal - Manali - Delhi
            </li>
            <li><span style={{fontWeight: '600'}}>Duration:</span> 7 Days, 6 Nights</li>
            <li><span style={{fontWeight: '600'}}>Start Point:</span> Delhi</li>
            <li><span style={{fontWeight: '600'}}>End Point:</span> Delhi</li>
          </ul>
        </div>
      </div>
      
      <div className="ItineraryContainer" style={styles.itineraryContainer}>
        <div className="Itinerary" style={styles.itineraryContent}>
          <h1 className="ItineraryHeader" style={styles.itineraryHeader}>Itinerary</h1>
          <Accordion defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Day 1 : Depart from Delhi to Manali</Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>Upon reaching Delhi, you will have to proceed towards your boarding point for the overnight bus from Delhi to Manali.</li>
                  <li>Make sure to pack the bag of your happiness.</li>
                  <li>It will be a 502 Km journey taking almost 10-12 Hours.</li>
                </ul>
                {/* <ImageStack image1="https://images.unsplash.com/photo-1712758178352-2a2651153bf3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" image2="https://images.unsplash.com/photo-1677820915366-27d887c9b872?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" image3="https://images.unsplash.com/photo-1652543393354-2056fc3e9551?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/> */}
                <ImageStack images={images1} />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Day 2 : Arrival in Manali and Sightseeing</Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>After reaching Manali check into the hotel, have breakfast, rest a bit and then get ready for Sightseeing.</li>
                  <li>Visit Hadimba Temple, encircled by deodars, and seek solace at the Buddhist Temple with vibrant murals.</li>
                  <li>Discover Siyali Mahadev Temple by the Beas River, visit Vashisht Temple with hot springs, and explore Manu Temple, dedicated to sage Manu.</li>
                  <li>Stroll through Mall Road, lined with shops, cafes, and local eateries.</li>
                  <li>Return to the hotel for a cozy overnight stay, reminiscing about the day's adventures and cultural encounters.</li>
                </ul>
                <ImageStack images={images2} />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Day 3 : Manali to Kaza via Kunzum Pass</Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>It will be a 183 Km journey taking almost 5-6 Hours, Enjoy stunning views and exciting adventures along the way.</li>
                  <li>Travel through the Atal Tunnel to Chatru and Batal, revealing Spiti's unique green landscapes.</li>
                  <li>Next, feel the chill at Kunzum Pass (14,931 ft), a pass that connects Lahaul Valley with Spiti Valley before reaching Spiti's charming Losar Village.</li>
                  <li>Stop at Losar for hot tea, then continue your journey to vibrant Kaza through captivating panoramas.</li>
                  <li>Arrive in Kaza, and experience its cultural vibrancy and breathtaking landscapes.</li>
                </ul>
                <ImageStack images={images3} />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>Day 4 : Sightseeing Around Kaza</Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>Visit Asia's highest village, Komik, known as "eye of a snow cock," to relish breathtaking Himalayan panoramas.</li>
                  <li>Reach Hikkim village, home to the world's highest post office and send postcards to your loved ones.</li>
                  <li>Explore the iconic Key Monastery and walk past its beautifully painted mural walls.</li>
                  <li>Continue your journey to Kibber, a picturesque village with captivating landscapes and breathtaking mountain vistas.</li>
                  <li>End your tour in Gette, a secluded village with stunning aerial views of Kaza. Capture the beauty and tie prayer flags.</li>
                </ul>
                <ImageStack images={images4} />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>Day 5 : Excursion to Tabo with Dhankar and Pin Valley</Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>Start your day with an early breakfast before leaving for Tabo.</li>
                  <li>Immerse yourself in the unique artistry of the 1020-year-old Tabo Monastery, a UNESCO heritage site blending Tibetan, Indian, and Kashmiri influences.</li>
                  <li>After your exploration, retrace your steps, turning towards Dhankar village, perched above the confluence of the Spiti and Pin Rivers.</li>
                  <li>Your journey continues to the scenic Pin Valley, a thriving national park.</li>
                  <li>Delve into the serenity of Kungri Monastery before reaching Mudh, the final motorable village in Pin Valley, a testament to the region's allure.</li>
                </ul>
                <ImageStack images={images5} />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5">
              <Accordion.Header>Day 6 : Kaza to Chandratal Lake</Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>Begin your return journey post-breakfast, It will be 97km journet taking almost 5 hours.</li>
                  <li>Reliving Kaza-Manali's scenic road. Admire nature's beauty before detouring to the enchanting Chandratal Lake.</li>
                  <li>Nestled at 14,100 feet, Chandratal's charm changes with light, casting captivating reflections against the Chandra Bhaga range.</li>
                  <li>Embrace Chandratal's allure, descend to your campsite, and see the galaxy full of stars with your naked eyes.</li>
                </ul>
                <ImageStack images={images6} />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="6">
              <Accordion.Header>Day 7 : Chandratal Lake to Manali and Departure to Delhi</Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>This will be last day of the journey, taking you back to manali.</li>
                  <li>It will be a 111km journey taking almost 4-5 hours.</li>
                  <li>Hope you will carry lots of memories along with you.</li>
                </ul>
                <ImageStack images={images7} />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>

        <div className="EnquiryBookingForm" style={styles.enquiryForm}>
          <h2 style={{ marginBottom: '20px' }}>Send Enquiry</h2>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} required />
              <Form.Control type="tetx" placeholder="Enter email/phone" value={emailphone} onChange={(e) => setEmailPhone(e.target.value)} required />
              <Form.Control as="textarea" rows={3} placeholder="Enter query" style={{ height    : 'auto' }} value={query} onChange={(e) => setQuery(e.target.value)} required />
            </Form.Group>

            <Button variant="primary" type="submit"> Submit </Button>

            <div style={{marginTop: '20px', borderTop: '2px solid #ddd'}}>
              <Button variant="success" type='button' onClick={handleBooking} style={{marginTop: '20px'}}>Book Now</Button>
            </div>
          </Form>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Enquiry Submitted !!!</Modal.Title>
            </Modal.Header>
            <Modal.Body>We have received your query, Will get in touch with you soon.</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>

          <Modal show={showBooking} onHide={handleBookingClose}>
            <Modal.Header closeButton>
              <Modal.Title>Booking Alert !!!</Modal.Title>
            </Modal.Header>
            <Modal.Body>Please login to book the trip.</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={() => navigate('/login')}>Login</Button>
              <Button variant="secondary" onClick={handleBookingClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>

      </div>

    </div>
  );
};

const styles = {
  itinerary: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
    margin: '20px',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    borderBottom: '2px solid #ddd',
    paddingBottom: '10px',
    width: '100%',
  },
  title: {
    fontSize: '2.5em',
    margin: '0',
    color: '#333',
  },
  subtitle: {
    fontSize: '1.2em',
    margin: '10px 0 0 0',
    color: '#777',
  },
  carousel: {
    width: '90%',
    maxWidth: '1200px',
    height: '500px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '480px',
    objectFit: 'cover',
  },
  caption: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '10px',
    padding: '10px',
  },
  itineraryContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    padding: '5px',
    margin: '20px',
    borderRadius: '15px',
    border: '1px solid #ccc',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9'
  },
  itineraryHeader: {
    textAlign: 'center',
    borderBottom: '2px solid #ddd',
    paddingBottom: '10px',
  },
  itineraryContent: {
    flexGrow: '1',
    margin: '50px',
    width: '60%',
    borderRadius: '15px',
    border: '1px solid #ccc',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9'
  },
  enquiryForm: {
    margin: '50px 50px 50px 0',
    padding: '15px',
    textAlign: 'center',
    border: '1px solid #ccc',
    backgroundColor: '#f9f9f9',
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    // position: '-webkit-sticky',
    position: 'sticky',
    top: '50px',                    /* gap from top for scrolling div */
    marginTop: '100px',             /* or either make alignItems: 'center' */ 
    width: '24%',   
  },
};

export default Spiti;
