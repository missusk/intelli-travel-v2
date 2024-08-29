import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Button } from '@mui/material';

function HotelCard({ hotel }) {
  const [showMoreFacilities, setShowMoreFacilities] = useState(false);
  const [showMoreAttractions, setShowMoreAttractions] = useState(false);

  const toggleShowMoreFacilities = () => {
    setShowMoreFacilities(!showMoreFacilities);
  };

  const toggleShowMoreAttractions = () => {
    setShowMoreAttractions(!showMoreAttractions);
  };

  const facilitiesList = hotel.combined_facilities.split('|');
  const attractionsList = hotel.point_of_interest.split('|');

  const displayedFacilities = showMoreFacilities ? facilitiesList : facilitiesList.slice(0, 5);
  const displayedAttractions = showMoreAttractions ? attractionsList : attractionsList.slice(0, 5);

  const encodedHotelName = encodeURIComponent(hotel.property_name);
  const encodedCity = encodeURIComponent(hotel.city);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedHotelName}+${encodedCity}`;

  return (
    <Grid item xs={12} md={4}>
      <Card style={{ backgroundColor: '#2e2e3e', color: 'white', marginBottom: '20px', padding: '15px' }}>
        <CardContent>
          <Typography variant="h5" gutterBottom style={{ color: '#ff4081' }}>
            {hotel.property_name}
          </Typography>
          <Typography variant="body2"><strong>City:</strong> {hotel.city}</Typography>
          <Typography variant="body2"><strong>Star Rating:</strong> {hotel.hotel_star_rating}</Typography>
          <Typography variant="body2"><strong>Review Rating:</strong> {hotel.site_review_rating}</Typography>
          
          <div style={{ marginTop: '15px' }}>
            <Typography variant="body2" style={{ marginBottom: '5px' }}><strong>Nearby Attractions:</strong></Typography>
            <ul style={{ listStyleType: 'decimal', paddingLeft: '20px', margin: 0 }}>
              {displayedAttractions.map((attraction, index) => (
                <li key={index} style={{ marginBottom: '5px' }}>{attraction}</li>
              ))}
            </ul>
            {attractionsList.length > 5 && (
              <Button
                size="small"
                onClick={toggleShowMoreAttractions}
                style={{ color: '#ff4081', textTransform: 'none', marginTop: '10px' }}
              >
                {showMoreAttractions ? 'Show Less' : 'Read More'}
              </Button>
            )}
          </div>
          
          <Typography variant="body2"><strong>Address:</strong> {hotel.address}</Typography>
          
          <Typography variant="body2">
            <a 
              href={googleMapsUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: '#ff4081' }}
            >
              View Hotel
            </a>
          </Typography>
          
          <div style={{ marginTop: '15px' }}>
            <Typography variant="body2" style={{ marginBottom: '5px' }}><strong>Facilities:</strong></Typography>
            <ul style={{ listStyleType: 'decimal', paddingLeft: '20px', margin: 0 }}>
              {displayedFacilities.map((facility, index) => (
                <li key={index} style={{ marginBottom: '5px' }}>{facility}</li>
              ))}
            </ul>
            {facilitiesList.length > 5 && (
              <Button
                size="small"
                onClick={toggleShowMoreFacilities}
                style={{ color: '#ff4081', textTransform: 'none', marginTop: '10px' }}
              >
                {showMoreFacilities ? 'Show Less' : 'Read More'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default HotelCard;
