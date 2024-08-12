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
import { toast } from 'react-toastify';
import axios from 'axios';


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
      //navigate('/booking');
      //send trip name to booking page as state hook
      navigate('/booking', { state: { trip: 'Ladakh' } });
    }
  };

  // Scroll to top on page, since react router routes to new page on the same position as the parent page. Thats a drawback of react router since it doesn't reload child page.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const carouselImages = [
    {
      src: "https://bhagyashritravels.com/wp-content/uploads/2020/02/Feature-4.jpg",
      title: "Leh Palace",
      description: "Leh Palace is a former royal palace overlooking the town of Leh."
    },
    {
      src: "https://media1.thrillophilia.com/filestore/rvdfnbgi18znqf3z6hmgwc78xcrj_shutterstock_678172303.jpg?w=1440&dpr=2",
      title: "Khardung La Pass",
      description: " Khardung La Pass is the highest motorable road in the world."
    },
    {
      src: "https://images.unsplash.com/photo-1446757981584-845b14aa7dd0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      title: "Pangong Tso",
      description: "Pangong Tso is a high-altitude lake in the Himalayas situated at a height of about 4,350 m."
    },
    {
      src: "https://media1.thrillophilia.com/filestore/lghrecukmid36r5xozvcxlxwe7vz_1512047963_Nubra.jpg?dpr=1.5&w=885",
      title: "Nubra Valley",
      description: "Nubra Valley is a cold desert with sand dunes and the enchanting Diskit Monastery."
    },
    {
      src: "https://media1.thrillophilia.com/filestore/ldz7nnp5wpbuptli19l75ny6d5t4_shutterstock_1447004072.jpg?h=-40&w=auto&dpr=1.5",
      title: "Thiksey Monastery",
      description: "Thiksey Monastery is a Tibetan Buddhist monastery in Ladakh, India."
    }
  ];


  const itineraryImages1 = [
    "https://media1.thrillophilia.com/filestore/1i4kspcpe1ghd3f5v2aqrpn3sjb5_shutterstock_263762033.jpg?dpr=1.5&w=1280",
    "https://media1.thrillophilia.com/filestore/87inlreu7jga05gnoz65ut8amstv_darshan-chudasama-v1oGBUnXVDs-unsplash.jpg?dpr=1.5&w=1280",
    "https://media1.thrillophilia.com/filestore/u6evhfn0rsa2p6duvj6lswl1n6mj_fetchpik.com-35tcrpDeli.jpg?h=-40&w=auto&dpr=1.5"
  ];
  const itineraryImages2 = [
    "https://media1.thrillophilia.com/filestore/cm1cp8ubbo66jba1turgurcbo4em_shutterstock_147739688.jpg?dpr=1.5&w=1280",
    "https://media1.thrillophilia.com/filestore/qe2cfak5kqscoftfeijqosbt3662_shutterstock_1379616569.jpg?dpr=1.5&w=1280",
    "https://media1.thrillophilia.com/filestore/rnemkur6qxwvoaqpbi2g9tv6u4ru_shutterstock_487598509.jpg?dpr=1.5&w=1280"
  ];
  const itineraryImages3 = [
    "https://media1.thrillophilia.com/filestore/rvdfnbgi18znqf3z6hmgwc78xcrj_shutterstock_678172303.jpg?w=1440&dpr=2",
    "https://media1.thrillophilia.com/filestore/nsbd7zmiekq3k3i904pma93akpq2_shutterstock_1891533388.jpg?dpr=1.5&w=1280",
    "https://media1.thrillophilia.com/filestore/4o8wuueeokfjc0n1f9efibghkxio_shutterstock_1598248549.jpg?dpr=1.5&w=1280"
  ];
  const itineraryImages4 = [
    "https://media1.thrillophilia.com/filestore/1c3idyomo23g056utwmma3m32vzh_shutterstock_796094905.jpg?dpr=1.5&w=1280",
    "https://media1.thrillophilia.com/filestore/yn4sda5ev1ymz71rnlultjcc61oa_shutterstock_737766418.jpg?dpr=1.5&w=1280",
    "https://media1.thrillophilia.com/filestore/g6u6y1sk9vi1dzcolll74e2e96ob_shutterstock_1035858844.jpg?dpr=1.5&w=1280"
  ];
  const itineraryImages5 = [
    "https://media1.thrillophilia.com/filestore/hnq0ehetop48ipblffhsitsglhhm_shutterstock_605685947.jpg?dpr=1.5&w=1280",
    "https://media1.thrillophilia.com/filestore/ii4ta0x2e0ilccfmd65bj3on0nuh_shutterstock_362370104.jpg?dpr=1.5&w=1280",
    "https://media1.thrillophilia.com/filestore/0hl049hvtkwsyaovvpyvzlodpqqh_shutterstock_632699069.jpg?dpr=1.5&w=1280"
  ];
  const itineraryImages6 = [
    "https://c7.alamy.com/comp/EC12WD/stok-village-view-from-the-shanti-stupa-at-leh-EC12WD.jpg",
    "https://media1.thrillophilia.com/filestore/06opv9r08vlam5481rmdshii91ic_shutterstock_1547948675%20(1).jpg?w=1440&dpr=2",
    "https://media1.thrillophilia.com/filestore/n111vk8pr61k3t7kdy3srtajpiar_shutterstock_628634045.jpg?dpr=1.5&w=1280"
  ];
  const itineraryImages7 = [
    "https://www.lehladakhtourism.com/hotel-in-ladakh/images/luxury-hotels-in-leh-ladakh.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Aerial_View_of_Leh_Kushok_Bakula_Rinpoche_Airport_%28IXL%29_Ladakh_Jammu_%26_Kashmir_India.jpg/1200px-Aerial_View_of_Leh_Kushok_Bakula_Rinpoche_Airport_%28IXL%29_Ladakh_Jammu_%26_Kashmir_India.jpg?20140612005411"
  ];

  
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
    const trip = 'Ladakh';
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
    const trip = 'Ladakh';
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
        // Check if the user has booked a trip to 'Ladakh' that is in the past
        const hasCompletedTrip = response.data.bookings.some(booking => {
          return booking.trip === 'Ladakh' && new Date(booking.date) < new Date();
        });
        // allow 7 days after the trip to add review
        // const hasCompletedTrip = response.data.bookings.some(booking => {
        //   const bookingDate = new Date(booking.date);
        //   const currentDate = new Date();
        //   currentDate.setDate(currentDate.getDate() - 7); // Subtract 7 days from current date
        //   return booking.trip === 'Ladakh' && bookingDate < currentDate;
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

  
  
  return (
    <div>

      {/* <BasicNavbar link1="Home" link2="About" dropdownAction2="Bookings" dropdownAction3="Logout" /> */}
      {/* <BasicNavbar /> */}

      <div className="Ladakh" style={styles.itinerary}>
        <div className="Heading" style={styles.heading}>
          <h1 style={styles.title}>Ladakh</h1>
          <p style={styles.subtitle}>Enjoy the beauty of Ladakh with us.</p>
        </div>
        {/* carousel */}
        <Carousel className="Carousel" style={styles.carousel}>
          {carouselImages.map((image, index) => (
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
      </div>

      <div className="AboutItinerary" style={{display: 'flex', flexDirection: 'column', padding: '30px 50px 20px 50px', margin: '20px', borderRadius: '15px', border: '1px solid #ccc', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#f9f9f9'}}>
        <div>
          <h3 style={{marginBottom: '20px', borderBottom: '2px solid #ddd', width: '20%'}}>About the Tour</h3>
        </div>
        <div>
          <p>Begin an incredible adventure as you explore the rough terrain and diverse culture of Ladakh, where the land is rugged and the traditions are rich.
          Discover Leh through a sightseeing tour, immersing yourself in the vibrant atmosphere of Leh Market, marveling at the historical Leh Palace, and finding serenity at the iconic Shanti Stupa.
          Embark on an exciting trip to Sham Valley, where you'll experience the wonders of Magnetic Hill, Gurudwara Pathar Sahib, and a visit to SECMOL, the school featured in the real-life 3-idiots movie.
          Traverse the challenging Khardung La Pass, the world's highest motorable road, and explore the Nubra Valley, a cold desert with sand dunes and the enchanting Diskit Monastery.</p>
        </div>
        <div>
          <h4 style={{marginTop: '10px', marginBottom: '20px', borderBottom: '2px solid #ddd', width: '15%'}}>Quick Info</h4>
          <ul style={{marginLeft: '10px'}}>
            <li><span style={{fontWeight: '600'}}>Route:</span> Leh - Sham Valley - Khardung La Pass - Nubra Valley - Pangong Tso - Chang La Pass - Stok Village - Leh
            </li>
            <li><span style={{fontWeight: '600'}}>Duration:</span> 7 Days, 6 Nights</li>
            <li><span style={{fontWeight: '600'}}>Start Point:</span> Leh</li>
            <li><span style={{fontWeight: '600'}}>End Point:</span> Leh</li>
          </ul>
        </div>
      </div>
      
      <div className="ItineraryContainer" style={styles.itineraryContainer}>
        <div className="Itinerary" style={styles.itineraryContent}>
          <h1 className="ItineraryHeader" style={styles.itineraryHeader}>Itinerary</h1>
          <Accordion defaultActiveKey={['0']} alwaysOpen>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Day 1 : Arrival in Leh | Leh Sightseeing Tour</Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>Arrive in Leh, the capital of Ladakh, and check into your hotel.</li>
                  <li>After a refreshing breakfast, embark on a sightseeing tour of Leh.</li>
                  <li>Visit the iconic Leh Palace, a former royal palace overlooking the town of Leh.</li>
                  <li>Explore the vibrant atmosphere of Leh Market, where you can shop for souvenirs and local handicrafts.</li>
                  <li>Seek solace at the historical Shanti Stupa, a white-domed stupa on a hilltop in Chanspa.</li>
                </ul>
                {/* <ImageStack image1="https://images.unsplash.com/photo-1712758178352-2a2651153bf3?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" image2="https://images.unsplash.com/photo-1677820915366-27d887c9b872?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" image3="https://images.unsplash.com/photo-1652543393354-2056fc3e9551?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/> */}
                <ImageStack images={itineraryImages1} />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Day 2 : Sham Valley Day Tour | Exploring the Mysteries of Ladakh</Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>Embark on an exciting trip to Sham Valley, where you'll experience the wonders of Magnetic Hill, Gurudwara Pathar Sahib, and a visit to SECMOL, the school featured in the real-life 3-idiots movie.</li>
                  <li>Next, explore the confluence of the Zanskar and Indus Rivers, a mesmerizing sight where the two rivers meet but do not mix.</li>
                  <li>Visit the iconic Alchi Monastery, a 1000-year-old monastery known for its ancient wall paintings.</li>
                  <li>End your day with a visit to the Likir Monastery, a Buddhist monastery known for its 75-foot statue of Maitreya Buddha.</li>
                </ul>
                <ImageStack images={itineraryImages2} />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>Day 3 : Leh to Nubra Valley via Khardung La Pass</Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>Embark on a thrilling journey to Nubra Valley, a cold desert with sand dunes and the enchanting Diskit Monastery.</li>
                  <li>Traverse the challenging Khardung La Pass, the world's highest motorable road, and enjoy panoramic views of the surrounding mountains.</li>
                  <li>Visit the enchanting Hunder Village, known for its sand dunes and Bactrian camels.</li>
                  <li>Explore the Diskit Monastery, a 14th-century monastery known for its giant statue of Maitreya Buddha and breathtaking views of the Nubra Valley.</li>
                </ul>
                <ImageStack images={itineraryImages3} />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header>Day 4 : Nubra Valley to Pangong Tso | Camping by the Pangong Tso</Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>Embark on a scenic journey to Pangong Tso, a high-altitude lake in the Himalayas situated at a height of about 4,350 m.</li>
                  <li>Marvel at the changing colors of the lake as you drive along its shores, with shades of blue ranging from sky blue to deep blue.</li>
                  <li>Set up camp by the lake and enjoy a peaceful evening by the water, surrounded by the majestic mountains of Ladakh.</li>
                  <li>Experience the magic of Pangong Tso as the sun sets, casting a golden glow over the lake and the surrounding mountains.</li>
                </ul>
                <ImageStack images={itineraryImages4} />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="4">
              <Accordion.Header>Day 5 : Pangong Tso to Leh via Chang La Pass</Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>Begin your return journey to Leh, passing through the scenic Chang La Pass, the third highest motorable road in the world.</li>
                  <li>Stop at the picturesque Chang La Pass, where you can enjoy panoramic views of the surrounding mountains and valleys.</li>
                  <li>Visit the charming Shey Palace, a former summer palace of the Ladakh kings known for its beautiful gardens and stunning views of the Indus Valley.</li>
                  <li>Explore the Thiksey Monastery, a 12-story monastery known for its stunning architecture and ancient relics.</li>
                </ul>
                <ImageStack images={itineraryImages5} />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="5">
              <Accordion.Header>Day 6 : Stok Village Day Tour | Exploring the History & Heritage</Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>Embark on a day tour of Stok Village, a traditional Ladakhi village known for its ancient traditions and cultural heritage.</li>
                  <li>Visit the Stok Palace, a 19th-century royal palace that houses a museum showcasing the history and culture of Ladakh.</li>
                  <li>Explore the beautiful Stok Monastery, a Buddhist monastery known for its stunning architecture and ancient relics.</li>
                  <li>End your day with a visit to the Hemis Monastery, the largest and wealthiest monastery in Ladakh known for its annual Hemis Festival.</li>
                </ul>
                <ImageStack images={itineraryImages6} />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="6">
              <Accordion.Header>Day 7 : End of the tour !!!</Accordion.Header>
              <Accordion.Body>
                <ul>
                  <li>This will be last day of the journey, taking you back to home.</li>
                  <li>After breakfast, check out from the hotel and proceed to the airport for your onward journey.</li>
                  <li>End of the tour with unforgettable memories of Ladakh.</li>
                </ul>
                <ImageStack images={itineraryImages7} />
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

          <Modal show={showBooking} onHide={handleBookingClose} className="ladakh-booking-modal-width">
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
          {/* Static reviews */}
          <div style={styles.reviewCard}>
            <h4>Homelander</h4>
            <p>It was an amazing experience. The tour was well organized and the guide was very   knowledgeable. I would highly recommend this tour to anyone looking to explore Ladakh.</p>
          </div>
          <div style={styles.reviewCard}>
            <h4>Billy Butcher</h4>
            <p>The tour exceeded my expectations. The itinerary was well-planned and the accommodations were comfortable. I had a great time exploring the beautiful landscapes of Ladakh.</p>
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
    width: '90%',
    maxWidth: '1200px',
    height: 'auto',
    padding: '5px',
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
    width: '26%',   
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
};

export default Spiti;
