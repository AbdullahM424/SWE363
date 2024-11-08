import React from 'react';
import { useParams } from 'react-router-dom';
import facilitiesStyles from '../assets/styles/Facilities.module.css';

function FacilityInfo() {
  const { facilityName } = useParams();

  // Placeholder details for facilities (In a real app, this might come from an API or database)
  const facilityDetails = {
    'Building-5': {
      nearestBusStop: 'Bus Stop A',
      services: ['Science Labs', 'Research Facilities'],
      mapImage: '/assets/images/building-5-map.png'
    },
    'Building-11': {
      nearestBusStop: 'Bus Stop B',
      services: ['Workshops', 'Engineering Labs'],
      mapImage: '/assets/images/building-11-map.png'
    },
    'Building-22': {
      nearestBusStop: 'Bus Stop C',
      services: ['Library', 'Study Rooms'],
      mapImage: '/assets/images/building-22-map.png'
    },
    'Stadium': {
      nearestBusStop: 'Bus Stop D',
      services: ['Sports Events', 'Public Facilities'],
      mapImage: '/assets/images/stadium-map.png'
    },
    'Building-24': {
      nearestBusStop: 'Bus Stop E',
      services: ['Administrative Offices'],
      mapImage: '/assets/images/building-24-map.png'
    },
    'Building-76': {
      nearestBusStop: 'Bus Stop F',
      services: ['Student Activity Center', 'Recreation Rooms'],
      mapImage: '/assets/images/building-76-map.png'
    },
  };

  const facility = facilityDetails[facilityName];

  if (!facility) {
    return <p>Details not available for {facilityName}.</p>;
  }

  return (
    <div className={facilitiesStyles.facilityInfo}>
      <h1>{facilityName}</h1>
      <h3>Nearest Bus Stop: {facility.nearestBusStop}</h3>
      <h4>Services Offered:</h4>
      <ul>
        {facility.services.map((service, index) => (
          <li key={index}>{service}</li>
        ))}
      </ul>
      <div className={facilitiesStyles.mapContainer}>
        <h4>Location on Campus:</h4>
        <img
          src={facility.mapImage}
          alt={`${facilityName} location on campus`}
          className={facilitiesStyles.mapImage}
        />
      </div>
    </div>
  );
}

export default FacilityInfo;