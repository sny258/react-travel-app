import React, { useState, useEffect } from 'react';

import Footer from './Footer';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

//import ExploreSVG from '../svg/exploreSVG';
import LadakhSVG from '../svg/ladakhSVG';
import SpitiSVG from '../svg/spitiSVG';
import KashmirSVG from '../svg/kashmirSVG';
//import ThailandSVG from '../svg/thailandSVG';
import AllPackages from './AllPackages';
import Explore from '../svg/explore.png';
import Himachal from '../svg/himachal.png';
import Uttrakhand from '../svg/uttrakhand.png';
//import Other from '../svg/other.png';


function Welcome() {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // code for tab's SVG coloring when selected
  const [activeKey, setActiveKey] = useState('Explore');
  const getColor = (key) => (key === activeKey ? '#0599fb' : 'black');
  const filter = 'invert(50%) sepia(100%) saturate(1000%) hue-rotate(180deg) brightness(100%) contrast(100%)';

  return ( 
    <div>
      <div className='WelcomeTabContent' style={styles.welcomeContent}>
        <Tabs
          //defaultActiveKey="explore"
          activeKey={activeKey}
          onSelect={(k) => setActiveKey(k)}
          id="controlled-tab-example"
          className="mb-3 custom-tabs" // Apply the custom class here
          justify// or fill
        >
          { /* All packages tab */ }
          <Tab eventKey="Explore" title=
            {
              <div>
                {/* <ExploreSVG color={'green'} /> */}
                {/* <ExploreSVG color={getColor('explore')} /> */}
                <img src={Explore} alt='Explore' 
                  style={{width: '60px', height: '50px', filter: getColor('Explore') === 'black' ? 'none' : filter }} 
                />
                <p>Explore</p>
              </div>
            }>
            <AllPackages />
          </Tab>
          { /* Ladakh tab */}
          <Tab eventKey="Ladakh" title=
            {
              <div>
                <LadakhSVG color={getColor('Ladakh')} />
                <p>Ladakh</p>
              </div>
            }>
            <AllPackages Destinations={['Ladakh', 'Ladakh Bike Tour', 'Zanskar Valley']} />
          </Tab>
          { /* Uttrakhand tab */ }
          <Tab eventKey="Uttrakhand" title=
            {
              <div>
                <img src={Uttrakhand} alt='Uttrakhand' 
                  style={{width: '60px', height: '50px', filter: getColor('Uttrakhand') === 'black' ? 'none' : filter }} 
                />
                <p>Uttrakhand</p>
              </div>
            }>
            <AllPackages Destinations={['Kedarnath', 'Tungnath', 'Valley of Flowers']} />
          </Tab>
          { /* Spiti tab */}
          <Tab eventKey="Spiti" title=
            {
              <div>
                <SpitiSVG color={getColor('Spiti')} />
                <p>Spiti</p>
              </div>
            }>
            <AllPackages Destinations={['Spiti Valley', 'Spiti Bike Tour', 'Winter Spiti']} />
          </Tab>
          { /* Himachal tab */ }
          <Tab eventKey="Himachal" title=
            {
              <div>
                <img src={Himachal} alt='Himachal' 
                  style={{width: '60px', height: '50px', filter: getColor('Himachal') === 'black' ? 'none' : filter }} 
                />
                <p>Himachal</p>
              </div>
            }>
            <AllPackages Destinations={['Kasol', 'Jibhi', 'Manali-Sissu']} />
          </Tab>
          { /* Kashmir tab */}
          <Tab eventKey="Kashmir" title=
            {
              <div>
                <KashmirSVG color={'gray'} />
                <p style={{color: 'gray'}}>Kashmir</p>
              </div>
            } disabled>
            <AllPackages />
          </Tab>
          { /* Thailand tab */}
          {/* <Tab eventKey="Thailand" title=
            {
              <div>
                <ThailandSVG color={'gray'} />
                <p style={{color: 'gray'}}>Thailand</p>
              </div>
            } disabled>
            <AllPackages />
          </Tab> */}
        </Tabs>      
      </div>

      <Footer />
    </div>
  );
}


const styles = {
  welcomeContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid #ccc',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    margin: '20px',
  },
};

export default Welcome;