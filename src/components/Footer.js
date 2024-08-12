import React from 'react';
import { FaFacebookSquare, FaInstagram, FaTwitter, FaLinkedin, FaYoutube } from "react-icons/fa";
import logo from '../logo192.png';
import './styles.css';

function Footer() {
  return (
    <div className='Footer' style={styles.footer}>
      
      <div className="gridContainer" style={styles.gridContainer}>
        <div className="gridItems" style={styles.gridItems}>
          <div className="gridColumns" style={styles.gridColumns}>
            <p className="gridColumnHeader" style={styles.gridColumnHeader}>
              ABOUT TAKASHI'S HUSTLE
            </p>
            <a style={{textDecoration: 'none'}} href="/about-us" target="_blank">
              <div className="gridColumnLinks" style={styles.gridColumnLinks}>ABOUT US</div>
            </a>
            <a style={{textDecoration: 'none'}} href="/about-us" target="_blank">
              <div className="gridColumnLinks" style={styles.gridColumnLinks}>REVIEWS</div>
            </a>
            <a style={{textDecoration: 'none'}} href="/about-us" target="_blank">
              <div className="gridColumnLinks" style={styles.gridColumnLinks}>DESTINATIONS</div>
            </a>
            <a style={{textDecoration: 'none'}} href="/about-us" target="_blank">
              <div className="gridColumnLinks" style={styles.gridColumnLinks}>POLICIES</div>
            </a>
            <a style={{textDecoration: 'none'}} href="/about-us" target="_blank">
              <div className="gridColumnLinks" style={styles.gridColumnLinks}>WE ARE HIRING</div>
            </a>
            <a style={{textDecoration: 'none'}} href="/about-us" target="_blank">
              <div className="gridColumnLinks" style={styles.gridColumnLinks}>TERMS AND CONDITIONS</div>
            </a>
          </div>
        </div>

        <div className="gridItems" style={styles.gridItems}>
          <div className="gridColumns" style={styles.gridColumns}>
            <p className="gridColumnHeader" style={styles.gridColumnHeader}>
            FOR SUPPLIERS
            </p>
            <a style={{textDecoration: 'none'}} href="/about-us" target="_blank">
              <div className="gridColumnLinks" style={styles.gridColumnLinks}>LIST YOUR ACTIVITIES</div>
            </a>
          </div>
          <div className="gridColumns" style={styles.gridColumns}>
            <p className="gridColumnHeader" style={styles.gridColumnHeader}>
            FOR BRANDS
            </p>
            <a style={{textDecoration: 'none'}} href="/about-us" target="_blank">
              <div className="gridColumnLinks" style={styles.gridColumnLinks}>PARTNER WITH US</div>
            </a>
            <a style={{textDecoration: 'none'}} href="/about-us" target="_blank">
              <div className="gridColumnLinks" style={styles.gridColumnLinks}>DESTINATION MARKETING</div>
            </a>
          </div>
          <div className="gridColumns" style={styles.gridColumns}>
            <p className="gridColumnHeader" style={styles.gridColumnHeader}>
              FOR TRAVEL AGENTS
            </p>
            <a style={{textDecoration: 'none'}} href="/about-us" target="_blank">
              <div className="gridColumnLinks" style={styles.gridColumnLinks}>SIGNUP AS AN AGENT</div>
            </a>
            <a style={{textDecoration: 'none'}} href="/about-us" target="_blank">
              <div className="gridColumnLinks" style={styles.gridColumnLinks}>AGENT LOGIN</div>
            </a>
          </div>
        </div>

        <div className="gridItems" style={styles.gridItems}>
        <div className="gridColumns"  style={styles.gridColumns}>
            <p className="gridColumnHeader" style={styles.gridColumnHeader}>
              CONTACT US
            </p>
            <p className="gridColumnParagraph" style={styles.gridColumnParagraph}> +91-9988776655</p>
            <p className="gridColumnParagraph" style={styles.gridColumnParagraph}> takashishustle123@yahoo.in</p>
          </div>
          <div className="gridColumns"  style={styles.gridColumns}>
            <p className="gridColumnHeader" style={styles.gridColumnHeader}>
              REACH US
            </p>
            <p className="gridColumnParagraph" style={styles.gridColumnParagraph}> Takashi's Hustle Pvt. Ltd.</p>
            <p className="gridColumnParagraph" style={styles.gridColumnParagraph}> 258, 3rd Floor, Mystic Towers</p>
            <p className="gridColumnParagraph" style={styles.gridColumnParagraph}> Phase 3, Rajiv Gandhi Infotech Park, Hinjewadi</p>
            <p className="gridColumnParagraph" style={styles.gridColumnParagraph}> Pune, Maharashtra 411057</p>
            <p className="gridColumnParagraph" style={styles.gridColumnParagraph}> India</p>
          </div>
        </div>        
      </div>
      
      <div className='FooterLogo' style={styles.footerLogo}>
        <div style={styles.logoLine}></div>
        <img src={logo} alt="Thrillophilia" style={styles.logo}/>
        <div style={styles.logoLine}></div>
      </div>
      
      <div className="FooterIcons" style={styles.footerIcons}>
        <a className="icon" href="https://www.facebook.com/Adventure.India.Thrillophilia" target="_blank" rel="noopener noreferrer">
          <FaFacebookSquare />
        </a>
        <a className="icon" href="https://www.instagram.com/bvb09/" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a className="icon" href="https://x.com/HLTVorg/" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
        <a className="icon" href="https://www.linkedin.com/in/sanjay-verma-70402a12a/" target="_blank" rel="noopener noreferrer">
          <FaLinkedin />
        </a>
        <a className="icon" href="https://www.youtube.com/watch?v=zHA4NnnGZ3w" target="_blank" rel="noopener noreferrer">
          <FaYoutube />
        </a>
      </div>
    
      <div className="FooterParagraph" style={styles.FooterParagraph}>
        <h5>© 2024 react.travel.app All Rights Reserved</h5>
        <p>The content and images used on this site are copyright protected and copyrights vests with the respective owners. The usage of the content and images on this website is intended to promote the works and no endorsement of the artist shall be implied. Unauthorized use is prohibited and punishable by law.</p>
      </div>

    </div>
  );
}

