import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';

const ItineraryCarousel = ({ images, caption }) => {
  const [isHovered, setIsHovered] = useState(false);

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
    itineraryCarouselHover: {
      height: '400px',
    },
    itineraryCarouselImage: {
      width: '100%',
      height: '250px',
      objectFit: 'cover',
      transition: 'height 0.3s ease-in-out',
    },
    itineraryCarouselImageHover: {
      height: '400px',
    },
    itineraryCarouseCaption: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderRadius: '10px',
      padding: '10px',
      width: '25%',
      margin: 'auto',
    }
  };

  return (
    <Carousel 
      className="itinerary-carousel"
      style={{
        // ... is required to merge the styles of hover to the original styles
        ...styles.itineraryCarousel,
        ...(isHovered && styles.itineraryCarouselHover),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {images.map((image, index) => (
        <Carousel.Item key={index}>
          <img
            style={{
              ...styles.itineraryCarouselImage,
              ...(isHovered && styles.itineraryCarouselImageHover),
            }}
            src={image}
            alt={`img-${index + 1}`}
          />
          {/* <Carousel.Caption style={styles.itineraryCarouseCaption}>
            <h3>{caption}</h3>
          </Carousel.Caption> */}
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ItineraryCarousel;
