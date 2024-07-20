import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { MdOutlineExpandCircleDown } from "react-icons/md";


const ItineraryCarousel = ({ images, caption }) => {
  //state to handle expand effect
  const [isExpanded, setIsExpanded] = useState(false);

  const styles = {
    itineraryCarousel: {
      width: '97%',
      height: '250px',
      padding: '0px',
      border: '1px solid #ddd',
      borderRadius: '10px',
      overflow: 'hidden',
      marginLeft: '20px',
      transition: 'height 0.3s ease-in-out',
    },
    itineraryCarouselExpand: {
      height: '425px',
    },
    itineraryCarouselImage: {
      width: '100%',
      height: '250px',
      objectFit: 'cover',
      transition: 'height 0.3s ease-in-out',
    },
    itineraryCarouselImageExpand: {
      height: '425px',
    },
    itineraryCarouseCaption: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderRadius: '10px',
      padding: '10px',
      //width: '25%',
      margin: 'auto',
      textAlign: 'Left',
    },
    expandCollpse: {
      position: 'absolute',
      bottom: '10px',
      right: '10px',
      fontSize: '1.5rem',
      color: 'white',
      cursor: 'pointer',
      zIndex: 100
    },
  };

  const handleExpandCollapse = () => {
    setIsExpanded(!isExpanded);
  }

  return (
    <div style={{ position: 'relative' }}>
      <Carousel 
        className="itinerary-carousel"
        style={{
          ...styles.itineraryCarousel,
          ...(isExpanded && styles.itineraryCarouselExpand),
        }}
        //onMouseEnter={() => setIsExpanded(true)}
        //onMouseLeave={() => setIsExpanded(false)}
        indicators={false}
      >
        {images.map((image, index) => (
          <Carousel.Item key={index}>
            <img
              style={{
                ...styles.itineraryCarouselImage,
                ...(isExpanded && styles.itineraryCarouselImageExpand),
              }}
              src={image}
              alt={`img-${index + 1}`}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <MdOutlineExpandCircleDown 
        style={{
          ...styles.expandCollpse,
          ...(isExpanded && { transform: 'rotate(180deg)' })
        }} 
        onClick={handleExpandCollapse}
      />
    </div>
  );
};

export default ItineraryCarousel;