const styles = {
  footer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#282c34',
    padding: '20px',
    color: 'white',
    textAlign: 'center',
    bottom: 0,
    width: '100%',
    position: 'relative',
    zIndex: 1,                      // Ensure the footer content is above any content behind it
    marginTop: '200px',              // Move the footer down to cover the grid container
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '20px',
    padding: '20px',
    backgroundColor: '#fff',
    width: '70%',
    margin: '0 auto',               // Center align the grid container
    position: 'relative',
    zIndex: 2,                      // Place the grid container above the footer background
    marginTop: '-100px',             // Move the grid container up to cover the footer background
    marginBottom: '60px',
    borderRadius: '10px',
    boxShadow: '0px 0px 20px 1px rgba(0,0,0,0.14)'             // Add a shadow for depth
  },
  gridItems: {
    padding: '10px',
    //border: '1px solid black',
    color: '#000',                    // Adjust text color to black or any other suitable color
    textAlign: 'left'
  },
  gridColumns: {
    marginBottom: '30px'
 },
  gridColumnHeader: {
    fontWeight: '600',
    fontSize: '13.5px',
    marginBottom: '10px'
  },
  gridColumnLinks: {
    fontWeight: '500',
    fontSize: '11.5px',
    marginBottom: '8px'
  },
  gridColumnParagraph: {
    fontWeight: '500',
    fontSize: '11.5px',
    marginBottom: '5px',
    color: '#858585'
  },
  footerLogo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '5px',
    width: '90%',
  },
  logo: {
    width: '55px',
    height: '55px',
    margin: '0 20px 0 20px'
  },
  logoLine: {
    flex: 1,
    borderBottom: '2px solid #fff'
  },
  footerIcons: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '30px',
    margin: '40px',
    width: '90%'
  },
  FooterParagraph: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    textAlign: 'center'
  },
  // icon styling is in styles.css since it support hovering effect
};

export default Footer;
