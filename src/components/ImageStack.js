import React from 'react';

function ImageStack(props) {

    // Increase height of main div on hover
    const onMouseOverMainDiv = (e) => {
        e.currentTarget.style.height = '250px';
    }
    // Restore original height of main div on hover out
    const onMouseOutMainDiv = (e) => {
        e.currentTarget.style.height = '180px';
    }
    // Expand the flex of image div size on hover
    const onMouseOverImageDiv = (e) => {
        e.currentTarget.style.flex = 2;
    }
    // Restore original flex size of image div on hover out
    const onMouseOutImageDiv = (e) => {
        e.currentTarget.style.flex = 1;
    }

    return (
    <div>
      <div style={styles.mainDiv} onMouseOver={onMouseOverMainDiv} onMouseOut={onMouseOutMainDiv}>
        
        {/* <div style={styles.imageDiv} onMouseOver={onMouseOverImageDiv} onMouseOut={onMouseOutImageDiv}>
          <img src={props.image1} style={styles.image} alt="place 1"/>
        </div>
        <div style={styles.imageDiv} onMouseOver={onMouseOverImageDiv} onMouseOut={onMouseOutImageDiv}>
          <img src={props.image2} style={styles.image} alt="place 2"/>
        </div>
        <div style={styles.imageDiv} onMouseOver={onMouseOverImageDiv} onMouseOut={onMouseOutImageDiv}>
          <img src={props.image3} style={styles.image} alt="place 3"/>
        </div> */}

        {props.images.map((image, index) => (
          <div key={index} style={styles.imageDiv} onMouseOver={onMouseOverImageDiv} onMouseOut={onMouseOutImageDiv}>
            <img src={image} style={styles.image} alt={`place ${index + 1}`}/>
          </div>
        ))}

      </div> 
    </div>
  );
}

const styles = {
  mainDiv: {
    display: 'flex',
    gap: '5px',
    transition: 'height 0.5s'
  },
  imageDiv: {
      flex: 1,
      transition: 'flex 0.5s',
      display: 'flex',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'            //overflow Ensures the container clips the image overflow
  },
  image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: '8px',
      transition: 'transform 0.5s'
  },
};

export default ImageStack;