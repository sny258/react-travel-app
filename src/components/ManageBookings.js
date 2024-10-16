import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Table, Button } from 'react-bootstrap'; 
import Footer from './Footer';
import { Modal } from 'react-bootstrap';
//import './styles.css';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import config from '../config'; 

function ManageBookings() {
  
  // Use state to store the bookings
  const [bookings, setBookings] = useState([]);
  // Use state to trigger re-fetching bookings
  const [refreshBookings, setRefreshBookings] = useState(false);
  // Get the username from local storage
  const username = localStorage.getItem('user');

  // Set the default config for axios, to ensure credentials (like cookies) are sent with requests.
  axios.defaults.withCredentials = true;

  // scroll to the top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch bookings on component mount and when refreshBookings changes
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(config.API_BASE_URL + `/bookings/${username}`);
        console.log('Bookings data:', response.data);
        setBookings(response.data.bookings);
      } catch (error) {
        console.error('Error fetching bookings:', error.response?.data?.error || error.message);
      }
    };
    if (username) {
      fetchBookings();
    }
  }, [username, refreshBookings]);

  // Function to cancel booking
  const handleCancelBooking = async (booking_id) => {
    try {
      const response = await axios.delete(config.API_BASE_URL + `/booking/cancel/${booking_id}`);
      console.log('Cancel Booking Response:', response.data);
      if (response.status === 200) {
        console.log('Cancel Booking Status: ', response.data.message);
        toast.success('Booking cancelled successfully', { 
          position: "top-center" 
        });
        // Trigger the useEffect to fetch bookings again to update the list
        setRefreshBookings(prev => !prev);
      } else {
        console.error('Cancel booking error:', response.data.message);
        toast.error('Booking cancellation failed. Please try again.', {position: "top-center"});
      }
    } catch (error) {
      console.error('Cancel booking error:', error.response?.data?.message || error.message);
    }
  };

  // delete confirmation popup (popup's position is fixed, wasn't working for lower table rows)
  //const [deletePopupOpen, setDeletePopupOpen] = useState(false);
  const [bookingId, setBookingId] = useState(null);
  // function to handle the delete button action
  const deleteButtonAction = (id) => {
    setBookingId(id);
    //setDeletePopupOpen(true);
    setShow(true);
  };
  // function to handle the confirm button action on popup
  const confirmButtonAction = () => {
    handleCancelBooking(bookingId);
    //setDeletePopupOpen(false);
    setShow(false);
  };
  // function to handle the cancel button action on popup
  // const cancelButtonAction = () => {
  //   setDeletePopupOpen(false);
  // };

  // Modal state
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  // tabs to manage bookings
  const [activeKey, setActiveKey] = useState('upcoming');
  const getColor = (key) => (key === activeKey ? '#0599fb' : 'black');

  const upcomingBookings = bookings.filter(booking => new Date(booking.date) >= new Date());
  const completedBookings = bookings.filter(booking => new Date(booking.date) < new Date());


  return (
    <>
      {/* <div className='booking-details' style={styles.bookingDetails}>
        <div className="Heading" style={styles.heading}>
          <h1>Your Bookings ... 😊</h1>
        </div>
        <div className='TableContainer' style={styles.tableContainer}>
          <Table className='Table' striped bordered hover responsive style={styles.table}>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Trip</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => (
                <tr key={booking.id}>
                  <td>{booking.id}</td>
                  <td>{booking.name}</td>
                  <td>{booking.email}</td>
                  <td>{booking.trip}</td>
                  <td>{booking.date}</td>
                  <td>
                    {new Date(booking.date) < new Date() ? (
                      <span style={{ color: 'green', fontWeight: '500' }}>Completed</span>
                    ) : (
                      <span style={{ color: 'red', fontWeight: '500' }}>Upcoming</span>
                    )}
                  </td>
                  <td>
                    {/* mark passed date bookings as completed */}
                    {/* {new Date(booking.date) < new Date() ? (
                      <Button variant="success" onClick={() => deleteButtonAction(booking.id)}>
                        Delete
                      </Button>
                    ) : (
                      <Button variant="danger" onClick={() => deleteButtonAction(booking.id)}>
                        Cancel
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
              {bookings.length === 0 && (
                <tr>
                  <td colSpan="6">No bookings found.</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>  */}

      <div className='booking-details' style={styles.bookingDetails}>
        <div className="Heading" style={styles.heading}>
          <h1>Your Bookings ... 😊</h1>
        </div>
        <Tabs
          activeKey={activeKey}
          onSelect={(k) => setActiveKey(k)}
          id="controlled-tab-example"
          //custom className manage-bookings-tabs is added to override the default styles in styles.css
          className="mb-3 custom-tabs manage-bookings-tabs"
          justify
        >
          <Tab eventKey="upcoming" title="Upcoming" style={{ color: getColor('upcoming') }}>
            <div className='TableContainer' style={styles.tableContainer}>
              <Table className='Table' striped bordered hover responsive style={styles.table}>
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Trip</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingBookings.map(booking => (
                    <tr key={booking.id}>
                      <td>{booking.id}</td>
                      <td>{booking.name}</td>
                      <td>{booking.email}</td>
                      <td>{booking.trip}</td>
                      <td>{booking.date}</td>
                      <td>
                        <span style={{ color: 'green', fontWeight: '500' }}>Upcoming</span>
                      </td>
                      <td>
                        <Button variant="danger" onClick={() => deleteButtonAction(booking.id)}>
                          Cancel
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {upcomingBookings.length === 0 && (
                    <tr>
                      <td colSpan="7">No upcoming bookings found.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Tab>
          <Tab eventKey="completed" title="Completed" style={{ color: getColor('completed') }}>
            <div className='TableContainer' style={styles.tableContainer}>
              <Table className='Table' striped bordered hover responsive style={styles.table}>
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Trip</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {completedBookings.map(booking => (
                    <tr key={booking.id}>
                      <td>{booking.id}</td>
                      <td>{booking.name}</td>
                      <td>{booking.email}</td>
                      <td>{booking.trip}</td>
                      <td>{booking.date}</td>
                      <td>
                        <span style={{ color: 'green', fontWeight: '500' }}>Completed</span>
                      </td>
                      <td>
                        <Button variant="primary" onClick={() => deleteButtonAction(booking.id)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {completedBookings.length === 0 && (
                    <tr>
                      <td colSpan="7">No completed bookings found.</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Tab>
        </Tabs>

        {/* Delete confirmation popup */}
        {/* {deletePopupOpen && (
          <div className="deletePopup" style={styles.deletePopup}>
            <h1 style={{margin: '15px', fontSize: '1.5rem'}}>Are you sure 🤔</h1>
            <div>
              <Button type="button" style={{margin: '25px', width: '20%'}} onClick={confirmButtonAction}>Yes</Button>
              <Button type="button" variant="secondary" style={{margin: '25px', width: '18%'}} onClick={cancelButtonAction}>No</Button>
            </div>
          </div>
        )} */}

        <Modal show={show} onHide={handleClose} className="delete-booking-modal-width">
          {/* <Modal.Header closeButton>
            <Modal.Title>Cancellation Alert !!!</Modal.Title>
          </Modal.Header> */}
          <Modal.Body style={{ fontSize: '1.5rem', margin: '10px', textAlign: 'center' }}>
            Are you sure 🤔
          </Modal.Body>
          <Modal.Footer style={{ justifyContent: 'center' }}>
            <Button variant="primary" style={{margin: '15px', width: '20%'}} onClick={confirmButtonAction}>Yes</Button>
            <Button variant="secondary" style={{margin: '15px', width: '20%'}} onClick={handleClose}>No</Button>
          </Modal.Footer>
        </Modal>
    
      </div>

      <Footer />
      
    </>
  );
}

const styles = {
  bookingDetails: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    margin: '20px',
    padding: '40px',
    border: '1px solid #ccc',
    borderRadius: '20px',
  },
  heading: {
    marginBottom: '40px',
    paddingBottom: '20px',
    borderBottom: '2px solid #ddd'
  },
  tableContainer: {
    width: '100%',
    overflowX: 'auto',
    marginTop: '20px',
  },
  table: {
    verticalAlign: 'middle',
  },
  // deletePopup: {
  //   display: 'flex',
  //   flexDirection: 'column',
  //   position: 'absolute', 
  //   //alignItems: 'center',
  //   //textAlign: 'center',
  //   top: '40%',
  //   left: '50%',
  //   transform: 'translate(-50%, -50%)',
  //   backgroundColor: '#fff',
  //   padding: '20px',
  //   border: '1px solid #ccc',
  //   borderRadius: '10px',
  //   zIndex: 1000,
  //   width: '27%',
  //   height: '33%',
  // },
  tabsTitle: {
    fontWeight: '500',
    fontSize: '13px',
    paddingBottom: '5px',
    borderRadius: '10px'
  }
};

export default ManageBookings;
