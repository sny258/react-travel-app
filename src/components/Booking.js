import React, { useState, useEffect } from "react";
//import BasicNavbar from './Navbar';
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import axios from 'axios';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';


function Booking() {
 
  // Get the trip name send from the previous page from the location state
  const location = useLocation();
  const { trip: defaultTrip } = location.state || {};

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [trip, setTrip] = useState(defaultTrip || '');
  const [date, setDate] = useState('');
  const [people, setPeople] = useState(1);
  // hook to be used to trigger useEffect when booking is done
  const [booked, setBooked] = useState(false);

  // Set the default config for axios
  axios.defaults.withCredentials = true;

  // Set default date to next week
  useEffect(() => {
    const nextWeek = new Date();
    const defaultDate = () => {
      nextWeek.setDate(nextWeek.getDate() + 7);
      const formattedDate = nextWeek.toISOString().split('T')[0]; // Format date as yyyy-mm-dd
      setDate(formattedDate);
    }
    defaultDate();
  }, [booked]);

  // Modal state
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    // Reset form fields
    setName('');
    setEmail('');
    setTrip(defaultTrip || '');
    setDate('');
    setPeople(1);
    // set true to false and wise versa
    setBooked(!booked);
  };
  //function to handle booking
  const handleBooking = async (e) => {
    e.preventDefault();
    const username = localStorage.getItem("user");
    try {
      console.log('Booking a trip...');
      // //server side call to booking API
      const response = await axios.post('http://localhost:5000/booking', { username, name, email, trip, people, date }, {
        validateStatus: function (status) {
          // Consider any status code less than 500 as a success status.
          return status < 500;
        }
      });
      console.log('Response:', response);
      if (response.status === 200) {
        console.log('Booking successful:', response.data.message);
        setShow(true);
      } else {
        console.error('Booking error:', response.data.message);
        alert('Booking failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error.response?.data?.message || error.message);
      alert('Booking failed');
    }
    // show modal
    setShow(true);
  };

  const handlePeopleChange = (increment) => {
    setPeople((prevPeople) => Math.max(1, prevPeople + increment));
  };

  // Scroll to top on page, since react router routes to new page on the same position as the parent page. Thats a drawback of react router since it doesn't reload child page.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <>
    {/* <BasicNavbar link1="Home" link2="About" dropdownAction2="Bookings" dropdownAction3="Logout" /> */}
    {/* <BasicNavbar /> */}

    <div style={{border: '1px solid #ccc', borderRadius: '20px', margin: '20px'}}>
      <div className="Booking" style={styles.booking}>
        <div className="Heading" style={styles.heading}>
          <h1>Booking a trip 😃</h1>
        </div>
        <Form onSubmit={handleBooking} style={styles.bookingform}>
          <Form.Group controlId="formName" style={styles.formGroup}>
            <Form.Control
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
            />
          </Form.Group>
          <Form.Group controlId="formEmail" style={styles.formGroup}>
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </Form.Group>
          <Form.Group controlId="formTrip" style={styles.formGroup}>
            <Form.Control
              as="select"
              value={trip}
              onChange={(e) => setTrip(e.target.value)}
              required
              style={styles.input}
            >
              <option value="">Select a trip</option>
              <option value="Spiti Valley">Spiti Valley</option>
              <option value="Ladakh">Ladakh</option>
              <option value="Kedarnath">Kedarnath</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formPeople" style={styles.formGroup}>
            <InputGroup>
            <InputGroup.Text id="basic-addon1">Number of people:</InputGroup.Text>
              <Button variant="outline-secondary" onClick={() => handlePeopleChange(-1)}>-</Button>
              <Form.Control
                type="text"
                value={people}
                readOnly
                style={styles.inputCenter}
              />
              <Button variant="outline-secondary" onClick={() => handlePeopleChange(1)}>+</Button>
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="formDate" style={styles.formGroup}>
            <Form.Control
              type="date"
              placeholder="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              style={styles.input}
            />
          </Form.Group>
          <Button variant="primary" type="submit" style={styles.bookingbutton}>Book</Button>
        </Form>
      </div>
    </div>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Booking Message !!!</Modal.Title>
      </Modal.Header>
      <Modal.Body>Congratulations {name}, your booking for {trip} has been confirmed 🥳</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>

    <Footer />

    </>
  );
}

const styles = {
  booking: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#fff',
    margin: '20px auto',
    width: '40%'
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    borderBottom: '2px solid #ddd',
    paddingBottom: '10px',
    width: '100%',
  },
  bookingform: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '80%',
  },
  formGroup: {
    width: '80%',
    marginBottom: '2px',
  },
  input: {
    borderRadius: '5px',
    padding: '5px',
    fontSize: '1em',
    width: '100%',
  },
  inputCenter: {
    textAlign: 'center',
    borderRadius: '5px',
    padding: '5px',
    fontSize: '1em',
    width: '60px',
  },
  bookingbutton: {
    marginTop: '15px',
    width: '30%',
  },
};

export default Booking;



