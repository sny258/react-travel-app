import React, { useState, useEffect } from "react";
//import BasicNavbar from './Navbar';
import { Button, Form, InputGroup, Modal, Spinner } from "react-bootstrap";
import axios from 'axios';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';
import qrCode from '../QR.png';
//import { toast } from 'react-toastify';
//import sendEmail from './emailService';

import config from '../config'; 

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
  const [failed, setFailed] = useState(false);
  const [UPI, setUPI] = useState('');
  // Loading spinner state
  const [loading, setLoading] = useState(false);

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

  //function to handle booking
  const handleBooking = async (e) => {
    e.preventDefault();
    const username = localStorage.getItem("user");
    try {
      console.log('Booking a trip...');
      // show loading spinner for 3 sec before booking confirmation
      setLoading(true);
      //server side call to booking API
      const response = await axios.post(config.API_BASE_URL + '/booking', { username, name, email, trip, people, date }, {
        validateStatus: function (status) {
          // Consider any status code less than 500 as a success status.
          return status < 500;
        }
      });
      console.log('Response:', response);
      if (response.status === 200) {
        console.log('Booking successful:', response.data.message);
        // Simulate payment processing delay before showing the confirmation
        setTimeout(() => {
          setLoading(false);
          setBooked(true);
        }, 3000); // 3 seconds delay
        // //send email to company
        // const response1 = sendEmail(
        //   ``,
        //   `New Booking from ${name} <${email}>`,
        //   `Hi,\n\nA new booking has been made by ${name} <${email}> for the ${trip} on ${date}.\n\nRegards,\ntakashi`
        // );
        // console.log('Response', response1);
        // //send email to user
        // const response2 = sendEmail(
        //   `${email}`,
        //   `Booking Confirmation from Takshi's Hustle`,
        //   `Hi ${name},\n\nYour booking for the ${trip} on ${date} has been successfully confirmed.\n\nWe look forward to providing you with an excellent experience.\n\nRegards,\ntakashi`
        // );
        // console.log('Response', response2);
      } else {
        console.error('Booking error:', response.data.message);
        //alert('Booking failed. Please try again.');
        setTimeout(() => {
          setLoading(false);
          //handleClosePayment();
          setFailed(true);
          //toast.error('Booking failed. Please try again.', {position: "top-center"});
        }, 3000); // 3 seconds delay
      }
    } catch (error) {
      console.error('Booking error:', error.response?.data?.message || error.message);
      //alert('Booking failed');
      setTimeout(() => {
        setLoading(false);
        //handleClosePayment();
        setFailed(true);
        //toast.error('Booking failed. Please try again.', {position: "top-center"});
      }, 3000); // 3 seconds delay
    }
  };

  const handlePeopleChange = (increment) => {
    setPeople((prevPeople) => Math.max(1, prevPeople + increment));
  };

  // Scroll to top on page, since react router routes to new page on the same position as the parent page. Thats a drawback of react router since it doesn't reload child page.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Payment Modal state
  const [showPayment, setShowPayment] = useState(false);
  const handleClosePayment = () => {
    setShowPayment(false);
    setApplyDiscount(false);  //remove the discount
    setBooked(false);
    setUPI('');
    setName('');
    setEmail('');
    setTrip(defaultTrip || '');
    //setDate('');
    setPeople(1);
  };
  const handleShowPayment = (e) => {
    e.preventDefault();
    setShowPayment(true);
  };

  const amount = 2000 * people;
  const GST = 100 * people;
  //const total = 2000 * people;
  const [applyDiscount, setApplyDiscount] = useState(false);
  const baseTotal = 2100 * people;
  const discount = 200;
  const total = applyDiscount ? baseTotal - discount : baseTotal;
  const discountAmount = amount - discount;
 

  return (
    <>
    {/* <BasicNavbar link1="Home" link2="About" dropdownAction2="Bookings" dropdownAction3="Logout" /> */}
    {/* <BasicNavbar /> */}

    <div style={{border: '1px solid #ccc', borderRadius: '20px', margin: '20px', padding: '10px', justifyContent: 'space-between'}}>
    
      <div style={{margin: '20px auto', padding: '10px', textAlign: 'center',borderBottom: '2px solid #ddd', width: '30%'}}>
        <h1>Booking a trip 😃</h1>
      </div>
    
      <div style={{display: 'flex', margin: '40px 20px 20px 20px', padding: '10px', justifyContent: 'space-between'}}>
      
        <div style={{ padding: '20px 40px 20px 20px', width: '60%', fontSize: '0.8em', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff'}}>
          <h3>Trip Advance</h3>
          <ul>
            <li>The advance amount is INR 2,100/- (2,000 Advance, 100 GST)</li>
            <li>The remaining amount will be collected at the starting of the trip.</li>
            <li>After payment, our team will connect with you within 24 hours for the collection of identity proof, confirming trip dates, and will explain the whole itinerary on call as well.</li>
          </ul>

          <p style={{margin: '30px 0 30px 0'}}><strong>NOTE: Age Limit 18 Years - 40 Years</strong></p>
      
          <h4>Terms & Conditions:</h4>
          <ul>
            <li>Full Payment of the trip cost must be made before the trip begins.</li>
            <li>The IDs shall all be verified before boarding. No boarding shall be entertained without a valid Govt. ID.</li>
            <li>No refunds shall be made towards any inclusion(s) not availed by the Client.</li>
            <li>No act of misconduct or indiscipline shall be tolerated on the tours. We are a cordial travel community and we aspire to bring to you a hassle-free and memorable experience.</li>
            <li>We shall not be responsible for any delays or alterations in the program or indirectly incurred expenses in cases such as Natural Hazards, accident, breakdown of machinery, weather conditions, landslides, political closure or any untoward incidents.</li>
            <li>Numerous factors such as weather and road conditions the physical ability of participants etc. may bring alteration in the itinerary. We reserve the right to make necessary changes in the schedule in the interest of safety, comfort and general well-being!</li>
            <li>Passenger will not be allowed to board the bus if he is having any of the symptoms of Covid-19 and no refund shall be made in that case.</li>
            <li>If any passenger experiences any of the Covid-19 symptoms while on the trip, he will be isolated there and then and have to face all the extra expenses for the same.</li>
            <li>A person is required to follow all the safety measures prescribed by WHO during the trip for his safety and as well as for the safety of others, if he fails to do so or deny to do so, we have all the right to cancel his or her trip and no refund shall be made.</li>
            <li>Any dispute arising out of this agreement shall be subject to the jurisdiction of the courts in Delhi.</li>
          </ul>
          <p style={{marginTop: '30px', color: 'green'}}>
            <strong>You agree to share information entered on this page with Us (owner of this page) once you click on the Pay button. This information will be used to process your booking and for communication purposes.</strong>
          </p>
          <div style={{marginTop: '40px', borderTop: '1px solid #ccc', paddingTop: '10px'}}>
            <img 
              id="rzp-logo" alt="rzp-logo" 
              src="https://cdn.razorpay.com/static/assets/pay_methods_branding.png" 
              style={{ verticalAlign: 'middle', height: '30px', padding: '5px' }} 
            />
          </div>
        </div>

        <div className="Booking" style={styles.booking}>
          <div className="Heading" style={styles.heading}>
            <h3>Booking Details</h3>
          </div>
          <Form onSubmit={handleShowPayment} style={styles.bookingform}>
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
              <InputGroup.Text id="basic-addon1" style={{paddingLeft: '5px', paddingRight: '15px'}}>Number of people:</InputGroup.Text>
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
                //min={(new Date()).toISOString().split('T')[0]}      // Set min date to today
                style={styles.input}
              />
            </Form.Group>
            <Button variant="primary" type="submit" style={styles.bookingbutton}>
              Pay ₹ {total}
            </Button>
          </Form>
        </div>
      </div>
    </div>

    <Modal show={showPayment} onHide={handleClosePayment} size="xl" className="payment-modal">
      <Modal.Header closeButton>
        <Modal.Title style={{ textAlign: 'center', width: '100%' }}>
          {booked || failed ? 'Booking Message !!!' : 'Payment Options !!!'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', gap: '30px' }}>
              <h5>Processing Payment...</h5>
              <Spinner animation="border" role="status"/>
            </div>
          ) : booked ? (
            <div style={{ padding: '40px', textAlign: 'center', fontSize: '1.0em' }}>
              <p>Dear <strong>{name}</strong>,</p>
              <p>Your booking for the <strong>{trip}</strong> on <strong>{date}</strong> has been successfully confirmed <span style={{fontSize: '1.5em'}}>🥳</span>.</p>
              <p>We look forward to providing you with an excellent experience.</p>
            </div>
          ) : failed ? (
            <div style={{ padding: '40px', textAlign: 'center', fontSize: '1.0em' }}>
              <p>Sorry, your booking got failed <span style={{fontSize: '1.5em'}}>🥲</span>.</p>
              <p>Please try again.</p>
            </div>
          ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '0.60fr 1fr', gap: '20px' }}>
          <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            <h6>Price Summary</h6>
            <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', marginBottom: '20px' }}>
              <p>Amount: ₹ {applyDiscount ? discountAmount : amount}</p>
              <p>GST: ₹ {GST}</p>
              <p>Total: ₹ {total}</p>
            </div>
          </div>
          
          <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-sm">
                Get discount of ₹ {discount} on Payment through UPI
              </InputGroup.Text>
              <InputGroup.Checkbox
                aria-label="Checkbox for applying discount"
                checked={applyDiscount}
                onChange={(e) => setApplyDiscount(e.target.checked)}
                style={{ accentColor: '#007bff', border: '1.5px solid #007bff', borderRadius: '4px' }}
              />
            </InputGroup>
            <div className="payment-options" style={{ marginBottom: '20px' }}>
              <h6>UPI QR</h6>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px', borderRadius: '5px', border: '1px solid #ccc' }}>
                {/* QR Code image */}
                <img 
                  src={qrCode}
                  // src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/800px-QR_code_for_mobile_English_Wikipedia.svg.png" 
                  alt="UPI QR Code" 
                  style={{ width: '125px', border: '1px solid black' }}
                />
                <div style={{ flexGrow: '1', padding: '10px 10px 10px 50px' }}>
                  <p style={{ fontSize: '0.6em', marginBottom: '5px' }}>SCAN WITH ANY APP</p>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <span>
                      <img onError={(e) => e.target.remove()} src="https://cdn.razorpay.com/app/googlepay.svg" alt="Google Pay icon" style={{ width: '25px' }} />
                    </span>
                    <span>
                      <img onError={(e) => e.target.remove()} src="https://checkout-static-next.razorpay.com/build/assets/images/phonepe.e101f376.svg" alt="PhonePe icon" style={{ width: '25px' }} />
                    </span>
                    <span>
                      <img onError={(e) => e.target.remove()} src="https://cdn.razorpay.com/app/cred_circle.png" alt="Paytm icon" style={{ width: '25px' }} />
                    </span>
                    <span>
                      <img onError={(e) => e.target.remove()} src="https://cdn.razorpay.com/app/bhim.svg" alt="Bhim icon" style={{ width: '25px' }} />
                    </span>
                    <span>
                      <img onError={(e) => e.target.remove()} src="https://cdn.razorpay.com/app/amazonpay.svg" alt="Amazonpay icon" style={{ width: '25px' }} />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* UPI ID input */}
            <h6>UPI ID / Number</h6>
            <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px'}}>
              <Form onSubmit={handleBooking}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control 
                    type="text" 
                    placeholder="example@okhdfcbank" 
                    value={UPI} 
                    onChange={(e) => setUPI(e.target.value)} required
                  />
                </Form.Group>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Button variant="primary" type="submit">Verify and Pay</Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
        )}
      </Modal.Body>
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
    width: '35%',
    height: 'fit-content',
    position: 'sticky',
    top: '100px',
    marginTop: '0px',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    borderBottom: '2px solid #ddd',
    paddingBottom: '10px',
    width: '60%',
  },
  bookingform: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%'
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
    marginTop: '30px',
    width: '40%',
  },
};

export default Booking;
