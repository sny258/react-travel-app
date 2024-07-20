import React, { useState, useEffect } from 'react';
//import BasicNavbar from './Navbar';
import { useNavigate } from 'react-router-dom';

import Carousel from 'react-bootstrap/Carousel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';

import { IoIosCloseCircle } from "react-icons/io";
import './styles.css';
//import ImageStack from './ImageStack';
import { toast } from 'react-toastify';
import axios from 'axios';
import ImageStackCarousel from './ImageStackCarousel';


const Kedarnath = () => {
  
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [emailphone, setEmailPhone] = useState('');
  const [query, setQuery] = useState('');

  // Set the default config for axios
  axios.defaults.withCredentials = true;

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
      //navigate('/booking');
      //send trip name to booking page as state hook
      navigate('/booking', { state: { trip: 'Kedarnath' } });
    }
  };

  // Scroll to top on page, since react router routes to new page on the same position as the parent page. Thats a drawback of react router since it doesn't reload child page.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Review Modal
  const [showReview, setShowReview] = useState(false);
  const [reviewData, setReviewData] = useState('');
  //const user = localStorage.getItem('user');
  // // Add review function
  // const addReview = () => {
  //   const review = document.getElementById('reviews');
  //   const newReview = document.createElement('div');
  //   newReview.innerHTML = `<h4>${user}</h4><p>${reviewData}</p>`;
  //   Object.assign(newReview.style, styles.reviewCard);
  //   review.appendChild(newReview);
  //   setShowReview(false);
  //   setReviewData(''); // Reset form
  // };


  // Use state to store the reviews
  const [reviews, setReviews] = useState([]);
  // Use state to trigger re-fetching reviews
  const [refreshReviews, setRefreshReviews] = useState(false);
  // useEffect to fetch the reviews
  useEffect(() => {
    const trip = 'Kedarnath';
    const getReviews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/reviews/' + trip, {
          validateStatus: function (status) {
            // Consider any status code less than 500 as a success status.
            return status < 500;
          }
        });
        console.log('Response:', response);
        if (response.status === 200) {
          setReviews(response.data.reviews);
        } else {
          console.error('Reviews error:', response.data.message);
        }
      } catch (error) {
        console.error('Reviews error:', error.response?.data?.message || error.message);
      }
    };
    getReviews();
  }, [refreshReviews]);

  // function to handle review submit
  const handleAddReview = async (e) => {
    e.preventDefault();
    const username = localStorage.getItem("user");
    const trip = 'Kedarnath';
    console.log(reviewData);
    try {
      const response = await axios.post('http://localhost:5000/add-review', { trip, username, reviewData }, {
        validateStatus: function (status) {
          // Consider any status code less than 500 as a success status.
          return status < 500;
        }
      });
      console.log('Response:', response);
      if (response.status === 200) {
        toast.success('Review added successfully', {position: "top-center"});
        // Re-fetch the reviews
        setRefreshReviews(!refreshReviews);
        // Close the modal
        setShowReview(false);
        setReviewData('');
      } else {
        console.error('Review error:', response.data.message);
        toast.error('Adding review failed !!!');
      }
    } catch (error) {
        console.error('Review error:', error.response?.data?.message || error.message);
        alert('Adding review failed !!!');
    }
  }
  
  // Logics to show add review button only if user has completed the trip
  // reviewable is a state variable
  const [reviewable, setReviewable] = useState(false);
   // hook to make add review button visible only if user has completed the trip
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const user = localStorage.getItem('user');
        const response = await axios.get(`http://localhost:5000/bookings/${user}`);
        console.log('Bookings data:', response.data);
        // Check if the user has booked a trip to 'Kedarnath' that is in the past
        const hasCompletedTrip = response.data.bookings.some(booking => {
          return booking.trip === 'Kedarnath' && new Date(booking.date) < new Date();
        });
        // allow 7 days after the trip to add review
        // const hasCompletedTrip = response.data.bookings.some(booking => {
        //   const bookingDate = new Date(booking.date);
        //   const currentDate = new Date();
        //   currentDate.setDate(currentDate.getDate() - 7); // Subtract 7 days from current date
        //   return booking.trip === 'Kedarnath' && bookingDate < currentDate;
        // });
        // Set reviewable based on the check
        setReviewable(hasCompletedTrip);
      } catch (error) {
        console.error('Error fetching bookings:', error.response?.data?.error || error.message);
      }
    };
    // only execute if user is logged in
    const user = localStorage.getItem('user');
    if (user) {
      fetchBookings();
    }
  }, []);     // only executes ones on initial render


  // corousel logic for grid images
  const [show2, setShow2] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = (index) => {
    setActiveIndex(index);
    setShow2(true);
  };

  const images = [
    {
      src: "https://media1.thrillophilia.com/filestore/5mbt7e67l23mwpaptx9qxsqvapat_Kedarnath%20Temple%20Trek%202.jpeg?h=-14&w=auto&dpr=1.5",
      title: "Kedarnath Temple",
      description: "One of the holiest Hindu temples dedicated to Lord Shiva."
    },
    {
      src: "https://media1.thrillophilia.com/filestore/nm6lchf74jbo2u9zebuntq9i56oy_Kedarnath,%20Uttarakhand.jpeg?w=1080&amp;h=auto&amp;dpr=1.5",
      title: "Kedarnath",
      description: "One of the Char Dhams of India and the most important of the Panch Kedars."
    },
    {
      src: "https://media1.thrillophilia.com/filestore/b9mr4amffthcjgs6iccqrfubixru_Bhairavnath%20Temple%20Route.jpeg?w=1080&h=auto&dpr=1.5",
      title: "Bhairavnath",
      description: "Above the temple of Kedarnath, dedicated to Bhairav, the fierce incarnation of Lord Shiva."
    },
    {
      src: "https://media1.thrillophilia.com/filestore/l8lkvox0s75ua5noututp29qwvp5_shutterstock_2427636657.jpg?w=1080&amp;h=auto&amp;dpr=1.5",
      title: "Gaurikund",
      description: "The place to start the trek to Kedarnath, where Lord Shiva accepted Goddess Parvati as his wife."
    },
    {
      src: "https://media1.thrillophilia.com/filestore/c7inp4zg4692wo17ht8vpbs55x0a_outlooktraveller_2Fimport_2Fpublic_2Fuploads_2Ffilemanager_2Fimages_2FGanga-advertorial-(3).jpg?dpr=1.5&w=1280",
      title: "Devprayag",
      description: "Confluence of the Alaknanda and Bhagirathi rivers to form the Ganges."
    },
    {
      src: "https://media1.thrillophilia.com/filestore/kf5427mzkof5n6s9r065811kjhfx_DyzbJRPU8AIPZbP.jpg?dpr=1.5&w=1280",
      title: "Har ki Pauri",
      description: "One of the ghats in Haridwar, where the Ganges leaves the mountains and enters the plains."
    },
    {
      src: "https://media1.thrillophilia.com/filestore/51smzj3y7ofvlrflx27ojhqiigra_lier914g6kiu5s6an9qeol82trju_ymzoauwolm4bzs9hzwnu55hq2ut7_1592920297_shutterstock_1005613216.jpg?dpr=1.5&w=1280",
      title: "Ganga Aarti",
      description: "Evening prayer ceremony on the banks of the Ganges in Haridwar."
    }
  ];

  
  const images1 = [
    "https://media1.thrillophilia.com/filestore/bs9bwfots9mowvjpwbmjowx94ktp_shutterstock_87272683.jpg?h=-14&w=auto&dpr=1.5",
    "https://media1.thrillophilia.com/filestore/ge9olrsgffb4y3064xxed0ktvnhh_1587219650_har5.png?dpr=1.5&w=1280",
    "https://media1.thrillophilia.com/filestore/pakovl6tlqg2vcall4zzz8bh1u4r_1587219650_Har2.png?dpr=1.5&w=1280"
  ];
  const images2 = [
    "https://media1.thrillophilia.com/filestore/7j0o9jvy5al4ixaoct5la7qwdbo1_shutterstock_1641987145.jpg?dpr=1.5&w=1280",
    "https://images.unsplash.com/photo-1687511741630-18fe16e8ed7e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://media1.thrillophilia.com/filestore/ybls63ehe6lf4amuahlclxvmdbor_shutterstock_2344524563.jpg?w=700&dpr=1.5"
  ];
  const images3 = [
    "https://media1.thrillophilia.com/filestore/wxhaia28jzw50gmguf34m9zr8avq_138928347_1029498000892617_3366905140590753147_n.jpg?dpr=1.5&w=1280",
    "https://media1.thrillophilia.com/filestore/xb5258qbeupq3k2kk1h3wg3ap2ca_Bhairavnath%20Temple.jpeg?w=1080&h=auto&dpr=1.5",
    "https://media1.thrillophilia.com/filestore/2srg5x0x2zzn222ncxx8sjzk466t_Kedarnath%20Temple%20Front%20View.jpeg?h=-14&w=auto&dpr=1.5"
  ];
  const images4 = [
    "https://media1.thrillophilia.com/filestore/4g5f0m5q86nfersxxc3i5jmfo0fe_1581755142_rishikesh1.jpg?dpr=1.5&w=1280",
    "https://media1.thrillophilia.com/filestore/1i8ppq616ci5n62qpf7b22vobpat_Barapole-River-Rafting-image_20171012135016.jpg?dpr=1.5&w=1280",
    "https://media1.thrillophilia.com/filestore/5z7iv9pos6h7lgxyq3tqksfkt5mx_1581755144_rishikesh3.jpg?dpr=1.5&w=1280"
  ];
  const images5 = [
    "https://media1.thrillophilia.com/filestore/7zc2fgwqvsdnvp6e2dmnson17wp0_1581755145_rishikesh5.jpg?dpr=1.5&w=1280",
    "https://media1.thrillophilia.com/filestore/4i0l6u329nf6ln6mo1b4ozp2gfao_shutterstock_349996625.jpg?h=-14&w=auto&dpr=1.5",
    "https://media.istockphoto.com/id/1022790556/photo/folded-beach-umbrella-and-text-back-to-work.jpg?s=2048x2048&w=is&k=20&c=uEWLBkpRMx86IzBJULUArv9o17-IGuBeVx9vnCwfhbg="
  ];


  return (
    <div>

      {/* Modal of xl size to show the corousel */}
      <Modal className="kedarnathModal" show={show2} onHide={handleClose2} size="xl" centered>
        {/* <Modal.Header closeButton>
          <Modal.Title>Gallery ...</Modal.Title>
        </Modal.Header> */}
        <Carousel className="Carousel"
          style={ styles.carousel } 
          activeIndex={activeIndex} 
          onSelect={(selectedIndex) => setActiveIndex(selectedIndex)}
        >
          {images.map((image, index) => (
            <Carousel.Item key={index}>
              <img
                style={styles.image}
                src={image.src}
                alt={`img-${index + 1}`}
              />
              <Carousel.Caption style={styles.caption}>
                <h3>{image.title}</h3>
                <p>{image.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
        <IoIosCloseCircle style={styles.closeIcon} onClick={handleClose2}/>
      </Modal>

      <div className="Kedarnath" style={styles.itinerary}>
        <div className="Heading" style={styles.heading}>
          <h1 style={styles.title}>Kedarnath</h1>
          <p style={styles.subtitle}>Enjoy the serenity of Kedarnath with us.</p>
        </div>
        <div className="gridContainer" style={styles.gridContainer}>
          {images.map((image, index) => (
            <div
              key={index}
              className="gridItem"
              style={index === 0 ? styles.gridItemLarge : styles.gridItem}
              onClick={() => handleShow2(index)}
            >
              <img 
                style={styles.gridImage}
                src={image.src}
                alt={`img-${index + 1}`}
              />
              {index === images.length - 1 && (
                <button
                  // stopPropagation prevents the click event from considering the parent element's click event i.e. image click instead of button click
                  onClick={(e) => {e.stopPropagation(); handleShow2(0);}}
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    padding: '10px 20px',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    zIndex: 10, // Ensures the button is on top
                    visibility: 'visible', // Ensures the button is always visible
                  }}
                >
                  Gallery
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="AboutItinerary" style={{display: 'flex', flexDirection: 'column', padding: '30px 50px 20px 50px', margin: '20px', borderRadius: '15px', border: '1px solid #ccc', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#f9f9f9'}}>
        <div>
          <h3 style={{marginBottom: '20px', borderBottom: '2px solid #ddd', width: '20%'}}>About the Tour</h3>
        </div>
        <div>
          <p>The Kedarnath Yatra Package is an extraordinary journey that connects with the sacred, finds inner peace, and embraces the breathtaking beauty of the Himalayas. Our journey kicks off in Delhi, the capital city, and we will venture into the tranquil landscapes of Uttarakhand and make way for Guptkashi, a serene town in the majestic Himalayan mountains. However, the prime destination is Kedarnath, the land of Lord Shiva, nestled amidst the towering peaks of the Himalayas. Here, you will be greeted by snow-clad mountains and pristine vistas, and once you reach the ambiance, it will touch your heart. The Kedarnath Yatra Package is a transformative journey and a chance to experience the ultimate beauty in a single breath.
          </p>
        </div>
        <div>
          <h4 style={{marginTop: '10px', marginBottom: '20px', borderBottom: '2px solid #ddd', width: '15%'}}>Quick Info</h4>
          <ul style={{marginLeft: '10px'}}>
            <li><span style={{fontWeight: '600'}}>Route:</span> Delhi - Haridwar - Guptkashi - Kedarnath - Rishikesh - Delhi
            </li>
            <li><span style={{fontWeight: '600'}}>Duration:</span> 5 Days, 4 Nights</li>
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
              <Accordion.Header>Day 1 : Depart from Delhi to Haridwar</Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>Start your journey from Delhi and head towards Haridwar, the gateway to the Himalayas.</li>
                  <li>Upon arrival, check into the hotel, freshen up, and embark on a spiritual journey.</li>
                  <li>Visit Har Ki Pauri, a revered ghat on the Ganges, and witness the Ganga Aarti, a spiritual ritual.</li>
                  <li>Return to the hotel for a comfortable overnight stay, reminiscing about the day's spiritual encounters.</li>
                </ul>
                <ImageStackCarousel images={images1} caption={'Day 1'} />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Day 2 : Haridwar to Guptkashi</Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>Embark on a scenic drive from Haridwar to Guptkashi, a serene town nestled in the Himalayas.</li>
                  <li>En route, visit Devprayag, the confluence of the Alaknanda and Bhagirathi rivers, forming the Ganges.</li>
                  <li>Upon arrival in Guptkashi, check into the hotel and relax amidst the tranquil ambiance.</li>
                  <li>Enjoy a comfortable overnight stay, preparing for the spiritual journey ahead.</li>
                </ul>
                <ImageStackCarousel images={images2} caption={'Day 2'} />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Day 3 : Guptkashi to Kedarnath</Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>Begin your day with an early breakfast before embarking on a spiritual journey to Kedarnath.</li>
                  <li>Reach Gaurikund, the base of the Kedarnath trek, and start your trek to Kedarnath.</li>
                  <li>Upon arrival, visit the Kedarnath Temple, one of the holiest Hindu temples dedicated to Lord Shiva.</li>
                  <li>After darshan, return to the hotel for a comfortable overnight stay, cherishing the divine experience.</li>
                </ul>
                <ImageStackCarousel images={images3} caption={'Day 3'} />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>Day 4 : Kedarnath to Rishikesh</Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>Embark on a spiritual journey from Kedarnath to Rishikesh, the Yoga Capital of the World.</li>
                  <li>Upon arrival, check into the hotel, freshen up, and explore the serene ambiance of Rishikesh.</li>
                  <li>Visit the iconic Laxman Jhula, a suspension bridge over the Ganges, and explore the local markets.</li>
                  <li>Return to the hotel for a comfortable overnight stay, reminiscing about the spiritual journey.</li>
                </ul>
                <ImageStackCarousel images={images4} caption={'Day 4'} />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>Day 5 : Rishikesh to Delhi</Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>Begin your return journey from Rishikesh to Delhi, the capital city.</li>
                  <li>Upon arrival in Delhi, bid farewell to the serene landscapes of the Himalayas.</li>
                  <li>End your journey with unforgettable memories and a heart full of spiritual experiences.</li>
                </ul>
                <ImageStackCarousel images={images5} caption={'Day 5'} />
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

          <Modal show={showBooking} onHide={handleBookingClose} className="spiti-booking-modal-width">
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

      {/* Reviews Section */}
      <div style={styles.itinerary}>
        <h3 style={styles.heading}>Reviews</h3>

        <div className="Reviews" id="reviews" style={styles.review}>
          {/* Hardcoded reviews */}
          <div style={styles.reviewCard}>
            <h4>Docker</h4>
            <p>Amazing experience. The tour was well-organized and the guide was very friendly. I would love to visit Kedarnath again.</p>
          </div>
          <div style={styles.reviewCard}>
            <h4>Kubernetes</h4>
            <p>Had a great time exploring the beautiful landscapes of Kedarnath. The journey was spiritual and rejuvenating.</p>
          </div>
          {/* Dynamic reviews from DB */}
          {reviews.map((review, index) => (
            <div key={index} style={styles.reviewCard}>
              <h4>{review.username}</h4>
              <p>{review.review}</p>
            </div>
          ))}
        </div>
  
        <div>
          { reviewable && (
          <Button variant="primary" style={{ margin: '20px' }} onClick={() => setShowReview(true)}>Add Review</Button>
          )}
          <Modal show={showReview} onHide={() => setShowReview(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Add Review</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleAddReview}>
                <Form.Group className="mb-3">
                  <Form.Label>Review</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="review"
                    value={reviewData}
                    onChange={(e) => setReviewData(e.target.value)}
                    required
                  />
                </Form.Group>
                <Modal.Footer>
                  <Button variant="primary" type="submit">Submit</Button>
                  <Button variant="secondary" onClick={() => setShowReview(false)}>Close</Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>
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
    width: '40%',
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
    width: '100%',
    maxWidth: '1200px',
    height: '500px',
    padding: '0px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '500px',
    objectFit: 'cover',
  },
  caption: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '10px',
    padding: '10px',
  },
  closeIcon: {
    position: 'absolute',
    top: '2px',
    right: '2px',
    color: 'white',
    fontSize: '25px',
    cursor: 'pointer',
    zIndex: '1000',
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
  review : {
    display: 'flex',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap',
  },
  reviewCard: {
    width: '40%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
    margin: '20px',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gridTemplateRows: 'repeat(3, 1fr)',
    gap: '3px',
    padding: '1px',
    borderRadius: '10px',
    border: '1px solid #ccc',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '85vw',
    height: '85vh',
    margin: 'auto',
    overflow: 'hidden'
  },
  gridItem: {
    border: '1px solid #ddd',
    borderRadius: '7px',
    overflow: 'hidden',
    cursor: 'pointer',
    position: 'relative'
  },
  gridItemLarge: {
    gridRow: '1 / 4',
    gridColumn: '1 / 3',
    border: '1px solid #ddd',
    borderRadius: '7px',
    overflow: 'hidden',
    cursor: 'pointer'
  },
  gridImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    overflow: 'hidden',
    transition: 'transform 0.3s ease'
  }
};

export default Kedarnath;
