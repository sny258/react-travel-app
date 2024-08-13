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




function AllPackages({ Destinations }) {
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

  const destinations = [
    {
      name: 'Spiti Valley',
      imageUrl: 'https://media1.thrillophilia.com/filestore/2e9qkcdyryljx74c1rfbz9p88nua_wanderon-spiti-winter-11.jpg?dpr=1.5&w=1280/',
      days: '7 days & 6 nights',
      price: '₹ 25,000',
      description: 'The beauty of Spiti Valley is located on the northern side of Ladakh. In the east lies Tibet and Kinnaur in the southeast. The north is bordered by Kullu, At an altitude of 12,500 feet above sea level with breathtaking beauty.',
      mapUrl: 'https://i0.wp.com/tripologer.com/wp-content/uploads/2016/09/Spiti-Circuit-Map-Spiti-Valley-Circuit-Route-Map.jpg?w=1200&ssl=1',
      navigateTo: '/spiti'
    },
    {
      name: 'Ladakh',
      imageUrl: 'https://media1.thrillophilia.com/filestore/8x6uyeud8vsavok04lbe0xs5z8hp_shutterstock_1711483000.jpg?h=238&w=auto&dpr=1.5/100px180',
      days: '7 days & 6 nights',
      price: '₹ 20,000',
      description: 'Ladakh, often referred to as "The Land of High Passes" is a region located in the northernmost part of India, within the state of Jammu and Kashmir. It is known for its stunning landscapes, unique culture, and spiritual heritage.',
      mapUrl: 'https://miro.medium.com/v2/resize:fit:1100/format:webp/1*PqEDqqj1gVV4kA5cO0jYeA.png',
      navigateTo: '/ladakh'
    },
    {
      name: 'Kedarnath',
      imageUrl: 'https://as2.ftcdn.net/v2/jpg/05/82/10/05/1000_F_582100502_d8LWRlWFRJqsaD03dHMbrnuc8xZ0uSW5.jpg',
      days: '5 days & 4 nights',
      price: '₹ 15,000',
      description: 'Kedarnath is a revered pilgrimage site in the Indian Himalayas, known for its ancient Shiva temple, one of the twelve Jyotirlingas. Nestled amidst breathtaking mountain scenery, offering spiritual solace and stunning natural beauty.',
      mapUrl: 'https://www.manchalamushafir.com/tour/kedarnath-yatra/images/trekking-route-of-kedarnath-temple.webp',
      navigateTo: '/kedarnath'
    },
    {
      name: 'Tungnath',
      imageUrl: 'https://images.unsplash.com/photo-1699214101660-df4e21fbabcd?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      days: '3 days & 2 nights',
      price: '₹ 10,000',
      description: 'At astonishing elevation of 3680 metres above sea level, this temple is the highest Shiva temple in the world. Chandrashila AKA the Moon Peak is the peak situated above the Tungnath Temple, offers majestic view of the Himalayas.',
      mapUrl: 'https://www.taleof2backpackers.com/wp-content/uploads/2019/08/DEORIATAL-TUNGANATH-CHANDRASHILA-TREK-MAP.jpg',
      navigateTo: ''
    },
    {
      name: 'Munnar',
      imageUrl: 'https://plus.unsplash.com/premium_photo-1697730334419-fba83fe143b7?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      days: '4 days & 3 nights',
      price: '₹ 15,000',
      description: 'Munnar is a hill station situated about 1600m above sea level at the confluence of three mountain streams Muthirapuzha, Nallathanni and Kundala. Munnar is renowned for its scenic tea plantations, lush green hills, and serene lakes.',
      mapUrl: 'https://tapioca.co.in/wp-content/uploads/2019/12/Bangalore-to-Munnar-Routes.png',
      navigateTo: ''
    },
    {
      name: 'Goa',
      imageUrl: 'https://images.unsplash.com/photo-1642922835816-e2ac68db5c42?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      days: '6 days & 5 nights',
      price: '₹ 25,000',
      description: 'Goa, on India\'s southwest coast, is famous for its beaches, nightlife, and Portuguese heritage. Panaji and Old Goa feature colonial architecture and historic churches. Goa\'s diverse cuisine and festive vibe make it a top destination.',
      mapUrl: 'https://weevolveshop.com/wp-content/uploads/2020/09/24-1.jpg',
      navigateTo:''
    },
    {
      name: 'Kasol',
      imageUrl: 'https://res.cloudinary.com/dyiffrkzh/image/upload/v1702119355/bbj/isybrzrsi55fpudlcrj9.jpg',
      days: '5 days & 4 nights',
      price: '₹ 20,000',
      description: 'Kasol is a hamlet in the district Kullu, Himachal Pradesh, northern India. It is situated in Parvati Valley, on the banks of the Parvati River, on the way between Bhuntar and Manikaran. It is located 30 km from Bhuntar and 3.5 km from Manikaran.',
      mapUrl: 'https://www.thesearchingsouls.com/wp-content/uploads/2024/02/Kasol-Kheerganga-map.jpg',
      navigateTo:'' 
    },
    {
      name: 'Jibhi',
      imageUrl: 'https://media1.thrillophilia.com/filestore/a1m3hf92l4jkzheyh64jli0pxzfd_1585741491_19764999_1749960138355337_3189050905618022400_n.jpg?w=1080&h=auto&dpr=1.5',
      days: '5 days & 4 nights',
      price: '₹ 20,000',
      description: 'Jibhi is a hidden gem in the Banjar Valley of Himachal Pradesh. It is a serene and unspoiled place with lush green landscapes, snow-capped mountains, and pristine rivers. The Great Himalayan National Park is located near Jibhi.',
      mapUrl: 'https://incrediblespiti.com/wp-content/uploads/2023/10/Mountain-Magic-Tirthan-and-Lahaul-6N-7D-Map.png',
      navigateTo:''
    },
    {
      name: 'Valley of Flowers',
      imageUrl: 'https://trekthehimalayas.com/images/ValleyofFlowersTrek/Slider/b3d630fb-3f9a-4cc6-9fef-1be72e135695_VOF.jpg',
      days: '8 days & 7 nights',
      price: '₹ 25,000',
      description: 'Valley of Flowers trek is a must-do trek for all nature lovers. The valley is a UNESCO World Heritage Site and is located in the Chamoli district of Uttarakhand. The valley is known for its endemic flora and fauna and breathtaking views.',
      mapUrl: 'https://trekthehimalayas.com/images/ValleyofFlowersTrek/Map/3ef1c4c3-b654-4e59-a2b5-c9599174adf5_valley%20of%20flowers%20trek%20the%20himalayas.webp',
      navigateTo:''
    },
    {
      name: 'Spiti Bike Tour',
      imageUrl: 'https://media1.thrillophilia.com/filestore/nzp2mepuqvagrgc7m61qihquv1hx_shutterstock_2005361438%20(1).jpg?w=auto&h=600',
      days: '10 days & 9 nights',
      price: '₹ 35,000',
      description: 'Spiti valley is a cold desert mountain valley located high in the Himalayas in the north-eastern part of the Indian state of Himachal Pradesh. Name "Spiti" means "The Middle Land", i.e. the land between Tibet and India.',
      mapUrl: 'https://i0.wp.com/tripologer.com/wp-content/uploads/2016/09/Spiti-Circuit-Map-Spiti-Valley-Circuit-Route-Map.jpg?w=1200&ssl=1',
      navigateTo:''
    },
    {
      name: 'Ladakh Bike Tour',
      imageUrl: 'https://media1.thrillophilia.com/filestore/206s3cugn55llxkyni4dbyslftf1_shutterstock_418181005.jpg?dpr=1.5&w=1280',
      days: '10 days & 9 nights',
      price: '₹ 30,000',
      description: 'Ladakh, the land of high passes, is situated in the northernmost part of India. It is known for its stunning landscapes, unique culture, and spiritual heritage. The region is a paradise for adventure enthusiasts and nature lovers.',
      mapUrl: 'https://miro.medium.com/v2/resize:fit:1100/format:webp/1*PqEDqqj1gVV4kA5cO0jYeA.png',
      navigateTo:''
    },
    {
      name: 'Manali-Sissu',
      imageUrl: 'https://media.assettype.com/outlooktraveller%2Fimport%2Foutlooktraveller%2Fpublic%2Fuploads%2Farticles%2Fexplore%2Findex.jpg?w=1200&auto=format%2Ccompress&fit=max',
      days: '5 days & 4 nights',
      price: '₹ 15,000',
      description: 'Manali is a high-altitude Himalayan resort town in India’s northern Himachal Pradesh state. It has reputation as a backpacker’s hub. Set on the Beas River, it’s a gateway for skiing in the Solang Valley and trekking in Parvati Valley.',
      mapUrl: 'https://incrediblespiti.com/wp-content/uploads/2023/10/Mountain-Magic-Tirthan-and-Lahaul-6N-7D-Map.png',
      navigateTo:''
    },
    {
      name: 'Zanskar Valley',
      imageUrl: 'https://media1.thrillophilia.com/filestore/7xay6ho6nvaujsiyr81z3whsspc7_1580898888_14597530492_df3e4fb075_k.jpg?w=1440&dpr=2',
      days: '7 days & 6 nights',
      price: '₹ 25,000',
      description: 'Zanskar Valley is a remote region in the Indian union territory of Ladakh. It is known for its stunning landscapes, unique culture, and spiritual heritage. The region is a paradise for adventure enthusiasts and nature lovers.',
      mapUrl: 'https://www.ladakh-tourism.net/wp-content/uploads/2021/05/Zanskar-map.jpg',
      navigateTo:''
    },
    {
      name: 'Winter Spiti',
      imageUrl: 'https://media1.thrillophilia.com/filestore/2e2jk8u5jhn1fhm7ogkczahuli72_snapedit_1697441789958.png?dpr=1.5&w=1280',
      days: '10 days & 9 nights',
      price: '₹ 35,000',
      description: 'Spiti valley during winter season is a must visit for all adventure enthusiasts. The valley is a cold desert mountain valley located high in the Himalayas in the north-eastern part of the Indian state of Himachal Pradesh.',
      mapUrl: 'https://i0.wp.com/tripologer.com/wp-content/uploads/2016/09/Spiti-Circuit-Map-Spiti-Valley-Circuit-Route-Map.jpg?w=1200&ssl=1',
      navigateTo:''
    }
  ];

  // Filter destinations based on Destinations prop
  const filteredDestinations = Destinations
    ? destinations.filter(destination => Destinations.includes(destination.name))
    : destinations;

  // Global modal logic to show the map image
  const [show, setShow] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');
  const [modalAlt, setModalAlt] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = (imageUrl,alt) => {
    setModalImageUrl(imageUrl);
    setModalAlt(alt);
    setShow(true);
  };
  
  // Card hover logic, to show more content on hover
  // const [isHovered, setIsHovered] = useState(false);
  // const handleMouseOver = (e) => {
  //   setIsHovered(true);
  //   e.currentTarget.style.height = '510px';
  // }
  // const handleMouseOut = (e) => {
  //   setIsHovered(false);
  //   e.currentTarget.style.height = '290px';
  // }


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
        <img src={modalImageUrl} alt={modalAlt} style={{ width: '100%', height: '500px' }} />
      </Modal>

      <div className='WelcomeContent' style={styles.welcomeContent}>
        {/* <div style={styles.headingContainer}>
          <h2>Where would you like to go ?</h2>
        </div> */}

        <div 
          // without this less than 4 cards, default minWidth was considerd
          style={{
            ...styles.cardContainer,
            minWidth: filteredDestinations.length > 2 ? '1075px' : '800px', 
          }}
        >
          {filteredDestinations.map((destination, index) => (
            <Card style={styles.card} key={index}>
              <div>
                <Card.Img
                  variant="top"
                  style={styles.cardImage}
                  src={destination.imageUrl}
                />
                {/* <img src={Map} alt={`map-${index}`} onClick={() => handleShow(destination.mapUrl)} style={styles.mapIcon} /> */}
              </div>
              <div style={styles.tourDetails}>
                <p>{destination.days}</p>
                <p>{destination.price}</p>
              </div>
              <Card.Body>
                <Card.Title>
                  {destination.name}
                  <img src={Map} alt={`map-${index}`} onClick={() => handleShow(destination.mapUrl,destination.name)} style={styles.mapIcon2} />
                </Card.Title>
                <Card.Text>
                  {destination.description}
                </Card.Text>
                <Button className="cardBtn" variant="primary" onClick={() => navigate(destination.navigateTo)}>Explore</Button>
              </Card.Body>
            </Card>
          ))}
        </div>

        {/* <div style={styles.cardContainer}>
          <Card style={styles.card}> */}
          {/* <Card style={styles.card} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}> */}
            {/* <div>
              <Card.Img
                variant="top"
                style={styles.cardImage}
                src="https://media1.thrillophilia.com/filestore/2e9qkcdyryljx74c1rfbz9p88nua_wanderon-spiti-winter-11.jpg?dpr=1.5&w=1280/"
              /> */}
              {/* <img src={Map} alt="Map" onClick={() => handleShow("https://i0.wp.com/tripologer.com/wp-content/uploads/2016/09/Spiti-Circuit-Map-Spiti-Valley-Circuit-Route-Map.jpg?w=1200&ssl=1")} style={styles.mapIcon} /> */}
            {/* </div>
            <div style={styles.tourDetails}>
              <p>7 days & 6 nights</p>
              <p>₹ 25,000</p> */}
              {/* <img src={Map} alt="Map" onClick={() => handleShow("https://i0.wp.com/tripologer.com/wp-content/uploads/2016/09/Spiti-Circuit-Map-Spiti-Valley-Circuit-Route-Map.jpg?w=1200&ssl=1")} style={styles.mapIcon2} /> */}
            {/* </div>
            <Card.Body>
              <Card.Title> 
                Spiti Valley
                <img src={Map} alt="Map" onClick={() => handleShow("https://i0.wp.com/tripologer.com/wp-content/uploads/2016/09/Spiti-Circuit-Map-Spiti-Valley-Circuit-Route-Map.jpg?w=1200&ssl=1")} style={styles.mapIcon2} />
              </Card.Title>
              {isHovered &&
              <>
              <Card.Text>
                The beauty of Spiti Valley is located on the northern side of Ladakh. In the east lies Tibet and Kinnaur in the southeast. The north is bordered by Kullu, At an altitude of 12,500 feet above sea level with breathtaking beauty.
              </Card.Text>
              <Button className="cardBtn" variant="primary" onClick={() => navigate('/spiti')}>Explore</Button>
              </>
              }
            </Card.Body>
          </Card>
        </div> */}

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
    //border: '1px solid #ccc',
    padding: '20px 10px 0px 10px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    margin: '40px 20px 20px 20px',
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
    //padding: '5px',
    width: '100%',            // Make sure it stretches to full width of the parent
    maxWidth: '1075px',       // Set a maximum width to prevent it from expanding too much
    minWidth: '800px',        // Ensure it doesn’t shrink below a certain width
    flexWrap: 'wrap',
    boxSizing: 'border-box'   // Include padding and border in the width
  },
  card: {
    width: '18rem',
    margin: '10px 0px 50px 0px',
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