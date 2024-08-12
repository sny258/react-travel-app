import React from 'react';
import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Modal from 'react-bootstrap/Modal';
import { IoIosCloseCircle } from "react-icons/io";


function ImageStack ({ images }) {
  // Increase height of main div on hover
  const onMouseOverMainDiv = (e) => {
      e.currentTarget.style.height = '200px';
  }
  // Restore original height of main div on hover out
  const onMouseOutMainDiv = (e) => {
      e.currentTarget.style.height = '200px';
  }
  // Expand the flex of image div size on hover
  const onMouseOverImageDiv = (e) => {
      e.currentTarget.style.flex = 1.1;
  }
  // Restore original flex size of image div on hover out
  const onMouseOutImageDiv = (e) => {
      e.currentTarget.style.flex = 1;
  }

   // corousel logic for flex images
   const [show2, setShow2] = useState(false);
   const [activeIndex, setActiveIndex] = useState(0);
   const handleClose2 = () => setShow2(false);
   const handleShow2 = (index) => {
     setActiveIndex(index);
     setShow2(true);
   };

  return (
    <div>
      
      {/* Modal of xl size to show the corousel */}
      <Modal className="imageStackModal" show={show2} onHide={handleClose2} size="xl" centered>
        {/* <Modal.Header closeButton>
          <Modal.Title>Gallery ...</Modal.Title>
        </Modal.Header> */}
        <Carousel className="itinerary-carousel"
          style={ styles.carousel } 
          activeIndex={activeIndex} 
          onSelect={(selectedIndex) => setActiveIndex(selectedIndex)}
        >
          {images.map((image, index) => (
            <Carousel.Item key={index}>
              <img
                style={styles.carouselImage}
                //src={image.src}
                src={image}
                alt={`img-${index + 1}`}
              />
              {/* Enable this to show the caption in itinerary carousel*/}
              {/* <Carousel.Caption style={styles.carouselCaption}>
                <h3>{image.title}</h3>
                <p>{image.description}</p>
              </Carousel.Caption> */}
            </Carousel.Item>
          ))}
        </Carousel>
        {/* <span style={styles.closeSpan} onClick={handleClose2}>&times;</span> */}
        <IoIosCloseCircle style={styles.closeIcon} onClick={handleClose2}/>
      </Modal>

      <div style={styles.mainDiv} onMouseOver={onMouseOverMainDiv} onMouseOut={onMouseOutMainDiv}>
        {images.map((image, index) => (
          <div key={index} style={styles.imageDiv} onMouseOver={onMouseOverImageDiv} onMouseOut={onMouseOutImageDiv}>
            <img 
              src={image}
              //src={image.src} 
              style={styles.image} 
              onClick={() => handleShow2(index)} 
              alt={`place ${index + 1}`}
            />
          </div>
        ))}
      </div> 

    </div>
  );
}

const styles = {
  mainDiv: {
    display: 'flex',
    gap: '3px',
    transition: 'height 0.5s',
    marginLeft: '20px',
    //for less than 3 images default height was large, it reloves the first hover lag also.
    height: '200px'
  },
  imageDiv: {
    flex: 1,
    display: 'flex',
    transition: 'flex 0.5s',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '8px',
    cursor: 'pointer',
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
  carouselImage: {
    width: '100%',
    height: '500px',
    objectFit: 'cover',
  },
  carouselCaption: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '10px',
    padding: '5px',
  },
  closeIcon: {
    position: 'absolute',
    top: '2px',
    right: '2px',
    color: 'white',
    fontSize: '25px',
    cursor: 'pointer',
    zIndex: '1000',
  } 
};

export default ImageStack;